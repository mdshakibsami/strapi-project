import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-base-300 to-base-200 text-base-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-base-content">
                CPS Academy
              </h3>
            </div>
            <p className="text-sm sm:text-base text-base-content/80 leading-relaxed max-w-md">
              Empowering learners with high-quality online courses and expert
              instruction. Join thousands of students on their learning journey.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/bd.cpsacademy/"
                className="w-10 h-10 bg-base-100 hover:bg-black hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@CPSAcademy"
                className="w-10 h-10 bg-base-100 hover:bg-black hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                aria-label="Subscribe to our YouTube channel"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/cps-academy/posts/?feedView=all"
                className="w-10 h-10 bg-base-100 hover:bg-black hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                aria-label="Connect with us on LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-neutral rounded-lg flex items-center justify-center">
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
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-base-content">
                Quick Links
              </h3>
            </div>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/"
                className="group flex items-center space-x-3 p-3 rounded-lg bg-base-100/50 hover:bg-base-100 hover:shadow-md transition-all duration-300"
              >
                <div className="w-8 h-8 bg-black/20 group-hover:bg-black rounded-lg flex items-center justify-center transition-colors duration-300">
                  <svg
                    className="w-4 h-4 text-black group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0h1m0 0h3a1 1 0 001-1V10M9 21h6"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-base-content group-hover:text-black transition-colors duration-300">
                  Home
                </span>
              </Link>

              <Link
                href="/courses"
                className="group flex items-center space-x-3 p-3 rounded-lg bg-base-100/50 hover:bg-base-100 hover:shadow-md transition-all duration-300"
              >
                <div className="w-8 h-8 bg-neutral/20 group-hover:bg-neutral rounded-lg flex items-center justify-center transition-colors duration-300">
                  <svg
                    className="w-4 h-4 text-neutral group-hover:text-white"
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
                <span className="text-sm font-medium text-base-content group-hover:text-neutral transition-colors duration-300">
                  Courses
                </span>
              </Link>

              <Link
                href="/about"
                className="group flex items-center space-x-3 p-3 rounded-lg bg-base-100/50 hover:bg-base-100 hover:shadow-md transition-all duration-300"
              >
                <div className="w-8 h-8 bg-neutral/20 group-hover:bg-neutral rounded-lg flex items-center justify-center transition-colors duration-300">
                  <svg
                    className="w-4 h-4 text-neutral group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-base-content group-hover:text-neutral transition-colors duration-300">
                  About
                </span>
              </Link>

              <Link
                href="/"
                className="group flex items-center space-x-3 p-3 rounded-lg bg-base-100/50 hover:bg-base-100 hover:shadow-md transition-all duration-300"
              >
                <div className="w-8 h-8 bg-neutral/20 group-hover:bg-neutral rounded-lg flex items-center justify-center transition-colors duration-300">
                  <svg
                    className="w-4 h-4 text-neutral group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-base-content group-hover:text-neutral transition-colors duration-300">
                  Contact
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
