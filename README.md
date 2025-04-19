# **Video Highlight Tool**

### Frontend Framework

**React + Next**: Although this app currently doesn't connect to a backend, I chose Next.js because it allows for future scalability with features like Server-Side Rendering (SSR), which can improve both SEO and user experience.

**TypeScript**: By defining types with TypeScript, the code becomes more readable and maintainable.

**Tailwind CSS**: Used for utility-first styling and significantly reducing the final CSS bundle size.

**React Hooks**: For component state management and side effects.

### Component Structure

```javascript
src/
├── components/
│   ├── TranscriptEditor
│   ├── VideoEditor         
│   ├── VideoPreview  
│   └── VideoUploader    
├── mock/             
├── utils/          
└── types/              
```

### VideoUploader 

- Implemented image upload functionality using the HTML File API.

- The default file input element is hidden, and a custom button is used to trigger the file upload action via `useRef` and a programmatic click on the input element.

### VideoPreview 

- Implemented video play and pause functionality using the native `<video />` element.

- Enabled mouse interactions to allow users to scrub through the video by dragging.

### TranscriptEditor

- Extracted the `formatTime` function for reuse.

- Supports clicking on a timestamp to jump to the corresponding time in the video.
