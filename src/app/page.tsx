'use client';

import { useState } from 'react';
import SOPForm from '@/components/SOPForm';
import SOPResult from '@/components/SOPResult';

// Define proper types
interface FormData {
  title: string;
  department: string;
  description: string;
}

export default function Home() {
  const [generatedSOP, setGeneratedSOP] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSOP = async (formData: FormData) => {
    setError(null);
    setIsGenerating(true);
    setGeneratedSOP(''); // Initialize with empty string for streaming
    
    try {
      const prompt = `
        As a Fractional COO and Business Process Management expert for an accounting firm, create a detailed Standard Operating Procedure (SOP) document in English only.
        
        Title: ${formData.title}
        Department: ${formData.department}
        Description: ${formData.description}
        
        Use the Title, Department, and Description to align the SOP. You may change it if necessary.

        Please create a comprehensive SOP with these sections in plain text format:
        
        1. Objectives & Success Metrics - Clearly state what this procedure aims to accomplish and how success will be measured
        2. Purpose - Explain why this SOP is necessary for the accounting firm
        3. Roles - Define who is responsible for executing this SOP and who needs to be informed
        4. Resources - List all tools, access, and prerequisites needed
        5. Definition of Done - Provide a clear checklist for task completion
        6. Step-by-Step Overview - Detailed instructions in sequential order
        7. Estimated Time - How long this procedure should take
        
        IMPORTANT FORMATTING INSTRUCTIONS:
        - Use ONLY plain text format - NO markdown formatting (no asterisks, hash symbols, underscores)
        - Use simple numbering for steps (1., 2., etc.) and clear section headers
        - Use plain text capitalization for emphasis, not special characters
        - Write in professional, clear language specific to accounting firms
        - Include ENGLISH ONLY text - do not include any other languages
        - For each step, be specific and include potential points of confusion
        - Keep formatting consistent throughout the document
        
        The final SOP should be accounting-specific, professionally formatted as plain text, and ready for implementation at an accounting firm.
      `;
      
      const response = await fetch('/api/generate-sop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to generate SOP: ${response.status}`);
      }
      
      // Check if response is a stream
      if (response.headers.get('Content-Type')?.includes('text/event-stream')) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        
        if (reader) {
          let fullText = '';
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                if (line.includes('data: [DONE]')) {
                  // End of stream
                  continue;
                }
                
                try {
                  const jsonStr = line.replace('data: ', '');
                  const jsonData = JSON.parse(jsonStr);
                  
                  if (jsonData.choices && jsonData.choices[0]?.delta?.content) {
                    const content = jsonData.choices[0].delta.content;
                    fullText += content;
                    setGeneratedSOP(fullText);
                  }
                } catch {
                  // Not valid JSON or doesn't have the expected structure
                  // Just continue to the next line
                }
              }
            }
          }
        }
      } else {
        // Handle regular JSON response
        const data = await response.json();
        setGeneratedSOP(data.result);
      }
    } catch (error) {
      console.error('Error generating SOP:', error);
      setError('An error occurred while generating the SOP. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetGenerator = () => {
    setGeneratedSOP(null);
    setError(null);
  };

  return (
    <div className="py-10 px-4 container mx-auto main-content">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-[#f7f8f8]">SOP Generator</h1>
          <p className="text-[#8a8f98]">
            Create professional Standard Operating Procedures for your accounting firm in seconds
          </p>
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-700/30 text-red-300 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}
        
        <div className="card">
          {generatedSOP ? (
            <SOPResult content={generatedSOP} onReset={resetGenerator} />
          ) : (
            <SOPForm onSubmit={generateSOP} />
          )}
        </div>
        
        {isGenerating && (
          <div className="text-center mt-4">
            <p className="text-[#8a8f98]">
              {generatedSOP ? 'Still generating your SOP...' : 'Generating your SOP...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}