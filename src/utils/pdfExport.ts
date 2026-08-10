import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export interface PDFExportOptions {
  filename?: string;
  orientation?: 'landscape' | 'portrait' | 'auto';
  title?: string;
  marginMm?: number;
  scale?: number;
  fitToSinglePage?: boolean;
}

/**
 * Loads an image from a Data URL to obtain its natural dimensions.
 */
function loadImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height
      });
    };
    img.onerror = (err) => reject(err);
    img.src = dataUrl;
  });
}

/**
 * Exports a DOM element or container to a high-resolution PDF file.
 * Uses html-to-image to natively render the element (including OKLCH colors and SVGs).
 * When fitToSinglePage is true, it scales the element to fit precisely inside 1 A4 page.
 */
export async function exportElementToPDF(
  elementOrId: HTMLElement | string,
  options: PDFExportOptions = {}
): Promise<boolean> {
  try {
    const targetElement: HTMLElement | null =
      typeof elementOrId === 'string'
        ? document.getElementById(elementOrId)
        : elementOrId;

    if (!targetElement) {
      console.error(`Target element not found: ${elementOrId}`);
      return false;
    }

    // Capture using browser-native SVG foreignObject renderer via html-to-image
    const dataUrl = await toPng(targetElement, {
      quality: 0.98,
      pixelRatio: options.scale || 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
      filter: (node) => {
        // Exclude elements marked as print:hidden or export-exclude
        if (node instanceof HTMLElement) {
          if (node.classList.contains('print:hidden') && node.id !== targetElement.id) {
            return false;
          }
        }
        return true;
      }
    });

    const { width: canvasWidth, height: canvasHeight } = await loadImageDimensions(dataUrl);
    const aspectRatio = canvasWidth / canvasHeight;

    // Determine orientation
    let orientation: 'landscape' | 'portrait' = 'portrait';
    if (options.orientation === 'landscape') {
      orientation = 'landscape';
    } else if (options.orientation === 'portrait') {
      orientation = 'portrait';
    } else {
      // Auto: if wider than tall by 10%, choose landscape
      orientation = aspectRatio >= 1.1 ? 'landscape' : 'portrait';
    }

    // Standard A4 dimensions in mm
    const a4Width = orientation === 'landscape' ? 297 : 210;
    const a4Height = orientation === 'landscape' ? 210 : 297;
    const margin = options.marginMm ?? 6;

    const printableWidth = a4Width - margin * 2;
    const printableHeight = a4Height - margin * 2;

    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    if (options.fitToSinglePage) {
      // Fit completely and proportionally onto 1 Page A4
      const scaleX = printableWidth / canvasWidth;
      const scaleY = printableHeight / canvasHeight;
      const scaleFactor = Math.min(scaleX, scaleY);

      const finalImgWidth = canvasWidth * scaleFactor;
      const finalImgHeight = canvasHeight * scaleFactor;

      // Center within printable margins
      const xOffset = margin + (printableWidth - finalImgWidth) / 2;
      const yOffset = margin + (printableHeight - finalImgHeight) / 2;

      pdf.addImage(dataUrl, 'PNG', xOffset, yOffset, finalImgWidth, finalImgHeight, undefined, 'FAST');
    } else {
      // Calculate image dimensions on PDF page
      const imgPdfWidth = printableWidth;
      const imgPdfHeight = (printableWidth / canvasWidth) * canvasHeight;

      if (imgPdfHeight <= printableHeight) {
        // Fits on a single page naturally
        const yOffset = margin + Math.max(0, (printableHeight - imgPdfHeight) / 2);
        pdf.addImage(dataUrl, 'PNG', margin, yOffset, imgPdfWidth, imgPdfHeight, undefined, 'FAST');
      } else {
        // Multi-page slicing for taller dashboards (e.g. Analytics View)
        let remainingHeight = imgPdfHeight;
        let position = margin;
        let page = 1;

        while (remainingHeight > 0) {
          if (page > 1) {
            pdf.addPage('a4', orientation);
          }

          pdf.addImage(
            dataUrl,
            'PNG',
            margin,
            position,
            imgPdfWidth,
            imgPdfHeight,
            undefined,
            'FAST'
          );

          remainingHeight -= printableHeight;
          position -= printableHeight;
          page++;
        }
      }
    }

    const outputName = options.filename?.endsWith('.pdf')
      ? options.filename
      : `${options.filename || 'report'}.pdf`;

    pdf.save(outputName);
    return true;
  } catch (err) {
    console.error('Error generating PDF:', err);
    return false;
  }
}

/**
 * Prints a DOM element cleanly using a hidden iframe.
 * Avoids sandbox restrictions and prints crisp visual rendering with full styling.
 */
export async function printElement(
  elementOrId: HTMLElement | string,
  options: { title?: string; orientation?: 'landscape' | 'portrait' } = {}
): Promise<boolean> {
  try {
    const targetElement: HTMLElement | null =
      typeof elementOrId === 'string'
        ? document.getElementById(elementOrId)
        : elementOrId;

    if (!targetElement) {
      console.error(`Target element not found for printing: ${elementOrId}`);
      window.print();
      return false;
    }

    const orientation = options.orientation || 'landscape';
    const title = options.title || 'Visitor Log Report';

    // Capture crisp image of the element with high pixel ratio
    const dataUrl = await toPng(targetElement, {
      quality: 0.98,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
      filter: (node) => {
        if (node instanceof HTMLElement && node.classList.contains('print:hidden') && node.id !== targetElement.id) {
          return false;
        }
        return true;
      }
    });

    // Create a temporary hidden iframe for clean printing
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document || iframe.contentDocument;
    if (!iframeDoc || !iframe.contentWindow) {
      window.print();
      document.body.removeChild(iframe);
      return true;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${title}</title>
          <style>
            @page {
              size: ${orientation};
              margin: 6mm;
            }
            html, body {
              margin: 0;
              padding: 0;
              background: #ffffff;
              width: 100%;
              height: 100%;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            body {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            img {
              max-width: 100%;
              max-height: 98vh;
              width: auto;
              height: auto;
              object-fit: contain;
              display: block;
              margin: auto;
            }
          </style>
        </head>
        <body>
          <img id="print-canvas-img" src="${dataUrl}" alt="Print Preview" />
        </body>
      </html>
    `;

    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();

    const img = iframeDoc.getElementById('print-canvas-img') as HTMLImageElement;

    const triggerPrint = () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (err) {
        console.warn('Iframe print encountered error, invoking direct window print', err);
        window.print();
      } finally {
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 2500);
      }
    };

    if (img && !img.complete) {
      img.onload = () => setTimeout(triggerPrint, 350);
      img.onerror = () => triggerPrint();
    } else {
      setTimeout(triggerPrint, 350);
    }

    return true;
  } catch (error) {
    console.error('Print element error, fallback to window.print()', error);
    try {
      window.print();
    } catch {
      // ignore
    }
    return false;
  }
}


