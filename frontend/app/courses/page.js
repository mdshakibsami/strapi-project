import React from "react";
import getAllCourses from "../lib/getAllCourses";
import Image from "next/image";
import Link from "next/link";

const Courses = async () => {
  const courses = await getAllCourses();

  console.log(courses);
  return (
    <div className="min-h-screen bg-base-200 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-3 sm:mb-4">
            Our Courses
          </h1>
          <p className="text-base-content/70 text-base sm:text-lg max-w-2xl mx-auto">
            Choose from our wide range of professional courses designed to boost
            your career
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {courses?.data?.map((course) => (
            <div
              key={course.id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-base-300"
            >
              <figure className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src={course.imageUrl || "/covertest.jpg"}
                  alt={course.title || "Course image"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </figure>
              <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-base sm:text-lg font-bold mb-2 text-base-content line-clamp-2">
                  {course.title}
                </h2>
                <p className="text-base-content/70 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="badge badge-neutral badge-sm text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    {course.total_modules} Modules
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-success">
                    ${course.price}
                  </div>
                </div>

                <div className="card-actions justify-end">
                  <Link
                    href={`/courses/${course.documentId}`}
                    className="btn btn-neutral btn-sm w-full text-white hover:bg-black transition-colors duration-200"
                  >
                    See More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!courses?.data || courses.data.length === 0) && (
          <div className="text-center py-12 sm:py-16">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-base-content/40 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="text-xl sm:text-2xl font-semibold text-base-content mb-2 sm:mb-4">
                No courses available
              </h3>
              <p className="text-base-content/70 text-sm sm:text-base">
                Check back later for new courses and learning opportunities!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
