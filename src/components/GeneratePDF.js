import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const GeneratePDF = async (elementId) => {
  const input = document.getElementById(elementId);

  const canvas = await html2canvas(input, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("Invoice_NavkarTexFab.pdf");
};

export default GeneratePDF;
