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

interface ExtractedData {
  text: string;
  links: string[];
  phoneNumbers: string[];
  metadata: {
    fileName: string;
    fileSize: number;
    fileType: string;
  };
}

export default function ResumeParser() {
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  const loadPDFJS = async () => {
    return new Promise((resolve, reject) => {
      if ((window as any).pdfjsLib) {
        resolve((window as any).pdfjsLib);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve((window as any).pdfjsLib);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const extractPDFData = async (file: File): Promise<ExtractedData> => {
    // Load PDF.js library
    const pdfjsLib = await loadPDFJS();
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await (pdfjsLib as any).getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    let allLinks: string[] = [];
    
    // Extract text and links from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      
      // Extract text content
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
      
      // Extract hyperlink annotations
      const annotations = await page.getAnnotations();
      
      annotations.forEach((annotation: any) => {
        if (annotation.subtype === 'Link') {
          // Extract URL from different types of link annotations
          if (annotation.url) {
            // Direct URL
            allLinks.push(annotation.url);
          } else if (annotation.unsafeUrl) {
            // Unsafe URL (still valid)
            allLinks.push(annotation.unsafeUrl);
          } else if (annotation.action && annotation.action.url) {
            // Action-based URL
            allLinks.push(annotation.action.url);
          }
        }
      });
    }
    
    // Clean up the extracted text
    const cleanText = fullText
      .replace(/\s+/g, ' ')
      .trim();
    
    // Also extract any visible URLs from text as fallback
    const textUrls: string[] = [];
    const patterns = [
      /https?:\/\/[^\s\)]+/g,
      /www\.[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[^\s\)]*/g,
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    ];
    
    patterns.forEach(pattern => {
      const matches = cleanText.match(pattern);
      if (matches) {
        textUrls.push(...matches);
      }
    });
    
    // Extract phone numbers with comprehensive patterns - FIXED
    const phonePatterns = [
      // International format with country code in parentheses: (+91) 1234567890
      /\(\+\d{1,4}\)[\s\-]?\d{3,5}[\s\-]?\d{3,5}[\s\-]?\d{3,5}/g,
      // International format with country code: +91 12345 67890 or +91-12345-67890
      /\+\d{1,4}[\s\-]?\d{3,5}[\s\-]?\d{3,5}[\s\-]?\d{3,5}/g,
      // US format: (123) 456-7890 or 123-456-7890
      /\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}/g,
      // Indian format without country code: 12345 67890 or 12345-67890
      /\d{5}[\s\-]?\d{5}/g,
      // General 10-digit format
      /\d{10}/g,
      // Other international formats
      /\d{3,4}[\s\-]\d{3,4}[\s\-]\d{3,4}/g,
    ];
    
    const phoneNumbers: string[] = [];
    phonePatterns.forEach(pattern => {
      const matches = cleanText.match(pattern);
      if (matches) {
        phoneNumbers.push(...matches);
      }
    });
    
    // Clean and deduplicate phone numbers
    const cleanedPhoneNumbers = [...new Set(phoneNumbers)]
      .map(phone => phone.trim())
      .filter(phone => {
        // Remove obvious false positives
        if (phone.length < 7) return false;
        // Must contain at least some digits
        if (!/\d{7,}/.test(phone.replace(/[\s\-\(\)\+]/g, ''))) return false;
        return true;
      });

    // Remove duplicate phone numbers where one is a substring of another
    const uniquePhoneNumbers = cleanedPhoneNumbers.filter((phone, index) => {
      const phoneDigits = phone.replace(/[\s\-\(\)\+]/g, '');
      
      // Check if this phone number's digits are contained in any other phone number
      return !cleanedPhoneNumbers.some((otherPhone, otherIndex) => {
        if (index === otherIndex) return false;
        const otherPhoneDigits = otherPhone.replace(/[\s\-\(\)\+]/g, '');
        // If current phone's digits are contained in another phone, exclude it
        return otherPhoneDigits.includes(phoneDigits) && otherPhoneDigits.length > phoneDigits.length;
      });
    });
    
    // Combine hyperlink URLs and text URLs
    const combinedLinks = [...allLinks, ...textUrls];
    
    // Clean and deduplicate links
    const uniqueLinks = [...new Set(combinedLinks)]
      .map(link => link.trim())
      .filter(link => {
        if (!link || link.length < 4) return false;
        if (!link.includes('.')) return false;
        return true;
      });
    
    return {
      text: cleanText,
      links: uniqueLinks,
      phoneNumbers: uniquePhoneNumbers,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      }
    };
  };

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