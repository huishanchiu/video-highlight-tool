import formatTime from "@/utils/formatTime";

type Props = {
  seekToTime: (time: number) => void;
  stepSeconds: number;
  handlePlayPause: () => void;
  currentTime: number;
  isPlaying: boolean;
  duration: number;
};

const VideoControls = (props: Props) => {
  const {
    seekToTime,
    stepSeconds,
    handlePlayPause,
    currentTime,
    isPlaying,
    duration,
  } = props;

  return (
    <div className="flex items-center text-white">
      <button
        disabled={currentTime <= 0}
        onClick={() => seekToTime(currentTime - stepSeconds)}
        className="disabled:cursor-not-allowed disabled:opacity-50 p-2 hover:bg-gray-700 rounded cursor-pointer text-2xl"
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
        disabled={currentTime >= duration}
        onClick={() => seekToTime(currentTime + stepSeconds)}
        className="disabled:cursor-not-allowed disabled:opacity-50 p-2 hover:bg-gray-700 rounded cursor-pointer text-2xl"
      >
        ⏭
      </button>
      <span className="text-sm">
        {formatTime(currentTime)}/{formatTime(duration)}
      </span>
    </div>
  );
};

export default VideoControls;
