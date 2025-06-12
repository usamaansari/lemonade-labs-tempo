"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  content: HTMLElement | null;
  filename: string;
  type: "image" | "pdf";
  className?: string;
}

export default function DownloadButton({
  content,
  filename,
  type,
  className = "",
}: DownloadButtonProps) {
  const handleDownload = async () => {
    if (!content) return;

    try {
      if (type === "image") {
        // Use html-to-image library functionality
        const { toJpeg } = await import("html-to-image");
        const dataUrl = await toJpeg(content, { quality: 0.95 });

        // Create download link
        const link = document.createElement("a");
        link.download = `${filename}.jpg`;
        link.href = dataUrl;
        link.click();
      } else if (type === "pdf") {
        // Use html2pdf library functionality
        const jspdfModule = await import("jspdf");
        const html2canvasModule = await import("html2canvas");
        const jsPDF = jspdfModule.jsPDF;
        const html2canvas = html2canvasModule.default;

        const canvas = await html2canvas(content);
        const imgData = canvas.toDataURL("image/jpeg", 1.0);

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${filename}.pdf`);
      }
    } catch (error) {
      console.error("Error generating download:", error);
      alert("There was an error generating your download. Please try again.");
    }
  };

  return (
    <Button onClick={handleDownload} className={className} variant="outline">
      <Download className="mr-2 h-4 w-4" />
      Download {type === "image" ? "Image" : "PDF"}
    </Button>
  );
}
