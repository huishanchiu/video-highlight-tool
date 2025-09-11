import type { TranscriptData } from "@/types/transcript";

export const mockTranscriptData: TranscriptData = {
  sections: [
    {
      id: 1,
      title: "Introduction",
      sentences: [
        {
          id: 1,
          text: "Welcome to the video highlight tool!",
          startTime: 0,
          endTime: 3,
        },
        {
          id: 2,
          text: "這個工具可以幫助你快速創建影片精華片段",
          startTime: 3,
          endTime: 6,
        },
      ],
    },
    {
      id: 2,
      title: "Key Features",
      sentences: [
        {
          id: 3,
          text: "你可以上傳任何影片檔案",
          startTime: 6,
          endTime: 9,
        },
        {
          id: 4,
          text: "AI 會自動生成轉錄文字",
          startTime: 9,
          endTime: 12,
        },
        {
          id: 5,
          text: "選擇你想要保留的片段",
          startTime: 12,
          endTime: 15,
        },
      ],
    },
    {
      id: 3,
      title: "結尾",
      sentences: [
        {
          id: 6,
          text: "感謝使用我們的工具",
          startTime: 15,
          endTime: 18,
        },
        {
          id: 7,
          text: "希望這個工具能幫助到你",
          startTime: 18,
          endTime: 21,
        },
      ],
    },
  ],
  suggestedHighlights: [2, 4, 6],
};
