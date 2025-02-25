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
  const [isGenerating, setIsGenerating] = useState(false); // We'll use this now
  const [error, setError] = useState<string | null>(null);

  const generateSOP = async (formData: FormData) => {
    setError(null);
    setIsGenerating(true);
    
    try {
      const prompt = `
        Create a detailed Standard Operating Procedure (SOP) document for an accounting firm.
        
        Title: ${formData.title}
        Department: ${formData.department}
        Description: ${formData.description}
        
        Format the SOP with these numbered sections:
        1. Purpose
        2. Scope
        3. Responsibilities
        4. Procedure (detailed step-by-step instructions)
        5. References/Related Documents
        6. Revision History
        
        CRITICAL FORMATTING REQUIREMENTS:
        - DO NOT USE ANY MARKDOWN FORMATTING SYMBOLS including asterisks (*), hash symbols (#), underscores (_), or hyphens for bullet points
        - DO NOT include any "---" horizontal rules or dividers
        - Format all section titles in PLAIN TEXT without any special formatting (Example: "1. Purpose" not "### **1. Purpose**")
        - All emphasis must be done through CAPITALIZATION or spacing, not through formatting symbols
        - For bullet points, use simple dashes or numbers followed by periods (1., 2., etc.)
        - For the Revision History, use simple spacing (not markdown table formatting with pipes |)
        - Return ONLY the plain text SOP without any additional commentary
        
        The final result should be COMPLETELY FREE of markdown syntax and should be formatted as a plain text document that could be pasted directly into a word processor without any special formatting.
      `;
      
      const response = await fetch('/api/generate-sop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate SOP');
      }
      
      const data = await response.json();
      setGeneratedSOP(data.result);
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
        
        {/* Now we use isGenerating state to show a loading indicator */}
        {isGenerating && (
          <div className="text-center mt-4">
            <p className="text-[#8a8f98]">Generating your SOP...</p>
          </div>
        )}
      </div>
    </div>
  );
}