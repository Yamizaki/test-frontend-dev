"use client";

import { useState } from "react";
import VideoPlayer from "./components/video-player";
import CourseHeader from "./components/course-header";
import CourseNavigation from "./components/course-navigation";

export default function CoursePage() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");

  const handleSelectLesson = (url, title) => {
    setVideoUrl(url);
    setVideoTitle(title);
  };

  return (
    <main className="flex flex-col  overflow-hidden bg-gray-300">
      <CourseHeader title={videoTitle} />

      <section className="flex flex-1 flex-col  lg:flex-row min-h-0 pb-10">
        <aside className="w-full lg:w-3/4 h-full  relative">
          <VideoPlayer videoUrl={videoUrl} title={videoTitle} className="h-full w-full" />
        </aside>

        <article className="w-full lg:w-1/4 border-l flex flex-col h-full">
          <CourseNavigation onSelectLesson={handleSelectLesson} className="h-full overflow-y-auto" />
        </article>
      </section>
    </main>
  );
}
