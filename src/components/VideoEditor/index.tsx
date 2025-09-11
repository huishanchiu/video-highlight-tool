"use client";

import { useState } from "react";
import VideoUploader from "./VideoUpload";
import TranscriptEditor from "./TranscriptEditor";
import VideoPreview from "./VideoPreview";
import { TranscriptData } from "@/types/transcript";
import Skeleton from "../Common/Skeleton";

export default function VideoEditor() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(
    null
  );
  const [selectedSentences, setSelectedSentences] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const SECTION_NUM = 3;

  const handleVideoUpload = async (file: File) => {
    setVideoFile(file);
    setCurrentTime(0);

    try {
      const response = await fetch("/api/transcript");
      const data = await response.json();
      setTranscriptData(data);
      setSelectedSentences(data.suggestedHighlights);
    } catch (error) {
      console.error("Failed to fetch transcript:", error);
    }
  };

  if (!videoFile) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <VideoUploader onUpload={handleVideoUpload} />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        {transcriptData ? (
          <TranscriptEditor
            transcriptData={transcriptData}
            selectedSentences={selectedSentences}
            duration={duration}
            onSelectionChange={setSelectedSentences}
            onTimeClick={setCurrentTime}
          />
        ) : (
          <Skeleton count={SECTION_NUM} />
        )}
      </div>
      <div className="w-1/2">
        <VideoPreview
          videoFile={videoFile}
          duration={duration}
          currentTime={currentTime}
          transcriptData={transcriptData}
          selectedSentences={selectedSentences}
          setCurrentTime={setCurrentTime}
          setDuration={setDuration}
        />
      </div>
    </div>
  );
}
