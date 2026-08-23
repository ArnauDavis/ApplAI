import PDFDocument from "pdfkit";

export function generateCoverLetterPdf(
  coverLetter: string
): PDFKit.PDFDocument {
  const document = new PDFDocument({
    size: "LETTER",
    margin: 72,
  });

  document
    .font("Times-Roman")
    .fontSize(12)
    .fillColor("black");

  const paragraphs = coverLetter
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  paragraphs.forEach((paragraph, index) => {
    document.text(paragraph, {
      align: "left",
      lineGap: 4,
    });

    if (index < paragraphs.length - 1) {
      document.moveDown(1);
    }
  });

  return document;
}