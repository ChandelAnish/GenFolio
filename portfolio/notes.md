# Developer Reference Guide

## Table of Contents
1. [Tailwind CSS Classes](#tailwind-css-classes)
2. [JavaScript DOM Methods](#javascript-dom-methods)
3. [CSS Positioning & Flexbox](#css-positioning--flexbox)
4. [Gradient Text Effects](#gradient-text-effects)
5. [React & TypeScript](#react--typescript)
6. [Framer Motion Animations](#framer-motion-animations)
7. [Next.js API Routes & SSG](#nextjs-api-routes--ssg)
8. [MongoDB Queries](#mongodb-queries)
9. [PDF Generation with KendoReact](#pdf-generation-with-kendoreact)
10. [File Compression with JSZip](#file-compression-with-jszip)

---

## Tailwind CSS Classes

### Border Radius
- `rounded-tr-full` - Fully rounded top-right corner
- `rounded-bl-full` - Fully rounded bottom-left corner  
- `rounded-br-full` - Fully rounded bottom-right corner

### Positioning & Gradients
- `inset-0` - Sets all four inset properties (top, right, bottom, left) to 0
- `bg-gradient-to-br` - Background gradient from top-left to bottom-right
- `from-purple-500/20` - Starting color: semi-transparent purple (20% opacity)
- `to-transparent` - Ending color: transparent
- `pointer-events-none` - Disables mouse interactions

### Dynamic Class Names ⚠️
Tailwind does not support dynamically injecting pseudo-classes inside template strings.

```javascript
// ✅ Correct way
const timelineDotOuterColor = "before:bg-cyan-400"; 
<div className={`relative before:w-16 before:h-16 ${timelineDotOuterColor} before:opacity-40`} />

// ❌ Wrong way (won't work)
const timelineDotOuterColor = "bg-cyan-400";
<div className={`before:${timelineDotOuterColor}`} />
```

**Why?** Tailwind compiles class names at build time. Pseudo-classes like `before:` must be part of the static class string.

---

## JavaScript DOM Methods

### `getBoundingClientRect()`
Built-in method that returns the size and position of an element relative to the viewport.

#### Properties:
- **`top`** - Distance from viewport top to element top
  - Positive: element is below screen top
  - Negative: element is partially above viewport
  - Zero: element is exactly at viewport top
- **`height`** - Element's total height in pixels (doesn't change when scrolling)

#### `window.innerHeight`
Returns the height of the browser's visible area (viewport) in pixels.

---

## CSS Positioning & Flexbox

### Absolute Positioning Behavior
When an element has `position: absolute`:
- Removed from normal document flow
- Parent's flexbox rules (like `flex-col`) don't apply
- Position controlled by `top`, `left`, `right`, `bottom` values

---

## Gradient Text Effects

### Required Classes
1. **`bg-clip-text`** - Clips background to text shape only
2. **`text-transparent`** - Makes text color transparent to show gradient

```css
.gradient-text {
  background: linear-gradient(to right, #purple, #blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

---

## React & TypeScript

### Function Component with TypeScript
```typescript
const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
  company, role, duration, description, highlights, icon, index 
}) => {
  // component logic
}
```

- `React.FC<ExperienceCardProps>` - Typed Function Component
- Props must match the `ExperienceCardProps` interface

### Redux with TypeScript
```typescript
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
```
- `withTypes` - Redux Toolkit v2 utility for type safety
- `ReturnType` - TypeScript utility to extract function return type

### Client vs Server Components
- Redux typically works in **client components** (runs in browser)
- React component must be rendered as JSX/TSX element inside JSX/TSX file

---

## Framer Motion Animations

### Basic Animation Setup
```jsx
<motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: index * 0.2 }}
  viewport={{ once: true }}
/>
```

### Viewport Options
- `once: true` - Animation runs only once when entering viewport
- `once: false` - Animation runs every time element enters viewport
- `amount: 0.5` - Triggers when 50% of element is visible (default: 0.25)
- `amount: 1` - Triggers when entire element is visible

### useScroll Hook
```javascript
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]
});
```

#### Offset Values
- `"start start"` - Top of element aligns with top of viewport
- `"end start"` - Bottom of element aligns with top of viewport
- `["center center", "center start"]` - Custom start/end points

### useTransform Hook
Maps one value to another for smooth animations.

```javascript
const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
```

**Syntax:** `useTransform(inputValue, [inputRange], [outputRange])`

---

## Next.js API Routes & SSG

### API Route Structure
```typescript
// app/api/users/[email]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const encodedEmail = params.email;
  const decodedEmail = decodeURIComponent(encodedEmail);
  
  return NextResponse.json({ email: decodedEmail });
}
```

### Required Exports
- Must use **named exports** (GET, POST, PUT, DELETE)
- Next.js maps HTTP methods to these exports
- `params` passed separately from `req` as second argument
- Use `decodeURIComponent()` for URL-encoded values

### SSG Build Issues ⚠️
```javascript
// This causes build errors during SSG
const data = await fetch('http://localhost:3000/api/data');
```

**Problem:** Local API routes aren't available during build time
**Solution:** Use external APIs or database calls directly in server components

---

## MongoDB Queries

### Nested Field Queries
```javascript
// ❌ Wrong - won't match nested fields correctly
const user = await UserPortfolioData.findOne({ 
  portfolio: { connect: { mail: "user@email.com" } } 
});

// ✅ Correct - use dot notation
const user = await UserPortfolioData.findOne({
  "portfolio.connect.mail": "user@email.com"
});
```

---

## PDF Generation with KendoReact

### Overview
KendoReact's `savePDF` converts DOM elements to PDF files client-side.

### Process Flow
1. **Pick the area** - Pass DOM element reference
2. **Read styles** - Get computed CSS (fonts, colors, sizes)
3. **Layout** - Measure element dimensions and positions
4. **Create drawing** - Convert to vector scene (text, shapes, images)
5. **Paginate** - Split into PDF pages with margins
6. **Embed assets** - Include fonts and images
7. **Generate & download** - Create PDF file and trigger download

### Simple Usage
```javascript
import { savePDF } from "@progress/kendo-react-pdf";

const downloadPDF = () => {
  if (resumeRef.current) {
    savePDF(resumeRef.current, {
      paperSize: "A4",
      scale: 0.75,
      margin: { top: "1cm", left: "1cm", right: "1cm", bottom: "1cm" },
      fileName: "resume.pdf"
    });
  }
};
```

### Advanced Usage with Blob
```javascript
import { drawDOM, exportPDF } from "@progress/kendo-drawing";

const getResumePdfBlob = async () => {
  if (!resumeRef.current) return null;

  const element = resumeRef.current as HTMLElement;

  // 1) DOM -> drawing scene
  const group = await drawDOM(element, {
    paperSize: "A4",
    scale: 0.75,
    margin: { top: "1cm", left: "1cm", right: "1cm", bottom: "1cm" },
  });

  // 2) Scene -> PDF Data URI
  const dataUri = await exportPDF(group, {
    paperSize: "A4",
    margin: { top: "1cm", left: "1cm", right: "1cm", bottom: "1cm" },
  });

  // 3) Data URI -> Blob
  const res = await fetch(dataUri);
  const blob = await res.blob();
  return blob;
};
```

### Data URI to Blob Conversion
```javascript
const res = await fetch(dataUri);  // No network call - parses local data URI
const blob = await res.blob();    // Converts to binary Blob object
```

**What happens:**
- `fetch(dataUri)` reads the base64-encoded data locally
- `res.blob()` converts to a binary file object
- Result: PDF file as Blob for upload/download

### Manual Download
```javascript
const blob = await getResumePdfBlob();
if (blob) {
  const filename = `${name.replace(/\s+/g, "_")}_Resume.pdf`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
```

### Key Features
- **Text selectability**: Normal text remains selectable in PDF
- **Font embedding**: TTF fonts ensure proper text rendering
- **Image handling**: Requires CORS for external images
- **Returns**: `savePDF` downloads file; use `drawDOM` + `exportPDF` for Blob data

---

## File Compression with JSZip

### Basic Setup
```javascript
import JSZip from "jszip";

type NamedBlob = { blob: Blob; filename: string };
```

### Creating ZIP Files
```javascript
async function zipAndDownloadResumes(files: NamedBlob[]) {
  const zip = new JSZip();
  const folder = zip.folder("resumes"); // Create folder inside ZIP

  files.forEach(({ blob, filename }) => {
    const safeName = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
    folder!.file(safeName, blob); // Add PDF to folder
  });

  // Generate ZIP as Blob
  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 }, // 1 (fast) to 9 (smallest)
  });

  // Download ZIP
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "resumes.zip";
  a.click();
  URL.revokeObjectURL(url);
}
```

### Usage Example
```javascript
const blob1 = await getResumePdfBlob();
const blob2 = await getResumePdfBlob();

