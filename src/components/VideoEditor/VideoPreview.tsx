"use client";

import { useRef, useState, useEffect } from "react";
import { TranscriptData } from "@/types/transcript";
import VideoControls from "./VideoControls";

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
      // Math.max:避免負數
      const clamped = Math.max(0, Math.min(time, duration || 0));
      videoRef.current.currentTime = clamped;
      setCurrentTime(clamped);
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
      setIsPlaying((prev) => !prev);
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
      const newTime = percent * (duration || 0);
      seekToTime(newTime);
    }
  };
  const handleProgressTouchDrag = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const touchX = e.touches[0].clientX;
      const x = Math.max(0, Math.min(touchX - rect.left, rect.width));
      const percent = x / rect.width;
      const newTime = percent * (duration || 0);
      seekToTime(newTime);
    }
  };

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isDragging) return;
    if (Math.abs(el.currentTime - currentTime) > 0.1) {
      el.currentTime = Math.max(0, Math.min(currentTime, duration || 0));
    }
  }, [currentTime, duration, isDragging]);

  return (
    <>
      {videoUrl && (
        <div className="bg-gray-800  p-4 h-full">
          <h2 className="text-xl font-semibold mb-4 text-white">Preview</h2>
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {/* video & transcript */}
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
            {transcriptData && getCurrentSentence() && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                <p className="text-white text-center text-lg">
                  {getCurrentSentence()?.text}
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 space-y-4">
            {/* video controls */}
            <VideoControls
              seekToTime={seekToTime}
              stepSeconds={5}
              handlePlayPause={handlePlayPause}
              duration={duration}
              isPlaying={isPlaying}
              currentTime={currentTime}
            />
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
                style={{
                  width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                }}
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
                        left: `${
                          duration ? (sentence.startTime / duration) * 100 : 0
                        }%`,
                        width: `${
                          duration
                            ? ((endTime - sentence.startTime) / duration) * 100
                            : 0
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
      )}
    </>
  );
}
