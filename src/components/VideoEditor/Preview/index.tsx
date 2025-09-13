"use client";

import { useRef, useState, useEffect } from "react";
import { TranscriptData } from "@/types/transcript";
import VideoControls from "./VideoControls";
import VideoProgress from "./VideoProgress";
import getCurrentSentence from "@/utils/getCurrentSentence";
import { useVideoEditor } from "@/context/videoEditor";

interface Props {
  videoFile: File;
}

export default function VideoPreview(props: Props) {
  const { videoFile } = props;
  const {
    transcriptData,
    duration,
    setDuration,
    selectedSentencesID,
    setCurrentTime,
    currentTime,
  } = useVideoEditor();

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

  // const getCurrentSentence = () => {
  //   if (!transcriptData) return null;

  //   for (const section of transcriptData.sections) {
  //     for (const sentence of section.sentences) {
  //       console.log("sentence", sentence, "currentTime", currentTime);
  //       if (
  //         currentTime >= sentence.startTime &&
  //         currentTime <= sentence.endTime &&
  //         selectedSentencesID.includes(sentence.id)
  //       ) {
  //         return sentence;
  //       }
  //     }
  //   }
  //   return null;
  // };

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isDragging) return;
    if (Math.abs(el.currentTime - currentTime) > 0.1) {
      el.currentTime = Math.max(0, Math.min(currentTime, duration || 0));
    }
  }, [currentTime, duration, isDragging]);

  /**
   progress bar handlers
  */
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
  /**
   progress bar handlers
  */
  return (
    <>
      {videoUrl && (
        <div className="bg-gray-800  p-4 h-full">
          <h2 className="text-xl font-semibold mb-4 text-white">Preview</h2>
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
            {transcriptData && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                <p className="text-white text-center text-lg">
                  {
                    getCurrentSentence(
                      transcriptData,
                      currentTime,
                      selectedSentencesID
                    )?.text
                  }
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 space-y-4">
            <VideoControls
              seekToTime={seekToTime}
              stepSeconds={5}
              handlePlayPause={handlePlayPause}
              duration={duration}
              isPlaying={isPlaying}
              currentTime={currentTime}
            />
            <VideoProgress
              progressRef={progressRef}
              handleProgressClick={handleProgressClick}
              handleProgressDragStart={handleProgressDragStart}
              handleProgressDrag={handleProgressDrag}
              handleProgressDragEnd={handleProgressDragEnd}
              handleProgressTouchDrag={handleProgressTouchDrag}
              currentTime={currentTime}
              duration={duration}
              selectedSentencesID={selectedSentencesID}
              transcriptData={transcriptData}
            />
          </div>
        </div>
      )}
    </>
  );
}
