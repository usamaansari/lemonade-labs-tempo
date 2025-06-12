"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DraggableItem,
  DropZone,
  DraggableSource,
} from "@/components/drag-drop-container";
import {
  Globe,
  Type,
  Image as ImageIcon,
  Layout,
  Save,
  Video,
  Music,
  Sticker,
  Upload,
  Trash2,
} from "lucide-react";

interface Template {
  id: number;
  name: string;
  description: string;
  image: string;
  color: string;
}

interface WebsiteBuilderClientProps {
  templates: Template[];
}

interface WebsiteElement {
  id: string;
  type:
    | "heading"
    | "paragraph"
    | "image"
    | "button"
    | "video"
    | "audio"
    | "sticker"
    | "uploadedImage";
  content: string;
  position: { x: number; y: number };
  style?: Record<string, string | number>;
  size?: { width: number; height: number };
}

interface WebsitePage {
  id: string;
  name: string;
  elements: WebsiteElement[];
}

export default function WebsiteBuilderClient({
  templates,
}: WebsiteBuilderClientProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [pages, setPages] = useState<WebsitePage[]>([
    {
      id: "home",
      name: "Home",
      elements: [],
    },
    {
      id: "about",
      name: "About",
      elements: [],
    },
    {
      id: "contact",
      name: "Contact",
      elements: [],
    },
  ]);
  const [currentPageId, setCurrentPageId] = useState("home");
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [websiteName, setWebsiteName] = useState("My Business Website");
  const [isPublished, setIsPublished] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null,
  );
  const [videoUrl, setVideoUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPage =
    pages.find((page) => page.id === currentPageId) || pages[0];

  const stickers = ["🚀", "⭐", "🎉", "🎁", "💰", "🏆", "🔥", "👍", "❤️", "🌟"];

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setIsEditing(true);

    // Initialize the home page with some elements based on the template
    const homePageElements: WebsiteElement[] = [
      {
        id: `heading-${Date.now()}`,
        type: "heading",
        content: template.name,
        position: { x: 0, y: 50 },
        style: {
          fontSize: "2.5rem",
          fontWeight: "bold",
          color:
            template.color === "blue"
              ? "#1d4ed8"
              : template.color === "green"
                ? "#047857"
                : template.color === "yellow"
                  ? "#d97706"
                  : template.color === "purple"
                    ? "#7e22ce"
                    : "#000000",
        },
      },
      {
        id: `paragraph-${Date.now() + 1}`,
        type: "paragraph",
        content: template.description,
        position: { x: 0, y: 120 },
        style: { fontSize: "1.125rem", maxWidth: 600 },
      },
      {
        id: `image-${Date.now() + 2}`,
        type: "image",
        content: template.image,
        position: { x: 0, y: 200 },
        style: { maxWidth: 500, borderRadius: "0.5rem" },
        size: { width: 500, height: 300 },
      },
      {
        id: `button-${Date.now() + 3}`,
        type: "button",
        content: "Learn More",
        position: { x: 0, y: 520 },
        style: {
          padding: "0.75rem 1.5rem",
          backgroundColor:
            template.color === "blue"
              ? "#1d4ed8"
              : template.color === "green"
                ? "#047857"
                : template.color === "yellow"
                  ? "#d97706"
                  : template.color === "purple"
                    ? "#7e22ce"
                    : "#000000",
          color: "white",
          borderRadius: "0.375rem",
          fontWeight: "bold",
        },
      },
    ];

    setPages((pages) =>
      pages.map((page) =>
        page.id === "home" ? { ...page, elements: homePageElements } : page,
      ),
    );
  };

  const handleElementPositionChange = (
    id: string,
    position: { x: number; y: number },
  ) => {
    setPages((pages) =>
      pages.map((page) =>
        page.id === currentPageId
          ? {
              ...page,
              elements: page.elements.map((el) =>
                el.id === id ? { ...el, position } : el,
              ),
            }
          : page,
      ),
    );
  };

  const handleElementResize = (
    id: string,
    size: { width: number; height: number },
  ) => {
    setPages((pages) =>
      pages.map((page) =>
        page.id === currentPageId
          ? {
              ...page,
              elements: page.elements.map((el) =>
                el.id === id ? { ...el, size } : el,
              ),
            }
          : page,
      ),
    );
  };

  const handleElementSelect = (id: string) => {
    setSelectedElementId(id);
  };

  const handleElementDelete = (id: string) => {
    setPages((pages) =>
      pages.map((page) =>
        page.id === currentPageId
          ? {
              ...page,
              elements: page.elements.filter((el) => el.id !== id),
            }
          : page,
      ),
    );
    setSelectedElementId(null);
  };

  const addElement = (
    type:
      | "heading"
      | "paragraph"
      | "image"
      | "button"
      | "video"
      | "audio"
      | "sticker"
      | "uploadedImage",
    content?: string,
  ) => {
    const newElement: WebsiteElement = {
      id: `${type}-${Date.now()}`,
      type,
      content:
        content ||
        (type === "heading"
          ? "New Heading"
          : type === "paragraph"
            ? "New paragraph text. Click to edit."
            : type === "image"
              ? "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80"
              : type === "video"
                ? "https://www.youtube.com/embed/dQw4w9WgXcQ"
                : type === "audio"
                  ? "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                  : type === "sticker"
                    ? "🚀"
                    : type === "uploadedImage"
                      ? content ||
                        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80"
                      : "Button"),
      position: { x: 50, y: 50 },
      style:
        type === "heading"
          ? { fontSize: "2rem", fontWeight: "bold" }
          : type === "paragraph"
            ? { fontSize: "1rem", maxWidth: 600 }
            : type === "image" || type === "uploadedImage"
              ? { maxWidth: 300, borderRadius: "0.5rem" }
              : type === "video"
                ? { width: 560, height: 315, border: 0 }
                : type === "audio"
                  ? { width: 300, height: 50 }
                  : type === "sticker"
                    ? { fontSize: "4rem" }
                    : {
                        padding: "0.75rem 1.5rem",
                        backgroundColor:
                          selectedTemplate?.color === "blue"
                            ? "#1d4ed8"
                            : selectedTemplate?.color === "green"
                              ? "#047857"
                              : selectedTemplate?.color === "yellow"
                                ? "#d97706"
                                : selectedTemplate?.color === "purple"
                                  ? "#7e22ce"
                                  : "#3b82f6",
                        color: "white",
                        borderRadius: "0.375rem",
                        fontWeight: "bold",
                      },
      size:
        type === "video"
          ? { width: 560, height: 315 }
          : type === "image" || type === "uploadedImage"
            ? { width: 300, height: 200 }
            : undefined,
    };

    setPages((pages) =>
      pages.map((page) =>
        page.id === currentPageId
          ? {
              ...page,
              elements: [...page.elements, newElement],
            }
          : page,
      ),
    );

    // Select the newly added element
    setSelectedElementId(newElement.id);
  };

  const handleAddSticker = (emoji: string) => {
    addElement("sticker", emoji);
  };

  const handleAddVideo = () => {
    if (videoUrl) {
      // Convert YouTube URL to embed URL if needed
      let embedUrl = videoUrl;
      if (videoUrl.includes("youtube.com/watch?v=")) {
        const videoId = videoUrl.split("v=")[1].split("&")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (videoUrl.includes("youtu.be/")) {
        const videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }

      addElement("video", embedUrl);
      setVideoUrl("");
      setShowVideoModal(false);
    }
  };

  const handleAddAudio = () => {
    if (audioUrl) {
      addElement("audio", audioUrl);
      setAudioUrl("");
      setShowAudioModal(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          addElement("uploadedImage", event.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startEditing = (element: WebsiteElement) => {
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
      setPages((pages) =>
        pages.map((page) =>
          page.id === currentPageId
            ? {
                ...page,
                elements: page.elements.map((el) =>
                  el.id === editingElement ? { ...el, content: editText } : el,
                ),
              }
            : page,
        ),
      );
      setEditingElement(null);
      setEditText("");
    }
  };

  const renderElement = (element: WebsiteElement) => {
    if (element.type === "image" || element.type === "uploadedImage") {
      return (
        <img
          src={element.content}
          alt="Website element"
          className="max-w-full rounded-lg shadow-md"
          style={element.style}
        />
      );
    }

    if (element.type === "video") {
      return (
        <iframe
          src={element.content}
          title="Video content"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={element.style}
        />
      );
    }

    if (element.type === "audio") {
      return (
        <audio controls style={element.style as React.CSSProperties}>
          <source src={element.content} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
    }

    if (element.type === "sticker") {
      return (
        <div style={element.style as React.CSSProperties}>
          {element.content}
        </div>
      );
    }

    if (element.type === "button") {
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
        <button
          className="cursor-pointer"
          onClick={() => startEditing(element)}
          style={element.style as React.CSSProperties}
        >
          {element.content}
        </button>
      );
    }

    if (editingElement === element.id) {
      return (
        <div className="relative">
          {element.type === "heading" ? (
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
          ) : (
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="p-2 border rounded w-full"
              autoFocus
              onBlur={saveEditing}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && saveEditing()
              }
              style={element.style as React.CSSProperties}
              rows={4}
            />
          )}
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
        {element.type === "heading" ? (
          <h2>{element.content}</h2>
        ) : (
          <p>{element.content}</p>
        )}
      </div>
    );
  };

  const publishWebsite = () => {
    setIsPublished(true);
    alert(
      `Your website "${websiteName}" has been published! It's now live at yourbusiness.kidpreneur.com`,
    );
  };

  if (!isEditing) {
    return (
      <div>
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border-2 border-blue-200 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <p className="text-sm text-gray-600">
                    {template.description}
                  </p>
                  <Button
                    className="w-full mt-4 bg-blue-500 hover:bg-blue-600"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    Select Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              className="text-xl font-semibold p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <div className="flex space-x-2">
              {pages.map((page) => (
                <Button
                  key={page.id}
                  variant={currentPageId === page.id ? "default" : "outline"}
                  onClick={() => setCurrentPageId(page.id)}
                  className={currentPageId === page.id ? "bg-blue-500" : ""}
                >
                  {page.name}
                </Button>
              ))}
            </div>
          </div>
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={publishWebsite}
            disabled={isPublished}
          >
            <Globe className="mr-2 h-4 w-4" />
            {isPublished ? "Published" : "Publish Website"}
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Website Editor */}
          <div className="flex-1">
            <div className="border-2 border-dashed border-gray-300 rounded-lg min-h-[600px] bg-white p-4">
              <DropZone className="relative min-h-[600px]" ref={editorRef}>
                {currentPage.elements.map((element) => (
                  <DraggableItem
                    key={element.id}
                    id={element.id}
                    initialPosition={element.position}
                    onPositionChange={handleElementPositionChange}
                    isSelected={selectedElementId === element.id}
                    onSelect={handleElementSelect}
                    onDelete={handleElementDelete}
                    isResizable={
                      element.type === "image" ||
                      element.type === "video" ||
                      element.type === "uploadedImage"
                    }
                    onResize={handleElementResize}
                    initialSize={element.size}
                  >
                    {renderElement(element)}
                  </DraggableItem>
                ))}
              </DropZone>
            </div>
          </div>

          {/* Website Tools */}
          <div className="w-64 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow border">
              <h3 className="font-medium mb-3">Add Elements</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addElement("heading")}
                >
                  <Type className="mr-2 h-4 w-4" />
                  Heading
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addElement("paragraph")}
                >
                  <Type className="mr-2 h-4 w-4" />
                  Paragraph
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addElement("image")}
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Image
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addElement("button")}
                >
                  <Layout className="mr-2 h-4 w-4" />
                  Button
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowVideoModal(true)}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Video
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowAudioModal(true)}
                >
                  <Music className="mr-2 h-4 w-4" />
                  Audio
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
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
            </div>

            <div className="bg-white p-4 rounded-lg shadow border">
              <h3 className="font-medium mb-3">Stickers</h3>
              <div className="grid grid-cols-5 gap-2">
                {stickers.map((sticker, index) => (
                  <button
                    key={index}
                    className="text-2xl hover:bg-blue-50 rounded p-1"
                    onClick={() => handleAddSticker(sticker)}
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-blue-500 hover:bg-blue-600"
              onClick={() => alert("Website saved successfully!")}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>

            {selectedElementId && (
              <Button
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                onClick={() => handleElementDelete(selectedElementId)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add Video</h3>
            <p className="text-sm text-gray-600 mb-2">
              Enter YouTube or video URL:
            </p>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowVideoModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddVideo}>Add Video</Button>
            </div>
          </div>
        </div>
      )}

      {/* Audio Modal */}
      {showAudioModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add Audio</h3>
            <p className="text-sm text-gray-600 mb-2">Enter audio URL:</p>
            <input
              type="text"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              placeholder="https://example.com/audio.mp3"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowAudioModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddAudio}>Add Audio</Button>
            </div>
          </div>
        </div>
      )}

      {isPublished && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">Website Published!</h3>
          <p className="text-green-700">
            Your website is now live at:{" "}
            <span className="font-medium">yourbusiness.kidpreneur.com</span>
          </p>
          <p className="text-sm text-green-600 mt-2">
            Share this link with friends and family to show off your business
            website!
          </p>
        </div>
      )}
    </div>
  );
}
