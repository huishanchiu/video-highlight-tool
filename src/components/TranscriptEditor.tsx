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
    <div className="bg-gray-800 rounded-lg p-4 text-white">
      <h2 className="text-xl font-semibold mb-4">Transcript</h2>
      <div className="space-y-6">
        {transcriptData.sections.map((section) => {
          if (section.sentences[0].startTime > duration) return null;
          return (
            <div key={section.id}>
              <h3 className="text-lg font-medium bg-gray-700 p-2 rounded">
                {section.title}
              </h3>
              <div className="mt-2">
                {section.sentences.map((sentence) => {
                  if (sentence.startTime > duration) return null;
                  return (
                    <div
                      key={sentence.id}
                      className={`flex items-start p-2 rounded cursor-pointer ${
                        selectedSentences.includes(sentence.id)
                          ? "bg-blue-500"
                          : "hover:bg-gray-700"
                      }`}
                      onClick={() => toggleSentence(sentence.id)}
                    >
                      <span
                        className="text-sm text-blue-300 min-w-[60px] mt-1 cursor-pointer hover:text-blue-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTimeClick(sentence.startTime);
                        }}
                      >
                        {formatTime(sentence.startTime)}
                      </span>
                      <p className="flex-1 ml-4">{sentence.text}</p>
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
