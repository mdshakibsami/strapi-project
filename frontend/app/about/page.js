import React from "react";
import Image from "next/image";
import Link from "next/link";
import story from "@/public/story.jpg";

const About = () => {
  return (
    <main className="min-h-screen bg-base-100">
      {/* Our Story Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-base-content/80 leading-relaxed">
                <p>
                  Founded with a vision to make quality education accessible to
                  everyone, our platform has grown from a small initiative into
                  a comprehensive learning ecosystem that serves thousands of
                  students worldwide.
                </p>
                <p>
                  We believe that learning should be engaging, practical, and
                  relevant to real-world challenges. That&apos;s why we&apos;ve
                  carefully curated courses that not only teach theoretical
                  concepts but also provide hands-on experience through projects
                  and practical applications.
                </p>
                <p>
                  Our commitment to excellence drives us to continuously improve
                  our platform, update our content, and provide the best
                  possible learning experience for our community.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={story}
                alt="Our learning environment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 bg-base-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              We&apos;re not just another online learning platform. Here&apos;s
              what makes us different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-base-content mb-3">
                Industry-Relevant Curriculum
              </h3>
              <p className="text-base-content/70">
                Our courses are designed with input from industry professionals
                to ensure you learn skills that employers actually need.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-neutral rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
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
              <h3 className="text-xl font-semibold text-base-content mb-3">
                Expert Instructors
              </h3>
              <p className="text-base-content/70">
                Learn from experienced professionals who have worked at top
                companies and are passionate about teaching.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-neutral rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
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
              <h3 className="text-xl font-semibold text-base-content mb-3">
                Hands-On Projects
              </h3>
              <p className="text-base-content/70">
                Build real projects that you can add to your portfolio and
                showcase to potential employers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-neutral rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
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
              <h3 className="text-xl font-semibold text-base-content mb-3">
                Flexible Learning
              </h3>
              <p className="text-base-content/70">
                Learn at your own pace with lifetime access to course materials
                and regular content updates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-neutral rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-base-content mb-3">
                Community Support
              </h3>
              <p className="text-base-content/70">
                Join a vibrant community of learners and get help when you need
                it through forums and peer support.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-neutral rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-base-content mb-3">
                Certificates & Recognition
              </h3>
              <p className="text-base-content/70">
                Earn certificates upon completion that you can share on your
                LinkedIn profile and resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-base-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-base-content/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already transforming their
            careers with our comprehensive courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="btn btn-neutral btn-lg px-8">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
