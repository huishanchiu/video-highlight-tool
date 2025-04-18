import VideoEditor from "@/components/VideoEditor";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Video Highlight Tool
        </h1>
        <VideoEditor />
      </div>
    </main>
  );
}
