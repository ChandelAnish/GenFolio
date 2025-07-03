// import PortfolioInputChoice from '@/components/PortfolioInputChoice'

// export default function page() {
//   return (
//     <>
//       <PortfolioInputChoice />
//     </>
//   )
// }

'use client';

import { useState } from 'react';
import { extractPDFData, type ExtractedData } from '@/utils/pdfExtractor';

export default function ResumeParser() {
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }

    setIsLoading(true);
    
    try {
      const data = await extractPDFData(file);
      setExtractedData(data);
      
      // Console log all the extracted data
      console.log('=== EXTRACTED RESUME DATA ===');
      console.log('File Metadata:', data.metadata);
      console.log('Text Length:', data.text.length, 'characters');
      console.log('Raw Text Content:');
      console.log(data.text);
      console.log('Links/Emails Found:', data.links.length);
      console.log('Links:', data.links);
      console.log('Phone Numbers Found:', data.phoneNumbers.length);
      console.log('Phone Numbers:', data.phoneNumbers);
      console.log('==========================');
      
    } catch (error) {
      console.error('Error extracting PDF data:', error);
      alert('Error processing PDF file. Make sure it\'s a valid PDF with readable text.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">PDF Resume Parser</h1>
      
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        disabled={isLoading}
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:bg-gray-50 hover:file:bg-gray-100"
      />
      
      {isLoading && (
        <div className="text-center py-4 text-blue-600">
          Processing PDF...
        </div>
      )}
      
      {extractedData && (
        <div className="space-y-4">
          <div className="bg-green-50 p-3 rounded">
            <strong>✅ Success!</strong> Extracted {extractedData.text.length} characters, 
            {extractedData.links.length} links, and {extractedData.phoneNumbers.length} phone numbers from {extractedData.metadata.fileName}
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Text Preview:</h3>
            <textarea
              readOnly
              value={extractedData.text.substring(0, 500) + (extractedData.text.length > 500 ? '...' : '')}
              className="w-full h-32 p-2 border rounded text-xs"
            />
          </div>
          
          {extractedData.phoneNumbers.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Phone Numbers:</h3>
              <div className="bg-gray-50 p-2 rounded max-h-32 overflow-y-auto">
                {extractedData.phoneNumbers.map((phone, i) => (
                  <div key={i} className="text-xs text-green-600 break-all">
                    {phone}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {extractedData.links.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Links/Emails:</h3>
              <div className="bg-gray-50 p-2 rounded max-h-32 overflow-y-auto">
                {extractedData.links.map((link, i) => (
                  <div key={i} className="text-xs text-blue-600 break-all">
                    {link}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="text-xs text-gray-600">
            Check browser console for complete extracted data
          </div>
        </div>
      )}
    </div>
  );
}