await zipAndDownloadResumes([
  { blob: blob1, filename: "John_Doe_Resume.pdf" },
  { blob: blob2, filename: "Jane_Smith_Resume.pdf" },
]);
```

### DEFLATE Compression
- **Lossless compression** method used in ZIP files
- **Combines two techniques:**
  - LZ77: Finds repeated patterns, replaces with references
  - Huffman coding: Short codes for frequent bytes, long codes for rare ones
- **Compression levels:** 1 (fastest) to 9 (smallest file size)

### File-Saver Alternative
```javascript
import { saveAs } from "file-saver";

// Simple download
saveAs(zipBlob, "resumes.zip");
saveAs(pdfBlob, "resume.pdf");

// Text file example
const textBlob = new Blob(["Hello World"], { type: "text/plain;charset=utf-8" });
saveAs(textBlob, "hello.txt");
```

### Memory Considerations
- All operations happen **in memory** until download
- `new JSZip()` creates in-memory container
- `zip.folder()` creates virtual folder structure
- `zip.generateAsync()` produces final ZIP Blob
- Only touches disk when triggering download

---

## Utility Organization

### Folder Structure
- **`utils/`** - General-purpose utility functions
- **`lib/`** - Specialized libraries and helper functions

This organization helps maintain clean separation between generic utilities and domain-specific functionality.