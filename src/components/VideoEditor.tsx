"use client";

import { useState } from "react";
import VideoUploader from "./VideoUploader";
import TranscriptEditor from "./TranscriptEditor";
import VideoPreview from "./VideoPreview";
import { TranscriptData } from "@/types/transcript";
import { mockTranscriptData } from "@/mock/transcriptData";

export default function VideoEditor() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(
    null
  );
  const [selectedSentences, setSelectedSentences] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleVideoUpload = (file: File) => {
    setVideoFile(file);
    setCurrentTime(0);

    setTimeout(() => {
      setTranscriptData(mockTranscriptData);
      setSelectedSentences(mockTranscriptData.suggestedHighlights);
    }, 1000);
  };

  const LoadingSkeleton = () => (
    <div className="bg-gray-800 rounded-lg p-8">
      <div className="space-y-6">
        <div className="h-8 w-1/3 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-skeleton" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="h-6 w-1/4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-skeleton" />
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="h-4 w-16 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-skeleton" />
                <div className="h-4 flex-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-skeleton" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {videoFile ? (
        <>
          <div>
            {transcriptData ? (
              <TranscriptEditor
                transcriptData={transcriptData}
                selectedSentences={selectedSentences}
                onSelectionChange={setSelectedSentences}
                onTimeClick={setCurrentTime}
                duration={duration}
              />
            ) : (
              <LoadingSkeleton />
            )}
          </div>
          <div>
            <VideoPreview
              videoFile={videoFile}
              transcriptData={transcriptData}
              selectedSentences={selectedSentences}
              setCurrentTime={setCurrentTime}
              currentTime={currentTime}
              setDuration={setDuration}
              duration={duration}
            />
          </div>
        </>
      ) : (
        <div className="lg:col-span-2">
          <VideoUploader onUpload={handleVideoUpload} />
        </div>
      )}
    </div>
  );
}
