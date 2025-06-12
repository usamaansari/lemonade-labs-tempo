"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { DraggableItem, DropZone } from "@/components/drag-drop-container";
import DownloadButton from "@/components/download-button";
import {
  PlusCircle,
  Type,
  Image as ImageIcon,
  Save,
  Video,
  Music,
  Sticker,
  Upload,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Template {
  id: number;
  name: string;
  description: string;
  image: string;
  color: string;
}

interface PosterDesignerClientProps {
  templates: Template[];
  stockImages: string[];
}

type ElementType =
  | "heading"
  | "subheading"
  | "bodyText"
  | "smallText"
  | "image"
  | "video"
  | "audio"
  | "sticker"
  | "uploadedImage";

interface PosterElement {
  id: string;
  type: ElementType;
  content: string;
  position: { x: number; y: number };
  style?: Record<string, string | number>;
  size?: { width: number; height: number };
  isResizable?: boolean;
}

const STICKERS = [
  "/stickers/star.svg",
  "/stickers/heart.svg",
  "/stickers/thumbs-up.svg",
  "/stickers/dollar.svg",
  "/stickers/trophy.svg",
  "/stickers/rocket.svg",
].map(
  (s) =>
    `https://api.dicebear.com/7.x/icons/svg?icon=${s.replace("/stickers/", "")}`,
); // Using dicebear for placeholder stickers

export default function PosterDesignerClient({
  templates,
  stockImages,
}: PosterDesignerClientProps) {
  const [activeTemplate, setActiveTemplate] = useState<Template>(templates[0]);
  const [posterElements, setPosterElements] = useState<PosterElement[]>([
    {
      id: "heading-1",
      type: "heading",
      content: "GRAND OPENING!",
      position: { x: 0, y: 0 },
      style: { color: "#9333ea", fontSize: "2.25rem", fontWeight: "bold" },
      isResizable: false,
    },
    {
      id: "image-1",
      type: "image",
      content: templates[0].image,
      position: { x: 0, y: 80 },
      size: { width: 300, height: 200 },
      isResizable: true,
    },
    {
      id: "subheading-1",
      type: "subheading",
      content: "Your Business Name",
      position: { x: 0, y: 350 },
      style: { fontSize: "1.5rem", fontWeight: "600" },
      isResizable: false,
    },
    {
      id: "bodyText-1",
      type: "bodyText",
      content: "Join us for our grand opening celebration!",
      position: { x: 0, y: 400 },
      style: { fontSize: "1.125rem" },
      isResizable: false,
    },
    {
      id: "bodyText-2",
      type: "bodyText",
      content: "Saturday, June 15th • 10am - 6pm",
      position: { x: 0, y: 450 },
      style: { fontSize: "1.25rem", fontWeight: "bold" },
      isResizable: false,
    },
    {
      id: "smallText-1",
      type: "smallText",
      content: "Special discounts • Free samples • Fun activities",
      position: { x: 0, y: 500 },
      style: { fontSize: "1rem" },
      isResizable: false,
    },
  ]);

  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showStickers, setShowStickers] = useState(false);
  const posterCanvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleElementPositionChange = (
    id: string,
    position: { x: number; y: number },
  ) => {
    setPosterElements((elements) =>
      elements.map((el) => (el.id === id ? { ...el, position } : el)),
    );
  };

  const handleElementResize = (
    id: string,
    size: { width: number; height: number },
  ) => {
    setPosterElements((elements) =>
      elements.map((el) => (el.id === id ? { ...el, size } : el)),
    );
  };

  const addTextElement = (
    type: "heading" | "subheading" | "bodyText" | "smallText",
  ) => {
    const newElement: PosterElement = {
      id: `${type}-${Date.now()}`,
      type,
      content:
        type === "heading"
          ? "New Heading"
          : type === "subheading"
            ? "New Subheading"
            : type === "bodyText"
              ? "New Body Text"
              : "New Small Text",
      position: { x: 50, y: 50 },
      style: {
        fontSize:
          type === "heading"
            ? "2.25rem"
            : type === "subheading"
              ? "1.5rem"
              : type === "bodyText"
                ? "1.125rem"
                : "0.875rem",
        fontWeight:
          type === "heading" || type === "subheading" ? "bold" : "normal",
        color: "#000000",
      },
      isResizable: false,
    };

    setPosterElements([...posterElements, newElement]);
    setSelectedElement(newElement.id);
  };

  const addImageElement = (imageUrl: string) => {
    const newElement: PosterElement = {
      id: `image-${Date.now()}`,
      type: "image",
      content: imageUrl,
      position: { x: 50, y: 50 },
      size: { width: 200, height: 150 },
      isResizable: true,
    };

    setPosterElements([...posterElements, newElement]);
    setSelectedElement(newElement.id);
  };

  const addVideoElement = () => {
    const videoUrl = prompt(
      "Enter YouTube or video URL:",
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
    );
    if (!videoUrl) return;

    const newElement: PosterElement = {
      id: `video-${Date.now()}`,
      type: "video",
      content: videoUrl,
      position: { x: 50, y: 50 },
      size: { width: 320, height: 180 },
      isResizable: true,
    };

    setPosterElements([...posterElements, newElement]);
    setSelectedElement(newElement.id);
  };

  const addAudioElement = () => {
    const audioUrl = prompt(
      "Enter audio URL:",
      "https://example.com/audio.mp3",
    );
    if (!audioUrl) return;

    const newElement: PosterElement = {
      id: `audio-${Date.now()}`,
      type: "audio",
      content: audioUrl,
      position: { x: 50, y: 50 },
      size: { width: 300, height: 50 },
      isResizable: false,
    };

    setPosterElements([...posterElements, newElement]);
    setSelectedElement(newElement.id);
  };

  const addStickerElement = (stickerUrl: string) => {
    const newElement: PosterElement = {
      id: `sticker-${Date.now()}`,
      type: "sticker",
      content: stickerUrl,
      position: { x: 50, y: 50 },
      size: { width: 80, height: 80 },
      isResizable: true,
    };

    setPosterElements([...posterElements, newElement]);
    setSelectedElement(newElement.id);
    setShowStickers(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const newElement: PosterElement = {
          id: `uploadedImage-${Date.now()}`,
          type: "uploadedImage",
          content: event.target.result as string,
          position: { x: 50, y: 50 },
          size: { width: 200, height: 150 },
          isResizable: true,
        };

        setPosterElements([...posterElements, newElement]);
        setSelectedElement(newElement.id);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTemplateSelect = (template: Template) => {
    setActiveTemplate(template);

    // Update the background image or color based on template
    const updatedElements = posterElements.map((el) => {
      if (el.type === "image" && el.id === "image-1") {
        return { ...el, content: template.image };
      }
      return el;
    });

    setPosterElements(updatedElements);
  };

  const startEditing = (element: PosterElement) => {
    if (
      element.type !== "image" &&
      element.type !== "video" &&
      element.type !== "audio" &&
      element.type !== "sticker" &&
      element.type !== "uploadedImage"
    ) {
      setEditingElement(element.id);
      setEditText(element.content);
    }
  };

  const saveEditing = () => {
    if (editingElement) {
      setPosterElements((elements) =>
        elements.map((el) =>
          el.id === editingElement ? { ...el, content: editText } : el,
        ),
      );
      setEditingElement(null);
      setEditText("");
    }
  };

  const handleElementSelect = (id: string) => {
    setSelectedElement(id === selectedElement ? null : id);
  };

  const handleElementDelete = useCallback(
    (id: string) => {
      setPosterElements((elements) => elements.filter((el) => el.id !== id));
      if (selectedElement === id) {
        setSelectedElement(null);
      }
      if (editingElement === id) {
        setEditingElement(null);
        setEditText("");
      }
    },
    [selectedElement, editingElement],
  );

  const renderElement = (element: PosterElement) => {
    if (element.type === "image" || element.type === "uploadedImage") {
      return (
        <img
          src={element.content}
          alt="Poster element"
          className="max-w-full rounded-lg shadow-md"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      );
    }

    if (element.type === "video") {
      return (
        <iframe
          src={element.content}
          className="rounded-lg shadow-md"
          style={{ width: "100%", height: "100%" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (element.type === "audio") {
      return (
        <audio
          src={element.content}
          controls
          className="w-full rounded-lg shadow-md"
        />
      );
    }

    if (element.type === "sticker") {
      return (
        <img
          src={element.content}
          alt="Sticker"
          className="max-w-full"
          style={{ width: "100%", height: "100%" }}
        />
      );
    }

    if (editingElement === element.id) {
      return (
        <div className="relative">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="p-2 border rounded w-full"
            autoFocus
            onBlur={saveEditing}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && saveEditing()}
            style={element.style}
          />
          <Button
            size="sm"
            className="absolute top-0 right-0 mt-1 mr-1"
            onClick={saveEditing}
          >
            Save
          </Button>
        </div>
      );
    }

    return (
      <div
        className="p-2 cursor-pointer"
        onClick={() => startEditing(element)}
        style={element.style}
      >
        {element.content}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Poster Canvas */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Poster Canvas</h2>
          <DownloadButton
            content={posterCanvasRef.current}
            filename={`poster-${activeTemplate.name}`}
            type="image"
            className="bg-purple-500 hover:bg-purple-600 text-white"
          />
        </div>

        <DropZone className="border-2 border-dashed border-gray-300 rounded-lg h-[600px] bg-white relative overflow-hidden">
          <div
            ref={posterCanvasRef}
            className="w-full h-full flex items-center justify-center text-center"
            style={{
              backgroundColor:
                activeTemplate.color === "purple"
                  ? "#faf5ff"
                  : activeTemplate.color === "red"
                    ? "#fff5f5"
                    : activeTemplate.color === "blue"
                      ? "#f0f9ff"
                      : activeTemplate.color === "green"
                        ? "#f0fdf4"
                        : "white",
            }}
          >
            {posterElements.map((element) => (
              <DraggableItem
                key={element.id}
                id={element.id}
                initialPosition={element.position}
                onPositionChange={handleElementPositionChange}
                className="text-center"
                isSelected={selectedElement === element.id}
                onSelect={handleElementSelect}
                onDelete={handleElementDelete}
                isResizable={element.isResizable}
                onResize={handleElementResize}
                initialSize={element.size}
              >
                {renderElement(element)}
              </DraggableItem>
            ))}
          </div>
        </DropZone>
      </div>

      {/* Poster Tools */}
      <div className="space-y-6">
        {/* Templates */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Templates</h2>
          <div className="grid grid-cols-2 gap-2">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`border rounded-lg overflow-hidden cursor-pointer hover:shadow-md ${activeTemplate.id === template.id ? "ring-2 ring-purple-500" : ""}`}
                onClick={() => handleTemplateSelect(template)}
              >
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-24 object-cover"
                />
                <div className="p-2">
                  <div className="text-xs font-medium">{template.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Images */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Stock Images</h2>
          <div className="grid grid-cols-3 gap-2">
            {stockImages.map((image, idx) => (
              <div
                key={idx}
                className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md"
                onClick={() => addImageElement(image)}
              >
                <img
                  src={image}
                  alt={`Stock image ${idx + 1}`}
                  className="w-full h-16 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Media Elements */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Media Elements</h2>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              <span>Upload Image</span>
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={addVideoElement}
            >
              <Video className="mr-2 h-4 w-4" />
              <span>Add Video</span>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={addAudioElement}
            >
              <Music className="mr-2 h-4 w-4" />
              <span>Add Audio</span>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setShowStickers(!showStickers)}
            >
              <Sticker className="mr-2 h-4 w-4" />
              <span>Add Sticker</span>
            </Button>

            {showStickers && (
              <div className="grid grid-cols-3 gap-2 mt-2 p-2 border rounded-md">
                {STICKERS.map((sticker, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-1 cursor-pointer hover:bg-gray-100"
                    onClick={() => addStickerElement(sticker)}
                  >
                    <img
                      src={sticker}
                      alt={`Sticker ${idx + 1}`}
                      className="w-full h-12"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Text Elements */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Text Elements</h2>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addTextElement("heading")}
            >
              <Type className="mr-2 h-4 w-4" />
              <span className="text-lg font-bold">Add Heading</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addTextElement("subheading")}
            >
              <Type className="mr-2 h-4 w-4" />
              <span className="text-md">Add Subheading</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addTextElement("bodyText")}
            >
              <Type className="mr-2 h-4 w-4" />
              <span className="text-sm">Add Body Text</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addTextElement("smallText")}
            >
              <Type className="mr-2 h-4 w-4" />
              <span className="text-xs">Add Small Text</span>
            </Button>
          </div>
        </div>

        <Button
          className="w-full bg-purple-500 hover:bg-purple-600"
          onClick={() => alert("Poster saved successfully!")}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Poster
        </Button>
      </div>
    </div>
  );
}
