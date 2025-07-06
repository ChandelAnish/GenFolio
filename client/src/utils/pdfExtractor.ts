// utils/pdfExtractor.ts

export interface ExtractedData {
  text: string;
  links: string[];
  phoneNumbers: string[];
  metadata: {
    fileName: string;
    fileSize: number;
    fileType: string;
  };
  profileImage?: string;
  resumeUrl?: string;
}

// PDF.js type definitions
interface PDFTextItem {
  str: string;
  dir: string;
  width: number;
  height: number;
  transform: number[];
  fontName: string;
}

interface PDFTextContent {
  items: PDFTextItem[];
}

interface PDFAnnotation {
  subtype: string;
  url?: string;
  unsafeUrl?: string;
  action?: {
    url?: string;
  };
}

interface PDFPage {
  getTextContent(): Promise<PDFTextContent>;
  getAnnotations(): Promise<PDFAnnotation[]>;
}

interface PDFDocument {
  numPages: number;
  getPage(pageNum: number): Promise<PDFPage>;
}

interface PDFLib {
  getDocument(config: { data: ArrayBuffer }): { promise: Promise<PDFDocument> };
  GlobalWorkerOptions: {
    workerSrc: string;
  };
}

declare global {
  interface Window {
    pdfjsLib?: PDFLib;
  }
}

const loadPDFJS = async (): Promise<PDFLib> => {
  return new Promise((resolve, reject) => {
    if (window.pdfjsLib) {
      resolve(window.pdfjsLib);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      } else {
        reject(new Error("PDF.js failed to load"));
      }
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export const extractPDFData = async (file: File): Promise<ExtractedData> => {
  // Load PDF.js library
  // Calls the helper we discussed earlier (loadPDFJS) so the PDF.js library is loaded and configured.
  // After this line, pdfjsLib is the “toolbox” we’ll use to read the PDF.
  const pdfjsLib = await loadPDFJS();

  const arrayBuffer = await file.arrayBuffer(); // arrayBuffer() converts the file into a chunk of binary data (an “array buffer”) that PDF.js understands.
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";
  let allLinks: string[] = [];

  // Extract text and links from all pages
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum); // This loads one page from the PDF. Page is now that page’s object.

    // Extract text content
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: PDFTextItem) => item.str)
      .join(" ");
    fullText += pageText + "\n";

    // Extract hyperlink annotations
    const annotations = await page.getAnnotations();

    annotations.forEach((annotation: PDFAnnotation) => {
      if (annotation.subtype === "Link") {
        // Extract URL from different types of link annotations
        if (annotation.url) {
          // Direct URL
          allLinks.push(annotation.url);
        } else if (annotation.unsafeUrl) {
          // Unsafe URL (still valid)
          allLinks.push(annotation.unsafeUrl); // PDF.js flags some URLs as “unsafe” but they’re still usable.
        } else if (annotation.action && annotation.action.url) {
          // Action-based URL
          allLinks.push(annotation.action.url);
        }
      }
    });
  }

  // Clean up the extracted text
  const cleanText = fullText.replace(/\s+/g, " ").trim(); // \s+ means “one or more whitespace characters.”. We replace any run of whitespace with a single space and trim off leading/trailing blanks.

  // Also extract any visible URLs from text as fallback
  const textUrls: string[] = [];
  const patterns = [
    /https?:\/\/[^\s\)]+/g,
    /www\.[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[^\s\)]*/g,
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  ];

  patterns.forEach((pattern) => {
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
  phonePatterns.forEach((pattern) => {
    const matches = cleanText.match(pattern);
    if (matches) {
      phoneNumbers.push(...matches);
    }
  });

  // Clean and deduplicate phone numbers
  const cleanedPhoneNumbers = [...new Set(phoneNumbers)]
    .map((phone) => phone.trim())
    .filter((phone) => {
      // Remove obvious false positives
      if (phone.length < 7) return false;
      // Must contain at least some digits
      if (!/\d{7,}/.test(phone.replace(/[\s\-\(\)\+]/g, ""))) return false;
      return true;
    });

  // Remove duplicate phone numbers where one is a substring of another
  const uniquePhoneNumbers = cleanedPhoneNumbers.filter((phone, index) => {
    const phoneDigits = phone.replace(/[\s\-\(\)\+]/g, "");

    // Check if this phone number's digits are contained in any other phone number
    return !cleanedPhoneNumbers.some((otherPhone, otherIndex) => {
      if (index === otherIndex) return false;
      const otherPhoneDigits = otherPhone.replace(/[\s\-\(\)\+]/g, "");
      // If current phone's digits are contained in another phone, exclude it
      return (
        otherPhoneDigits.includes(phoneDigits) &&
        otherPhoneDigits.length > phoneDigits.length
      );
    });
  });

  // Combine hyperlink URLs and text URLs
  const combinedLinks = [...allLinks, ...textUrls];

  // Clean and deduplicate links
  const uniqueLinks = [...new Set(combinedLinks)]
    .map((link) => link.trim())
    .filter((link) => {
      if (!link || link.length < 4) return false;
      if (!link.includes(".")) return false;
      return true;
    });

  return {
    text: cleanText,
    links: uniqueLinks,
    phoneNumbers: uniquePhoneNumbers,
    metadata: {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    },
  };
};
