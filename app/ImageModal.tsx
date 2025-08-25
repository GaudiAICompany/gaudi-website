import { useState } from "react";
import { createPortal } from "react-dom";

type ImageModalProps = {
  src: string;
  alt: string;
};

export default function ImageModal({ src, alt }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <img
        src={src}
        alt={alt}
        className="w-64 cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={() => setIsOpen(true)}
      />

      {/* Modal Portal */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-white/30 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative bg-white rounded-xl shadow-xl p-6 max-w-[90vw] max-h-[90vh] overflow-auto"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>

              <img
                src={src}
                alt={alt}
                className="w-auto h-screen object-contain rounded-md"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}