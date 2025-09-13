"use client";

import { useEffect } from "react";
import VideoUploader from "./VideoUpload";
import TranscriptEditor from "./TranscriptEditor";
import VideoPreview from "./Preview";
import Skeleton from "../Common/Loading";
import { useVideoEditor } from "@/context/videoEditor";

export default function VideoEditor() {
  const {
    videoFile,
    setVideoFile,
    transcriptData,
    setTranscriptData,
    setSelectedSentencesID,
    setCurrentTime,
    duration,
  } = useVideoEditor();
  const SECTION_NUM = 3;

  useEffect(() => {
    const fetchTranscript = async () => {
      if (duration > 0) {
        try {
          const response = await fetch(`/api/transcript?duration=${duration}`);
          const data = await response.json();
          setTranscriptData(data);
          setSelectedSentencesID(data.suggestedHighlights);
        } catch (error) {
          console.error("Failed to fetch transcript:", error);
        }
      }
    };

    fetchTranscript();
  }, [duration]);

  const handleVideoUpload = async (file: File) => {
    setVideoFile(file);
    setCurrentTime(0);
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
          <TranscriptEditor />
        ) : (
          <Skeleton count={SECTION_NUM} />
        )}
      </div>
      <div className="w-1/2">
        <VideoPreview videoFile={videoFile} />
      </div>
    </div>
  );
}
