// components/SOPResult.tsx
import { useState } from 'react';
import Button from './Button';

interface SOPResultProps {
  content: string;
  onReset: () => void;
}

export default function SOPResult({ content, onReset }: SOPResultProps) {
  const [copySuccess, setCopySuccess] = useState('');
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch {
      // No parameter needed since we're not using it
      setCopySuccess('Failed to copy');
    }
  };
  
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'SOP_Document.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-cultured">Generated SOP</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copySuccess || 'Copy'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            Download
          </Button>
          <Button variant="secondary" size="sm" onClick={onReset}>
            Create New
          </Button>
        </div>
      </div>
      
      <div className="p-6 bg-surface-1 border border-argent/20 rounded-xl shadow-md">
        <div className="prose prose-invert max-w-none whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
}