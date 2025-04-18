"use client";

import { useRef, useState, useEffect } from "react";
import { TranscriptData } from "@/types/transcript";
import formatTime from "@/utils/formatTime";

interface Props {
  videoFile: File;
  transcriptData: TranscriptData | null;
  selectedSentences: number[];
  currentTime: number;
  setCurrentTime: (time: number) => void;
  setDuration: (time: number) => void;
  duration: number;
}

export default function VideoPreview(props: Props) {
  const {
    videoFile,
    transcriptData,
    selectedSentences,
    setCurrentTime,
    currentTime,
    setDuration,
    duration,
  } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(videoFile);
    setVideoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const seekToTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.currentTime = currentTime;
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getCurrentSentence = () => {
    if (!transcriptData) return null;

    for (const section of transcriptData.sections) {
      for (const sentence of section.sentences) {
        if (
          currentTime >= sentence.startTime &&
          currentTime <= sentence.endTime &&
          selectedSentences.includes(sentence.id)
        ) {
          return sentence;
        }
      }
    }
    return null;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      const newTime = percent * duration;
      seekToTime(newTime);
    }
  };

  const handleProgressDragStart = () => {
    setIsDragging(true);
    if (isPlaying) {
      videoRef.current?.pause();
    }
  };

  const handleProgressDragEnd = () => {
    setIsDragging(false);
    if (isPlaying) {
      videoRef.current?.play();
    }
  };

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percent = x / rect.width;
      const newTime = percent * duration;
      seekToTime(newTime);
    }
  };
  const handleProgressTouchDrag = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const touchX = e.touches[0].clientX;
      const x = Math.max(0, Math.min(touchX - rect.left, rect.width));
      const percent = x / rect.width;
      const newTime = percent * duration;
      seekToTime(newTime);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-white">Preview</h2>
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        {!videoUrl ? (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            Video Preview
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
            {transcriptData && getCurrentSentence() && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                <p className="text-white text-center text-lg">
                  {getCurrentSentence()?.text}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="mt-4 space-y-4">
        <div className="flex items-center text-white">
          <button
            onClick={() => seekToTime(currentTime - 5)}
            className="p-2 hover:bg-gray-700 rounded cursor-pointer text-2xl"
          >
            ⏮
          </button>
          <button
            onClick={handlePlayPause}
            className="p-2 hover:bg-gray-700 rounded cursor-pointer text-2xl w-10"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            onClick={() => seekToTime(currentTime + 5)}
            className="p-2 hover:bg-gray-700 rounded cursor-pointer text-2xl"
          >
            ⏭
          </button>
          <span className="text-sm">
            {formatTime(currentTime)}/{formatTime(duration)}
          </span>
        </div>
        <div
          ref={progressRef}
          className="h-2 bg-gray-700 rounded relative cursor-pointer"
          onClick={handleProgressClick}
          onMouseDown={handleProgressDragStart}
          onMouseMove={handleProgressDrag}
          onMouseUp={handleProgressDragEnd}
          onMouseLeave={handleProgressDragEnd}
          onTouchStart={handleProgressDragStart}
          onTouchMove={handleProgressTouchDrag}
          onTouchEnd={handleProgressDragEnd}
        >
          <div
            className="absolute h-full bg-amber-400 rounded "
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-500 rounded-full shadow-lg transform translate-x-1/2 z-10" />
          </div>
          {selectedSentences.map((id) => {
            const sentence = transcriptData?.sections
              .flatMap((section) => section.sentences)
              .find(
                (sentence) =>
                  sentence.id === id && sentence.startTime <= duration
              );
            if (sentence) {
              const endTime =
                sentence.endTime <= duration ? sentence.endTime : duration;
              return (
                <div
                  key={id}
                  className="absolute h-full bg-blue-500 opacity-60"
                  style={{
                    left: `${(sentence.startTime / duration) * 100}%`,
                    width: `${
                      ((endTime - sentence.startTime) / duration) * 100
                    }%`,
                  }}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
