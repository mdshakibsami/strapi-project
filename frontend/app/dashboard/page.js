"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import getAllCourses from "../lib/getAllCourses";
import { deleteCourse } from "../lib/deleteCourse";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await getAllCourses();
        setCourses(coursesData.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // user data extraction
  const getUserData = () => {
    if (!user) {
      return {
        username: "Demo User",
        email: "demo@example.com",
        role: "Student",
      };
    }
    return {
      username: user.username,
      email: user.email,
      role: user.role.name,
    };
  };
  const userData = getUserData();

  const handleDeleteCourse = async (courseId, courseTitle) => {
    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the course "${courseTitle}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444", // Red for delete
      cancelButtonColor: "#374151", // Gray to match your theme
      background: "#1f2937", // Dark background to match your design
      color: "#f9fafb", // Light text
      iconColor: "#f59e0b", // Warning orange
      reverseButtons: true,
      customClass: {
        popup: "rounded-lg border border-gray-600",
        title: "text-lg font-semibold",
        htmlContainer: "text-sm",
        confirmButton: "font-medium px-4 py-2 rounded-md",
        cancelButton: "font-medium px-4 py-2 rounded-md",
      },
    });

    if (result.isConfirmed) {
      try {
        const deleteResult = await deleteCourse(courseId);

        // Update the UI by removing the course from the list
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.documentId !== courseId)
        );

        // Show success alert
        Swal.fire({
          title: "Deleted!",
          text: `Course "${courseTitle}" has been deleted successfully.`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#374151",
          background: "#1f2937",
          color: "#f9fafb",
          iconColor: "#10b981",
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            popup: "rounded-lg border border-gray-600",
            title: "text-lg font-semibold",
            htmlContainer: "text-sm",
            confirmButton: "font-medium px-4 py-2 rounded-md",
            timerProgressBar: "bg-green-500",
          },
        });
      } catch (error) {
        console.error("Error deleting course:", error);

        Swal.fire({
          title: "Error!",
          text: "Failed to delete course. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#374151", // Gray button for error
          background: "#1f2937", // Dark background to match your design
          color: "#f9fafb", // Light text
          iconColor: "#ef4444", // Error red
          customClass: {
            popup: "rounded-lg border border-gray-600",
            title: "text-lg font-semibold",
            htmlContainer: "text-sm",
            confirmButton: "font-medium px-4 py-2 rounded-md",
          },
        });
      }
    }
  };

  const renderContent = () => {
    try {
      switch (activeTab) {
        case "overview":
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-base-100 p-6 rounded-lg shadow-lg border border-base-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-neutral rounded-lg flex items-center justify-center">
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
                    <div>
                      <h3 className="text-lg font-semibold text-base-content">
                        Enrolled Courses
                      </h3>
                      <p className="text-3xl font-bold text-neutral">5</p>
                    </div>
                  </div>
                </div>

                <div className="bg-base-100 p-6 rounded-lg shadow-lg border border-base-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-neutral rounded-lg flex items-center justify-center">
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
                      <h3 className="text-lg font-semibold text-base-content">
                        Completed
                      </h3>
                      <p className="text-3xl font-bold text-neutral">2</p>
                    </div>
                  </div>
                </div>

                <div className="bg-base-100 p-6 rounded-lg shadow-lg border border-base-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-neutral rounded-lg flex items-center justify-center">
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
                      <h3 className="text-lg font-semibold text-base-content">
                        Total Courses
                      </h3>
                      <p className="text-3xl font-bold text-neutral">
                        {loading ? "..." : courses.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-base-100 p-6 rounded-lg shadow-lg border border-base-300">
                <h3 className="text-xl font-bold text-base-content mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-base-200 rounded-lg">
                    <div className="w-2 h-2 bg-neutral rounded-full"></div>
                    <span className="text-base-content">
                      Completed lesson: Introduction to React
                    </span>
                    <span className="text-sm text-base-content/60 ml-auto">
                      2 hours ago
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-base-200 rounded-lg">
                    <div className="w-2 h-2 bg-neutral rounded-full"></div>
                    <span className="text-base-content">
                      Started course: Advanced JavaScript
                    </span>
                    <span className="text-sm text-base-content/60 ml-auto">
                      1 day ago
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-base-200 rounded-lg">
                    <div className="w-2 h-2 bg-neutral rounded-full"></div>
                    <span className="text-base-content">
                      Earned certificate: HTML & CSS Basics
                    </span>
                    <span className="text-sm text-base-content/60 ml-auto">
                      3 days ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        case "users":
          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-base-content">
                  All Users
                </h2>
                <div className="text-sm text-base-content/60">
                  Total: 1,250 users
                </div>
              </div>
              <div className="bg-base-100 rounded-lg shadow-lg border border-base-300 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-base-200">
                      <tr>
                        <th className="text-base-content">Name</th>
                        <th className="text-base-content">Email</th>
                        <th className="text-base-content">Role</th>
                        <th className="text-base-content">Joined</th>
                        <th className="text-base-content">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-base-200">
                        <td className="text-base-content">John Doe</td>
                        <td className="text-base-content/70">
                          john@example.com
                        </td>
                        <td>
                          <span className="badge badge-neutral">Student</span>
                        </td>
                        <td className="text-base-content/70">2024-01-15</td>
                        <td>
                          <span className="badge badge-success">Active</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-base-200">
                        <td className="text-base-content">Jane Smith</td>
                        <td className="text-base-content/70">
                          jane@example.com
                        </td>
                        <td>
                          <span className="badge badge-neutral">
                            Instructor
                          </span>
                        </td>
                        <td className="text-base-content/70">2024-02-20</td>
                        <td>
                          <span className="badge badge-success">Active</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-base-200">
                        <td className="text-base-content">Mike Johnson</td>
                        <td className="text-base-content/70">
                          mike@example.com
                        </td>
                        <td>
                          <span className="badge badge-neutral">Student</span>
                        </td>
                        <td className="text-base-content/70">2024-03-10</td>
                        <td>
                          <span className="badge badge-warning">Pending</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        case "courses":
          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-base-content">
                  All Courses
                </h2>
                <div className="text-sm text-base-content/60">
                  Total: {courses.length} courses
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <span className="loading loading-spinner loading-lg"></span>
                  <span className="ml-2 text-base-content">
                    Loading courses...
                  </span>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-error">{error}</p>
                  <button
                    className="btn btn-neutral mt-4"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </button>
                </div>
              ) : courses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-base-content/70">No courses found</p>
                </div>
              ) : (
                <div className="bg-base-100 rounded-lg shadow-lg border border-base-300 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead className="bg-base-200">
                        <tr>
                          <th className="text-base-content">Course Title</th>
                          <th className="text-base-content">Description</th>
                          <th className="text-base-content">Modules</th>
                          <th className="text-base-content">Price</th>
                          <th className="text-base-content">Status</th>
                          <th className="text-base-content">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map((course) => {
                          const attributes = course.attributes || course;
                          const modulesCount = course.total_modules;
                          const documentId = course.documentId;

                          return (
                            <tr key={documentId} className="hover:bg-base-200">
                              <td className="text-base-content font-medium">
                                {String(attributes.title || "Untitled Course")}
                              </td>
                              <td className="text-base-content/70 max-w-xs">
                                <div className="truncate">
                                  {String(
                                    attributes.description ||
                                      "No description available"
                                  ).substring(0, 80)}
                                  {attributes.description &&
                                  attributes.description.length > 80
                                    ? "..."
                                    : ""}
                                </div>
                              </td>
                              <td>
                                <span className="badge badge-neutral">
                                  {modulesCount} Module
                                  {modulesCount !== 1 ? "s" : ""}
                                </span>
                              </td>
                              <td className="text-base-content font-bold">
                                ${String(attributes.price || "0")}
                              </td>
                              <td>
                                <span className="badge badge-success">
                                  Published
                                </span>
                              </td>
                              <td>
                                <div className="flex gap-2">
                                  <Link
                                    href={`/courses/${documentId}`}
                                    className="btn btn-outline btn-neutral btn-xs"
                                    title="View Course"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                      />
                                    </svg>
                                  </Link>
                                  <button
                                    className="btn btn-error btn-xs"
                                    onClick={() =>
                                      handleDeleteCourse(
                                        documentId,
                                        attributes.title
                                      )
                                    }
                                    title="Delete Course"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        default:
          return (
            <div className="text-center py-8">
              <p className="text-base-content/70">
                Select a tab to view content
              </p>
            </div>
          );
      }
    } catch (error) {
      console.error("Error rendering content:", error);
      return (
        <div className="text-center py-8">
          <p className="text-error">Error loading content. Please try again.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-base-100 shadow-lg border-r border-base-300 flex flex-col">
        {/* User Info Section */}
        <div className="p-6 border-b border-base-300">
          <div className="flex items-center space-x-3 mb-4">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-base-content">
                {userData.username}
              </h3>
              <p className="text-sm text-base-content/70">{userData.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="badge badge-neutral badge-lg">
              {userData.role}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === "overview"
                    ? "bg-neutral text-white"
                    : "text-base-content hover:bg-base-200"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0H8v0z"
                  />
                </svg>
                <span>Dashboard Overview</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveTab("users")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === "users"
                    ? "bg-neutral text-white"
                    : "text-base-content hover:bg-base-200"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
                <span>All Users</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveTab("courses")}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                  activeTab === "courses"
                    ? "bg-neutral text-white"
                    : "text-base-content hover:bg-base-200"
                }`}
              >
                <svg
                  className="w-5 h-5"
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
                <span>All Courses</span>
              </button>
            </li>

            {/* Browse Courses */}
            <li className="pt-4 border-t border-base-300">
              <Link
                href="/courses"
                className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 text-base-content hover:bg-base-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span>Browse Courses</span>
              </Link>
            </li>

            {/* About Platform */}
            <li>
              <Link
                href="/about"
                className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 text-base-content hover:bg-base-200"
              >
                <svg
                  className="w-5 h-5"
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
                <span>About Platform</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-base-content mb-2">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "users" && "User Management"}
              {activeTab === "courses" && "Course Management"}
            </h1>
            <p className="text-base-content/70">
              {activeTab === "overview" &&
                "Welcome back! Here's an overview of your learning progress."}
              {activeTab === "users" &&
                "Manage all users and their roles in the platform."}
              {activeTab === "courses" &&
                "View and manage all courses available on the platform."}
            </p>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
