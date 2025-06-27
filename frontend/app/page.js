import Image from "next/image";
import Link from "next/link";
// import bannerImage from "@/public/cpsCover.jpg";
import bannerImage from "@/public/covertest.jpg";
import getBestCourses from "./lib/getBestCourse";

export default async function Home() {
  const coursesResponse = await getBestCourses();
  const courses = coursesResponse.data;
  console.log(courses);

  return (
    <main>
      {/* Hero Banner */}
      <div style={{ width: "100vw", height: "450px", position: "relative" }}>
        <Image src={bannerImage} alt="cover image" fill />
      </div>

      {/* Best Courses Section */}
      <section className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">
              Our Best Rated Courses
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Discover our top-rated courses designed to help you master new
              skills and advance your career.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses?.map((course) => (
              <div
                key={course.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300"
              >
                {/* Course Image */}
                <figure className="relative h-48 overflow-hidden">
                  <Image
                    src={course.imageUrl || "/covertest.jpg"}
                    alt={course.title || "Course image"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </figure>

                {/* Card Body */}
                <div className="card-body p-6">
                  <h3 className="card-title text-lg font-bold text-base-content mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-base-content/70 text-sm mb-4 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Course Info */}
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="badge badge-neutral badge-sm">
                      {course.total_modules} Modules
                    </span>
                    <span className="font-bold text-success">
                      ${course.price}
                    </span>
                  </div>

                  {/* Action Button
                  <div className="card-actions justify-end">
                    <Link
                      href={`/courses/${course.id}`}
                      className="btn btn-neutral btn-sm w-full hover:bg-black transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </div> */}
                </div>
              </div>
            ))}
          </div>

          {/* View All Courses Link */}
          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="btn btn-outline btn-neutral btn-lg"
            >
              View All Courses
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Our Work Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">
                  Empowering Learners Through Excellence
                </h2>
                <p className="text-lg text-base-content/80 leading-relaxed mb-8">
                  We are dedicated to providing world-class online education
                  that transforms careers and opens new opportunities. Our
                  mission is to make high-quality learning accessible to
                  everyone, everywhere.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-neutral rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content">
                      Expert Instructors
                    </h3>
                    <p className="text-sm text-base-content/70">
                      Learn from industry professionals with years of experience
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-neutral rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content">
                      Practical Learning
                    </h3>
                    <p className="text-sm text-base-content/70">
                      Hands-on projects and real-world applications
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-neutral rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content">
                      Flexible Schedule
                    </h3>
                    <p className="text-sm text-base-content/70">
                      Learn at your own pace, anytime, anywhere
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-neutral rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content">
                      Community Support
                    </h3>
                    <p className="text-sm text-base-content/70">
                      Join thousands of learners in our community
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-base-300">
                <div className="text-center">
                  <div className="text-3xl font-bold text-neutral">1000+</div>
                  <div className="text-sm text-base-content/70">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neutral">50+</div>
                  <div className="text-sm text-base-content/70">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neutral">95%</div>
                  <div className="text-sm text-base-content/70">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
