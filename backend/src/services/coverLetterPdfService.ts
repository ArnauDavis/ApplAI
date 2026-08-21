import PDFDocument from "pdfkit";

export function generateCoverLetterPdf(
  coverLetter: string
): PDFKit.PDFDocument {
  const document = new PDFDocument({
    size: "LETTER",
    margins: {
      top: 72,
      bottom: 72,
      left: 72,
      right: 72,
    },
  });

  document
    .font("Times-Roman")
    .fontSize(12)
    .lineGap(6);

  const paragraphs = coverLetter
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  paragraphs.forEach((paragraph, index) => {
    document.text(paragraph, {
      align: "left",
    });

    if (index < paragraphs.length - 1) {
      document.moveDown(1);
    }
  });

  return document;
}