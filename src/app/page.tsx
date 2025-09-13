import VideoEditor from "@/components/VideoEditor";
import { VideoEditorProvider } from "@/context/videoEditor";

export default function Home() {
  return (
    <div>
      <VideoEditorProvider>
        <VideoEditor />
      </VideoEditorProvider>
    </div>
  );
}
