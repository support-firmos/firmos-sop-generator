'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import SOPForm from '@/components/SOPForm';
import SOPResult from '@/components/SOPResult';

export default function Home() {
  const [generatedSOP, setGeneratedSOP] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSOP = async (formData: any) => {
    setError(null);
    setIsGenerating(true);
    
    try {
      const prompt = `
        Create a detailed Standard Operating Procedure (SOP) for an accounting firm.
        
        Title: ${formData.title}
        Department: ${formData.department}
        Description: ${formData.description}
        
        Please format the SOP with the following sections:
        1. Purpose
        2. Scope
        3. Responsibilities
        4. Procedure (detailed step-by-step instructions)
        5. References/Related Documents
        6. Revision History
        
        Make it professional, clear, and specific to accounting firms.
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
    } catch (err) {
      console.error('Error generating SOP:', err);
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">SOP Generator</h1>
            <p className="text-gray-600">
              Create professional Standard Operating Procedures for your accounting firm in seconds
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {generatedSOP ? (
            <SOPResult content={generatedSOP} onReset={resetGenerator} />
          ) : (
            <SOPForm onSubmit={generateSOP} />
          )}
        </div>
      </main>
      
      <footer className="bg-vampireBlack text-cultured py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} FirmOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}