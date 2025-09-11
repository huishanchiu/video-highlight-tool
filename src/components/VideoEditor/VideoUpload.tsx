"use client";

import { useRef } from "react";

interface Props {
  onUpload: (file: File) => void;
}

export default function VideoUpload({ onUpload }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center bg-gray-800">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-colors cursor-pointer"
      >
        Upload Video
      </button>
    </div>
  );
}
