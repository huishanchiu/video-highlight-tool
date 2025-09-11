"use client";

import { TranscriptData } from "@/types/transcript";
import formatTime from "@/utils/formatTime";

interface Props {
  transcriptData: TranscriptData;
  selectedSentences: number[];
  onSelectionChange: (selected: number[]) => void;
  onTimeClick: (time: number) => void;
  duration: number;
}

export default function TranscriptEditor(props: Props) {
  const {
    transcriptData,
    selectedSentences,
    onSelectionChange,
    onTimeClick,
    duration,
  } = props;

  const toggleSentence = (sentenceId: number) => {
    const newSelection = selectedSentences.includes(sentenceId)
      ? selectedSentences.filter((id) => id !== sentenceId)
      : [...selectedSentences, sentenceId];
    onSelectionChange(newSelection);
  };

  return (
    <div className="bg-gray-200 p-4 text-white h-full ">
      <h2 className="text-2xl font-black mb-4 text-blue-950 ">Transcript</h2>
      <div className="space-y-6">
        {transcriptData.sections.map((section) => {
          if (section.sentences[0].startTime > duration) return null;
          return (
            <div key={section.id}>
              {/* title */}
              <h3 className="text-lg font-semibold text-blue-950 pl-2">
                {section.title}
              </h3>
              {/* sentences-block */}
              <div className="mt-2 rounded ">
                {section.sentences.map((sentence) => {
                  if (sentence.startTime > duration) return null;
                  return (
                    <div
                      key={sentence.id}
                      className={`text-black  flex rounded m-1 p-2  cursor-pointer ${
                        selectedSentences.includes(sentence.id)
                          ? "bg-blue-400"
                          : "bg-white"
                      }`}
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleSentence(sentence.id)}
                    >
                      {/* timestamps & text */}
                      <span
                        className="text-xl font-bold text-blue-800  cursor-pointer "
                        onClick={(e) => {
                          e.stopPropagation();
                          onTimeClick(sentence.startTime);
                        }}
                      >
                        {formatTime(sentence.startTime)}
                      </span>
                      <span className=" ml-4 text-lg">{sentence.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
