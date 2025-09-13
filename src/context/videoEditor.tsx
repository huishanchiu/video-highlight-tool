"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { TranscriptData } from "@/types/transcript";

type VideoEditorContextValue = {
  videoFile: File | null;
  transcriptData: TranscriptData | null;
  selectedSentencesID: number[];
  currentTime: number;
  duration: number;
  setVideoFile: (f: File | null) => void;
  setTranscriptData: (d: TranscriptData | null) => void;
  setSelectedSentencesID: (ids: number[]) => void;
  setCurrentTime: (t: number) => void;
  setDuration: (t: number) => void;
  toggleSentence: (id: number) => void;
};

const VideoEditorContext = createContext<VideoEditorContextValue | undefined>(
  undefined
);

export function VideoEditorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(
    null
  );
  const [selectedSentencesID, setSelectedSentencesID] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggleSentence = (id: number) => {
    setSelectedSentencesID((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const value = useMemo(
    () => ({
      videoFile,
      transcriptData,
      selectedSentencesID,
      currentTime,
      duration,
      setVideoFile,
      setTranscriptData,
      setSelectedSentencesID,
      setCurrentTime,
      setDuration,
      toggleSentence,
    }),
    [videoFile, transcriptData, selectedSentencesID, currentTime, duration]
  );

  return (
    <VideoEditorContext.Provider value={value}>
      {children}
    </VideoEditorContext.Provider>
  );
}

export function useVideoEditor() {
  const counterContextData = useContext(VideoEditorContext);
  if (!counterContextData)
    throw new Error("useVideoEditor must be used within VideoEditorProvider");
  return counterContextData;
}
