const randomWords = [
  "hello",
  "world",
  "video",
  "content",
  "amazing",
  "great",
  "wonderful",
  "fantastic",
];
const generateSentence = () => {
  const words = Array.from(
    { length: 5 },
    () => randomWords[Math.floor(Math.random() * randomWords.length)]
  );
  return words.join(" ");
};

export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { searchParams } = new URL(request.url);
  const duration = parseFloat(searchParams.get("duration") || "60");

  const sentences = [];
  let currentTime = 0;
  let sentenceId = 1;

  while (currentTime < duration) {
    // 每個句子的長度隨機在 3-8 秒之間
    const sentenceDuration = Math.floor(Math.random() * 6) + 3;
    const endTime = Math.min(currentTime + sentenceDuration, duration);

    sentences.push({
      id: sentenceId,
      text: generateSentence(),
      startTime: currentTime,
      endTime: endTime,
    });

    currentTime = endTime;
    sentenceId++;

    if (currentTime >= duration) break;
  }

  // 將句子分組成多個 sections，每個 section 最多 3 句
  const sections = [];
  const sentencesPerSection = 3;

  for (let i = 0; i < sentences.length; i += sentencesPerSection) {
    const sectionSentences = sentences.slice(i, i + sentencesPerSection);
    sections.push({
      id: Math.floor(i / sentencesPerSection) + 1,
      title: `Section ${Math.floor(i / sentencesPerSection) + 1}`,
      sentences: sectionSentences,
    });
  }

  const data = {
    sections,
    suggestedHighlights: sentences.slice(0, 3).map((s) => s.id),
  };

  return Response.json(data);
}
