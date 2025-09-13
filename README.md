
# Video Highlight Tool

A modern web application for video editing and transcript management, built with Next.js and TypeScript. This tool allows users to upload videos, generate transcripts, and create highlight clips with synchronized text editing capabilities.
## 🚀 Demo
https://video-highlight-tool-eight.vercel.app/

## ✨ Features

- **Video Upload & Preview**: Support for various video formats with real-time preview
- **Automatic Transcript Generation**: AI-powered transcript generation based on video duration
- **Interactive Timeline**: Navigate through video content with precise time controls
- **Synchronized Text Editing**: Real-time synchronization between video playback and transcript
- **Sentence-Level Navigation**: Jump to specific parts of the video by clicking transcript sentences
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Smooth Scrolling**: Auto-scroll transcript to follow video progress

## 🚀 Tech Stack

- **React + Next.js**: Future scalability with features like Server-Side Rendering (SSR), API routes, and enhanced performance optimizations that can improve both SEO and user experience.
- **TypeScript**: By defining types with TypeScript, the code becomes more readable, maintainable, and helps catch potential errors at compile time. All components and utilities are strongly typed.
- **Tailwind CSS**: Used for utility-first styling and significantly reducing the final CSS bundle size. Tailwind CSS v4 provides better performance and developer experience.
- **React Context API**: Implemented centralized state management for video editor functionality, eliminating prop drilling and providing clean state sharing across components.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/transcript/          # API routes for transcript generation
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main application page
├── components/
│   └── VideoEditor/
│       ├── index.tsx            # Main video editor container
│       ├── Preview/             # Video preview components
│       └── TranscriptEditor/    # Transcript editing components
├── context/
│   └── videoEditor.tsx          # Video editor context provider
├── types/
│   └── transcript.ts            # TypeScript type definitions
└── utils/
    ├── formatTime.ts            # Time formatting utilities
    └── getCurrentSentence.ts    # Sentence navigation logic
```

## 🎯 Usage

1. **Upload Video**: Select and upload a video file through the interface
2. **Generate Transcript**: The system automatically generates a transcript based on video duration
3. **Navigate Content**: Click on any sentence in the transcript to jump to that moment in the video
4. **Edit Transcript**: Make real-time edits to the transcript content
5. **Create Highlights**: Select specific sections to create highlight clips

## 📝 API Routes

- `GET/POST /api/transcript` - Handle transcript generation and management

## 🌟 Key Components

- **VideoEditor**: Main container managing video playback and transcript editing
- **VideoPreview**: Handles video display, controls, and timeline
- **TranscriptEditor**: Manages transcript display and interactive sentence navigation
- **VideoControls**: Provides play/pause, seek, and timeline controls


