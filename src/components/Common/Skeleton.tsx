"use client";

type Props = {
  count: number;
};

const Skeleton = ({ count }: Props) => {
  const linesPerSection = 3;

  return (
    <div className="bg-gray-800 h-full p-8 " role="status">
      <span className="sr-only">Loading…</span>
      <div className="space-y-6">
        <div className="h-8 w-1/3 bg-gray-700/60 rounded animate-pulse" />
        {Array.from({ length: count }).map((_, sectionIdx) => (
          <div key={sectionIdx} className="space-y-4">
            <div className="h-6 w-1/4 bg-gray-700/60 rounded animate-pulse" />
            {Array.from({ length: linesPerSection }).map((_, lineIdx) => (
              <div key={lineIdx} className="flex items-center space-x-4">
                <div className="h-4 w-16 bg-gray-700/60 rounded animate-pulse" />
                <div className="h-4 flex-1 bg-gray-700/60 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
