"use client";

import { useState, useRef, ReactNode } from "react";
import { motion } from "framer-motion";

interface DraggableItemProps {
  id: string;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  onPositionChange?: (id: string, position: { x: number; y: number }) => void;
  className?: string;
  onDelete?: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  zIndex?: number;
  isResizable?: boolean;
  onResize?: (id: string, size: { width: number; height: number }) => void;
  initialSize?: { width: number; height: number };
}

export function DraggableItem({
  id,
  children,
  initialPosition = { x: 0, y: 0 },
  onPositionChange,
  className = "",
  onDelete,
  isSelected = false,
  onSelect,
  zIndex = 1,
  isResizable = false,
  onResize,
  initialSize = { width:100, height: 100 },
}: DraggableItemProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; point: { x: number; y: number } },
  ) => {
    const newPosition = {
      x: position.x + info.offset.x,
      y: position.y + info.offset.y,
    };
    setPosition(newPosition);
    if (onPositionChange) {
      onPositionChange(id, newPosition);
    }
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      const newHeight = startHeight + (moveEvent.clientY - startY);

      const updatedSize = {
        width: Math.max(50, newWidth),
        height: Math.max(50, newHeight),
      };

      setSize(updatedSize);

      if (onResize) {
        onResize(id, updatedSize);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      initial={{ x: position.x, y: position.y }}
      animate={{ x: position.x, y: position.y }}
      className={`absolute cursor-move ${isSelected ? "ring-2 ring-blue-500" : ""} ${className}`}
      style={{
        touchAction: "none",
        zIndex: isSelected ? 10 : zIndex,
        width: isResizable ? `${size.width}px` : "auto",
        height: isResizable ? `${size.height}px` : "auto",
      }}
      onClick={handleSelect}
    >
      {children}

      {isSelected && (
        <div className="absolute -top-3 -right-3 flex space-x-1">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            ×
          </button>

          {isResizable && (
            <div
              ref={resizeHandleRef}
              className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
              onMouseDown={handleResize}
            />
          )}
        </div>
      )}
    </motion.div>
  );
}

interface DropZoneProps {
  children: ReactNode;
  className?: string;
  onDrop?: (item: any) => void;
  onDragOver?: (e: React.DragEvent) => void;
  acceptDrop?: boolean;
}

export function DropZone({
  children,
  className = "",
  onDrop,
  onDragOver,
  acceptDrop = true,
}: DropZoneProps) {
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    if (acceptDrop) {
      e.preventDefault();
      if (onDragOver) {
        onDragOver(e);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (acceptDrop) {
      e.preventDefault();
      if (onDrop) {
        onDrop(e.dataTransfer.getData("text"));
      }
    }
  };

  return (
    <div
      ref={dropZoneRef}
      className={`relative ${className} ${acceptDrop ? "drop-zone" : ""}`}
      style={{ touchAction: "none" }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}

interface DraggableSourceProps {
  id: string;
  children: ReactNode;
  data: string;
  className?: string;
}

export function DraggableSource({
  id,
  children,
  data,
  className = "",
}: DraggableSourceProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text", data);
  };

  return (
    <div
      id={id}
      draggable
      onDragStart={handleDragStart}
      className={`cursor-grab ${className}`}
    >
      {children}
    </div>
  );
}
