"use client";
import getOneCourse from "@/app/lib/getOneCourse";
import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

const SingleCourse = ({ params }) => {
  const { id } = use(params);
  const { user, isLoading } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const courseData = await getOneCourse(id);
        setCourse(courseData);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if auth is loaded
    if (!isLoading) {
      fetchCourse();
    }
  }, [id, isLoading]);

  // Show loading spinner while auth or course is loading
  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-base-content/70">Loading course...</p>
        </div>
      </div>
    );
  }

  // Show authentication required message
  if (!user && error?.includes("Authentication required")) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <svg
            className="mx-auto h-12 w-12 text-warning mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h1 className="text-2xl sm:text-3xl font-bold text-base-content mb-4">
            Login Required
          </h1>
          <p className="text-base-content/70 mb-6 text-sm sm:text-base">
            You need to be logged in to view course details.
          </p>
          <div className="space-y-2">
            <Link href="/login" className="btn btn-neutral block">
              Login to Continue
            </Link>
            <Link href="/courses" className="btn btn-ghost btn-sm">
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <svg
            className="mx-auto h-12 w-12 text-error mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-2xl sm:text-3xl font-bold text-base-content mb-4">
            Error Loading Course
          </h1>
          <p className="text-base-content/70 mb-6 text-sm sm:text-base">
            {error}
          </p>
          <div className="space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="btn btn-neutral block"
            >
              Try Again
            </button>
            <Link href="/courses" className="btn btn-ghost btn-sm">
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show course not found
  if (!course?.data) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-base-content mb-4">
            Course Not Found
          </h1>
          <p className="text-base-content/70 mb-6">
            The course you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/courses" className="btn btn-neutral">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const courseData = course.data;
  console.log(courseData);

  return (
    <div className="min-h-screen bg-base-200 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/courses"
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
            Back to Courses
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Course Image */}
          <div className="relative">
            <figure className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg">
              <Image
                src={courseData.imageUrl || "/covertest.jpg"}
                alt={courseData.title || "Course image"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </figure>
          </div>

          {/* Course Details */}
          <div className="flex flex-col justify-between h-full space-y-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-4">
                  {courseData.title}
                </h1>
                <p className="text-base-content/70 text-base sm:text-lg leading-relaxed">
                  {courseData.description}
                </p>
              </div>

              {/* Course Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card bg-base-100 shadow-md border border-base-300">
                  <div className="card-body p-4 text-center">
                    <div className="text-2xl font-bold text-success">
                      ${courseData.price}
                    </div>
                    <div className="text-sm text-base-content/70">
                      Course Price
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 shadow-md border border-base-300">
                  <div className="card-body p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {courseData.Modules?.length || 0}
                    </div>
                    <div className="text-sm text-base-content/70">
                      Total Modules
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Aligned to bottom */}
            <div className="mt-auto">
              <button className="btn btn-neutral w-full text-white hover:bg-black transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M13 13v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
                  />
                </svg>
                {user?.role?.name === "Admin" ||
                user?.role?.name === "SocialMediaManager" ||
                user?.role?.name === "Student"
                  ? "Enrolled"
                  : "Enroll Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Course Modules */}
        {courseData.Modules && (
          <div className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-6">
              Course Modules ({courseData.total_modules})
            </h2>
            <div className="space-y-4">
              {courseData.Modules.map((module, index) => (
                <div
                  key={module.id || index}
                  className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="card-body p-6">
                    {/* Module Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="badge badge-neutral badge-lg mr-4 text-white">
                          Module {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-base-content">
                            {module.name ||
                              module.title ||
                              `Module ${index + 1}`}
                          </h3>
                          {module.numberOfClasses && (
                            <div className="flex items-center mt-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-sm text-base-content/70">
                                {module.numberOfClasses} Classes
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Module Description */}
                    {module.details && (
                      <div className="mb-4">
                        <p className="text-base-content/80 leading-relaxed">
                          {module.details}
                        </p>
                      </div>
                    )}

                    {/* Topics Covered */}
                    {module.topicsCovered && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-base-content mb-2 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2 text-success"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Topics Covered:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {module.topicsCovered
                            .split(",")
                            .map((topic, topicIndex) => (
                              <span
                                key={topicIndex}
                                className="badge badge-outline badge-sm text-xs"
                              >
                                {topic.trim()}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Module Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-base-300">
                      <div className="flex items-center space-x-4 text-sm text-base-content/70">
                        {module.numberOfClasses && (
                          <span className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            {module.numberOfClasses} Classes
                          </span>
                        )}
                        {module.duration && (
                          <span className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {module.duration}
                          </span>
                        )}
                      </div>

                      {user &&
                      (user.role?.name === "Admin" ||
                        user.role?.name === "SocialMediaManager" ||
                        user.role?.name === "Student") ? (
                        // Watch button for enrolled users
                        <Link
                          href={`/courses/${id}/video`}
                          className="btn btn-sm btn-outline btn-success"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Play Video
                        </Link>
                      ) : (
                        // Enroll to watch button for others (default)
                        <button className="btn btn-sm btn-outline btn-neutral">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                          Enroll to watch
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCourse;
