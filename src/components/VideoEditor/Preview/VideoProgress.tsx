import { TranscriptData } from "@/types/transcript";

type Props = {
  transcriptData: TranscriptData | null;
  selectedSentencesID: number[];
  duration: number;
  currentTime: number;
  progressRef: any;
  handleProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleProgressDragStart: () => void;
  handleProgressDrag: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleProgressDragEnd: () => void;
  handleProgressTouchDrag: (e: React.TouchEvent<HTMLDivElement>) => void;
};

const VideoProgress = (props: Props) => {
  const {
    transcriptData,
    duration,
    currentTime,
    selectedSentencesID,
    progressRef,
    handleProgressClick,
    handleProgressDragStart,
    handleProgressDrag,
    handleProgressDragEnd,
    handleProgressTouchDrag,
  } = props;

  return (
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
      {selectedSentencesID.map((id) => {
        const sentence = transcriptData?.sections
          .flatMap((section) => section.sentences)
          .find(
            (sentence) => sentence.id === id && sentence.startTime <= duration
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
  );
};

export default VideoProgress;
