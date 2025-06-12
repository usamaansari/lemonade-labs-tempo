"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DraggableItem,
  DropZone,
  DraggableSource,
} from "@/components/drag-drop-container";
import DownloadButton from "@/components/download-button";
import { Save, Download, Trash2, Upload, Plus } from "lucide-react";

interface Shape {
  id: number;
  name: string;
  icon: string;
}

interface ColorPalette {
  id: number;
  name: string;
  colors: string[];
}

interface LogoMakerClientProps {
  shapes: Shape[];
  colorPalettes: ColorPalette[];
}

interface LogoElement {
  id: string;
  type: "shape" | "businessName" | "tagline" | "customShape" | "uploadedImage";
  content: string;
  position: { x: number; y: number };
  style?: Record<string, string | number>;
  size?: { width: number; height: number };
}

export default function LogoMakerClient({
  shapes,
  colorPalettes,
}: LogoMakerClientProps) {
  const [selectedShape, setSelectedShape] = useState<Shape>(shapes[3]); // Star shape
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(
    colorPalettes[0],
  );
  const [businessName, setBusinessName] = useState("YOUR BUSINESS");
  const [tagline, setTagline] = useState("Tagline goes here");
  const [logoElements, setLogoElements] = useState<LogoElement[]>([
    {
      id: "shape-1",
      type: "shape",
      content: "⭐",
      position: { x: 0, y: 0 },
      style: { fontSize: "6rem" },
    },
    {
      id: "businessName-1",
      type: "businessName",
      content: "YOUR BUSINESS",
      position: { x: 0, y: 120 },
      style: { fontSize: "1.5rem", fontWeight: "bold", color: "#047857" },
    },
    {
      id: "tagline-1",
      type: "tagline",
      content: "Tagline goes here",
      position: { x: 0, y: 160 },
      style: { fontSize: "0.875rem", color: "#6b7280" },
    },
  ]);

  const logoCanvasRef = useRef<HTMLDivElement>(null);
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customShapes, setCustomShapes] = useState<string[]>([
    "🎯",
    "🏆",
    "💼",
    "💰",
    "📈",
    "🛒",
    "🎁",
    "🔍",
  ]);

  const handleElementPositionChange = (
    id: string,
    position: { x: number; y: number },
  ) => {
    setLogoElements((elements) =>
      elements.map((el) => (el.id === id ? { ...el, position } : el)),
    );
  };

  const handleElementResize = (
    id: string,
    size: { width: number; height: number },
  ) => {
    setLogoElements((elements) =>
      elements.map((el) => (el.id === id ? { ...el, size } : el)),
    );
  };

  const handleElementSelect = (id: string) => {
    setSelectedElementId(id);
  };

  const handleElementDelete = (id: string) => {
    setLogoElements((elements) => elements.filter((el) => el.id !== id));
    setSelectedElementId(null);
  };

  const handleShapeSelect = (shape: Shape) => {
    setSelectedShape(shape);

    // Update the shape in the logo
    setLogoElements((elements) =>
      elements.map((el) => {
        if (el.type === "shape") {
          return { ...el, content: shape.icon };
        }
        return el;
      }),
    );
  };

  const handlePaletteSelect = (palette: ColorPalette) => {
    setSelectedPalette(palette);

    // Update colors in the logo
    setLogoElements((elements) =>
      elements.map((el) => {
        if (el.type === "businessName") {
          return { ...el, style: { ...el.style, color: palette.colors[0] } };
        }
        if (el.type === "tagline") {
          return { ...el, style: { ...el.style, color: palette.colors[2] } };
        }
        return el;
      }),
    );
  };

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setBusinessName(newName);

    // Update business name in the logo
    setLogoElements((elements) =>
      elements.map((el) => {
        if (el.type === "businessName") {
          return { ...el, content: newName };
        }
        return el;
      }),
    );
  };

  const handleTaglineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTagline = e.target.value;
    setTagline(newTagline);

    // Update tagline in the logo
    setLogoElements((elements) =>
      elements.map((el) => {
        if (el.type === "tagline") {
          return { ...el, content: newTagline };
        }
        return el;
      }),
    );
  };

  const addCustomShape = (shape: string) => {
    const newElement: LogoElement = {
      id: `customShape-${Date.now()}`,
      type: "customShape",
      content: shape,
      position: { x: 50, y: 50 },
      style: { fontSize: "4rem" },
    };

    setLogoElements([...logoElements, newElement]);
    setSelectedElementId(newElement.id);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newElement: LogoElement = {
            id: `uploadedImage-${Date.now()}`,
            type: "uploadedImage",
            content: event.target.result.toString(),
            position: { x: 50, y: 50 },
            style: { maxWidth: 150, borderRadius: "0.5rem" },
            size: { width: 150, height: 150 },
          };

          setLogoElements([...logoElements, newElement]);
          setSelectedElementId(newElement.id);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startEditing = (element: LogoElement) => {
    if (
      element.type !== "shape" &&
      element.type !== "customShape" &&
      element.type !== "uploadedImage"
    ) {
      setEditingElement(element.id);
      setEditText(element.content);
    }
  };

  const saveEditing = () => {
    if (editingElement) {
      setLogoElements((elements) =>
        elements.map((el) => {
          if (el.id === editingElement) {
            if (el.type === "businessName") {
              setBusinessName(editText);
            } else if (el.type === "tagline") {
              setTagline(editText);
            }
            return { ...el, content: editText };
          }
          return el;
        }),
      );
      setEditingElement(null);
      setEditText("");
    }
  };

  const renderElement = (element: LogoElement) => {
    if (element.type === "shape" || element.type === "customShape") {
      return (
        <div style={element.style as React.CSSProperties}>
          {element.content}
        </div>
      );
    }

    if (element.type === "uploadedImage") {
      return (
        <img
          src={element.content}
          alt="Logo element"
          className="max-w-full rounded-lg"
          style={element.style as React.CSSProperties}
        />
      );
    }

    if (editingElement === element.id) {
      return (
        <div className="relative">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="p-2 border rounded w-full"
            autoFocus
            onBlur={saveEditing}
            onKeyDown={(e) => e.key === "Enter" && saveEditing()}
            style={element.style as React.CSSProperties}
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
        className="cursor-pointer"
        onClick={() => startEditing(element)}
        style={element.style as React.CSSProperties}
      >
        {element.content}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Logo Preview */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Logo Preview</h2>
          <DownloadButton
            content={logoCanvasRef.current}
            filename={`logo-${businessName.toLowerCase().replace(/\s+/g, "-")}`}
            type="image"
            className="bg-green-500 hover:bg-green-600 text-white"
          />
        </div>

        <DropZone className="border-2 border-dashed border-gray-300 rounded-lg h-80 flex items-center justify-center">
          <div
            ref={logoCanvasRef}
            className="w-full h-full flex items-center justify-center relative"
          >
            <div className="text-center">
              {logoElements.map((element) => (
                <DraggableItem
                  key={element.id}
                  id={element.id}
                  initialPosition={element.position}
                  onPositionChange={handleElementPositionChange}
                  isSelected={selectedElementId === element.id}
                  onSelect={handleElementSelect}
                  onDelete={handleElementDelete}
                  isResizable={element.type === "uploadedImage"}
                  onResize={handleElementResize}
                  initialSize={element.size}
                >
                  {renderElement(element)}
                </DraggableItem>
              ))}
            </div>
          </div>
        </DropZone>
      </div>

      {/* Logo Tools */}
      <div className="space-y-6">
        {/* Shapes */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Choose a Shape</h2>
          <div className="grid grid-cols-3 gap-2">
            {shapes.map((shape) => (
              <div
                key={shape.id}
                className={`border rounded-lg p-3 text-center cursor-pointer hover:bg-green-50 hover:border-green-300 ${selectedShape.id === shape.id ? "bg-green-50 border-green-300" : ""}`}
                onClick={() => handleShapeSelect(shape)}
              >
                <div className="text-3xl mb-1">{shape.icon}</div>
                <div className="text-xs">{shape.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Shapes */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Business Icons</h2>
          <div className="grid grid-cols-4 gap-2">
            {customShapes.map((shape, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 text-center cursor-pointer hover:bg-green-50 hover:border-green-300"
                onClick={() => addCustomShape(shape)}
              >
                <div className="text-2xl mb-1">{shape}</div>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full mt-3"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </div>

        {/* Color Palettes */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Color Palette</h2>
          <div className="space-y-3">
            {colorPalettes.map((palette) => (
              <div
                key={palette.id}
                className={`flex items-center space-x-2 cursor-pointer hover:bg-green-50 p-2 rounded ${selectedPalette.id === palette.id ? "bg-green-50 border border-green-300" : ""}`}
                onClick={() => handlePaletteSelect(palette)}
              >
                <div className="flex flex-1 space-x-1">
                  {palette.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
                <div className="text-sm">{palette.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Text Options */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Text</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={handleBusinessNameChange}
                placeholder="Your Business Name"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Tagline (Optional)
              </label>
              <input
                type="text"
                value={tagline}
                onChange={handleTaglineChange}
                placeholder="Your tagline here"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            className="flex-1 bg-green-500 hover:bg-green-600"
            onClick={() => alert("Logo saved successfully!")}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Logo
          </Button>

          {selectedElementId && (
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => handleElementDelete(selectedElementId)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
