"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const VideoPlay = () => {
  const params = useParams();
  const courseId = params.id;

  const videoTitle = "Course Video - Module 1";

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href={`/courses/${courseId}`}
            className="btn btn-ghost btn-sm text-base-content hover:bg-base-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Course
          </Link>
        </div>

        {/* Video Title */}
        <h1 className="text-2xl font-bold text-base-content mb-6">
          {videoTitle}
        </h1>

        {/* Video Player */}
        <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/ascQI0KMFUQ?rel=0&modestbranding=1&showinfo=0`}
              title={videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlay;
