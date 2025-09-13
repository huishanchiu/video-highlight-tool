import { TranscriptData } from "@/types/transcript";

const getCurrentSentence = (
  transcriptData: TranscriptData,
  currentTime: number,
  selectedSentencesID: number[]
) => {
  if (!transcriptData) return null;

  for (const section of transcriptData.sections) {
    for (const sentence of section.sentences) {
      if (
        currentTime >= sentence.startTime &&
        currentTime <= sentence.endTime &&
        selectedSentencesID.includes(sentence.id)
      ) {
        return sentence;
      }
    }
  }
  return null;
};

export default getCurrentSentence;
