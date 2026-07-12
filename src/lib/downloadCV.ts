import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';


function trimCanvasWhitespace(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const step = 4; 
  let lastRowWithContent = 0;

  for (let y = height - 1; y >= 0; y--) {
    let rowHasContent = false;
    for (let x = 0; x < width; x += step) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      const isWhiteOrEmpty = a < 10 || (r > 248 && g > 248 && b > 248);
      if (!isWhiteOrEmpty) {
        rowHasContent = true;
        break;
      }
    }
    if (rowHasContent) {
      lastRowWithContent = y;
      break;
    }
  }

  const trimmedHeight = Math.min(height, lastRowWithContent + 24);

  if (trimmedHeight >= height - 4) return canvas;

  const trimmedCanvas = document.createElement('canvas');
  trimmedCanvas.width = width;
  trimmedCanvas.height = trimmedHeight;
  const trimmedCtx = trimmedCanvas.getContext('2d');
  trimmedCtx?.drawImage(canvas, 0, 0, width, trimmedHeight, 0, 0, width, trimmedHeight);
  return trimmedCanvas;
}

export async function downloadCV(elementId: string, fileName: string = 'my-cv.pdf') {
  try {
    const element = document.getElementById(elementId);

    if (!element) {
      console.error(`Element with id "${elementId}" not found`);
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'visible';

    const rawCanvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    document.body.style.overflow = originalOverflow;

    const canvas = trimCanvasWhitespace(rawCanvas);


    const imgData = canvas.toDataURL('image/jpeg', 0.93);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const naturalImgHeight = (canvas.height * pdfWidth) / canvas.width;


    if (naturalImgHeight > pdfHeight) {
      const scale = pdfHeight / naturalImgHeight;
      const drawWidth = pdfWidth * scale;
      const drawHeight = pdfHeight;
      const offsetX = (pdfWidth - drawWidth) / 2;

      pdf.addImage(imgData, 'PNG', offsetX, 0, drawWidth, drawHeight);
    } else {
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, naturalImgHeight);
    }

    pdf.save(fileName);

    console.log('CV downloaded successfully!');
  } catch (error) {
    console.error('Error downloading CV:', error);
  }
}