export interface Sentence {
  id: number;
  text: string;
  startTime: number;
  endTime: number;
}

export interface Section {
  id: number;
  title: string;
  sentences: Sentence[];
}

export interface TranscriptData {
  sections: Section[];
  suggestedHighlights: number[];
}
