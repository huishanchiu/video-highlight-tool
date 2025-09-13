"use client";

import { useEffect, useMemo, useRef } from "react";
import SentencesBlock from "./sentencesBlock";
import { useVideoEditor } from "@/context/videoEditor";
import getCurrentSentence from "@/utils/getCurrentSentence";

export default function TranscriptEditor() {
  const { transcriptData, duration, selectedSentencesID, currentTime } =
    useVideoEditor();
  const containerRef = useRef<HTMLDivElement>(null);

  const activeId = useMemo(() => {
    if (!transcriptData) return null;
    const hit = getCurrentSentence(
      transcriptData,
      currentTime,
      selectedSentencesID
    );
    return hit ? hit.id : null;
  }, [transcriptData, currentTime, selectedSentencesID]);

  useEffect(() => {
    if (!containerRef.current || !activeId) return;

    const el = containerRef.current.querySelector<HTMLElement>(
      `[data-sent-id="${activeId}"]`
    );

    const videoPreviewEl = document.getElementById("video-preview");

    if (!el || !videoPreviewEl) return;

    // 計算元素相對於容器的位置
    const elTop = el.offsetTop;
    // 根據螢幕大小調整距離頂部的間距
    const isMobile = window.innerWidth < 1024;
    const topOffset = isMobile ? videoPreviewEl.clientHeight + 60 : 100;
    const targetScrollTop = elTop - topOffset;

    containerRef.current.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: "smooth",
    });
  }, [activeId, currentTime]);

  if (!transcriptData) {
    return (
      <h2 className="text-2xl font-black mb-4 text-blue-950 ">
        No Transcript!
      </h2>
    );
  }

  return (
    <div className="bg-gray-200 p-4 text-white h-full ">
      <h2 className="text-2xl font-black mb-4 text-blue-950 ">Transcript</h2>
      <div
        className="space-y-6 overflow-y-auto max-h-[calc(100vh-120px)] "
        ref={containerRef}
      >
        {transcriptData.sections.map((section) => {
          if (section.sentences[0].startTime > duration) return null;
          return (
            <div key={section.id}>
              {/* title */}
              <h3 className="text-lg font-semibold text-blue-950 pl-2">
                {section.title}
              </h3>
              {/* sentences-block */}
              <SentencesBlock
                sentences={section.sentences}
                activeId={activeId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
