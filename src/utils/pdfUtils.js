import { nextTick } from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function createPdfFromHtml(elementId) {
  // DOMが完全に描画されるのを待つ
  await nextTick();

  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`要素が見つかりません。ID: ${elementId}`);
    throw new Error(`Invalid element ID: ${elementId}`);
  }

  try {
    // HTML要素をキャンバス画像に変換
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    // jsPDFを使用してPDFを生成
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // PDF名を生成
    const pdfName = `${new Date().toISOString().slice(0, 10)}.pdf`;
    pdf.save(pdfName);

    return pdfName;
  } catch (error) {
    console.error("PDF作成中にエラーが発生しました:", error);
    throw error;
  }
}
