import { useVideoEditor } from "@/context/videoEditor";
import { Sentence } from "@/types/transcript";
import formatTime from "@/utils/formatTime";

type Props = {
  sentences: Sentence[];
  activeId: number | null;
};

const SentencesBlock = (props: Props) => {
  const { sentences, activeId } = props;
  const { selectedSentencesID, setCurrentTime, duration, toggleSentence } =
    useVideoEditor();

  return (
    <div className="mt-2 rounded ">
      {sentences.map((sentence) => {
        const isActive = activeId === sentence.id;
        if (sentence.startTime > duration) return null;
        return (
          <div
            data-sent-id={sentence.id}
            key={sentence.id}
            className={`
              ${isActive ? " border-b-4 border-indigo-500 " : ""}
                flex text-stone-400 rounded m-1 p-2  cursor-pointer ${
                  selectedSentencesID.includes(sentence.id)
                    ? "bg-blue-600 text-white "
                    : "bg-white"
                }`}
            role="button"
            tabIndex={0}
            onClick={() => toggleSentence(sentence.id)}
          >
            <span
              className="text-xl font-bold text-blue-800  cursor-pointer "
              onClick={(e) => {
                e.stopPropagation();
                setCurrentTime(sentence.startTime);
              }}
            >
              {formatTime(sentence.startTime)}
            </span>
            <span
              className={` ml-4 text-lg  ${
                isActive ? "text-amber-500 font-semibold" : ""
              }`}
            >
              {sentence.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SentencesBlock;
