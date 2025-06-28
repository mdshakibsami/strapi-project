"use client";
import React, { useState, useEffect, useId } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import getAllCourses from "../lib/getAllCourses";
import { deleteCourse } from "../lib/deleteCourse";
import getAllUsers from "../lib/getAllUsers";
import updateRole from "../lib/updateRole";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [courses, setCourses] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch all courses and users
  useEffect(() => {
    const fetchData = async () => {
      // Don't fetch if user is not available yet
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Always fetch courses for Admin and SocialMediaManager
        if (
          user.role?.name === "Admin" ||
          user.role?.name === "SocialMediaManager"
        ) {
          console.log("Fetching courses for role:", user.role?.name);
          const coursesData = await getAllCourses();
          console.log("Courses fetched:", coursesData);
          setCourses(coursesData.data || []);
        }

        // Only fetch users for Admin
        if (user.role?.name === "Admin") {
          console.log("Fetching users for Admin");
          const usersData = await getAllUsers();
          console.log("Users fetched:", usersData);
          setAllUsers(usersData || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]); // Depend on user so it refetches when user changes
  console.log("All users: ", allUsers);
  console.log("All course: ", courses);
  console.log("Current user: ", user);
  console.log("User role: ", user?.role?.name);

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
      role: user?.role?.name,
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

  const handleEditUserRole = async (userId, currentRole, username) => {
    // Show SweetAlert input dialog for role selection
    const { value: newRole } = await Swal.fire({
      title: `Edit Role for ${username}`,
      text: "Select a new role for this user:",
      input: "select",
      inputOptions: {
        Student: "Student",
        Authenticated: "Authenticated",
        Admin: "Admin",
      },
      inputValue: currentRole,
      showCancelButton: true,
      confirmButtonText: "Update Role",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      background: "#1f2937",
      color: "#f9fafb",
      customClass: {
        popup: "swal2-dark-popup",
        title: "swal2-dark-title",
        htmlContainer: "swal2-dark-content",
        input: "swal2-dark-input",
        confirmButton: "swal2-dark-confirm-btn",
        cancelButton: "swal2-dark-cancel-btn",
        actions: "swal2-dark-actions",
      },
      didOpen: () => {
        // Additional styling to ensure visibility
        const popup = document.querySelector(".swal2-popup");
        const title = document.querySelector(".swal2-title");
        const content = document.querySelector(".swal2-html-container");
        const input = document.querySelector(".swal2-input");
        const select = document.querySelector(".swal2-select");

        if (popup) {
          popup.style.backgroundColor = "#1f2937";
          popup.style.border = "1px solid #374151";
          popup.style.borderRadius = "0.5rem";
        }

        if (title) {
          title.style.color = "#f9fafb";
          title.style.fontSize = "1.25rem";
          title.style.fontWeight = "600";
        }

        if (content) {
          content.style.color = "#d1d5db";
          content.style.fontSize = "0.875rem";
        }

        if (input || select) {
          const inputElement = input || select;
          inputElement.style.backgroundColor = "#374151";
          inputElement.style.border = "1px solid #4b5563";
          inputElement.style.borderRadius = "0.375rem";
          inputElement.style.color = "#f9fafb";
          inputElement.style.padding = "0.5rem";
        }
      },
      inputValidator: (value) => {
        if (!value) {
          return "Please select a role";
        }
      },
    });

    if (newRole && newRole !== currentRole) {
      try {
        // Here you would call an API to update the user role
        const result = await updateRole(user.id, newRole);
        console.log(result);
        // const result = await updateUserRole(userId, newRole);

        // For now, we'll just update the local state
        setAllUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: { name: newRole } } : user
          )
        );

        // Show success alert
        Swal.fire({
          title: "Role Updated!",
          text: `${username}'s role has been changed to ${newRole}.`,
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
        console.error("Error updating user role:", error);

        Swal.fire({
          title: "Error!",
          text: "Failed to update user role. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#374151",
          background: "#1f2937",
          color: "#f9fafb",
          iconColor: "#ef4444",
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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
          // Check if user has permission to view users (Admin only)
          if (!user || user.role?.name !== "Admin") {
            return (
              <div className="text-center py-8">
                <p className="text-base-content/70">
                  You don&apos;t have permission to view this content.
                </p>
              </div>
            );
          }

          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-base-content">
                  All Users
                </h2>
                <div className="text-sm text-base-content/60">
                  Total: {allUsers.length} users
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <span className="loading loading-spinner loading-lg"></span>
                  <span className="ml-2 text-base-content">
                    Loading users...
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
              ) : allUsers.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-base-content/70">No users found</p>
                </div>
              ) : (
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
                          <th className="text-base-content">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers.map((user, index) => (
                          <tr
                            key={user.id || index}
                            className="hover:bg-base-200"
                          >
                            <td className="text-base-content">
                              {user.username}
                            </td>
                            <td className="text-base-content/70">
                              {user.email}
                            </td>
                            <td>
                              <span className="badge badge-neutral">
                                {user.role?.name}
                              </span>
                            </td>
                            <td className="text-base-content/70">
                              {user.createdAt
                                ? new Date(user.createdAt).toLocaleDateString()
                                : "Unknown"}
                            </td>
                            <td>
                              <span className="badge badge-success">
                                Active
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-outline btn-neutral btn-xs sm:btn-sm"
                                onClick={() =>
                                  handleEditUserRole(
                                    user.id,
                                    user.role?.name,
                                    user.username
                                  )
                                }
                                title="Edit Role"
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
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                Edit Role
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        case "courses":
          // Check if user has permission to view courses
          if (
            !user ||
            (user.role?.name !== "Admin" &&
              user.role?.name !== "SocialMediaManager")
          ) {
            return (
              <div className="text-center py-8">
                <p className="text-base-content/70">
                  You don&apos;t have permission to view this content.
                </p>
              </div>
            );
          }

          return (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-base-content">
                  All Courses
                </h2>
                <div className="text-sm text-base-content/60">
                  Total: {loading ? "Loading..." : courses.length} courses
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
                  <p className="text-sm text-base-content/50 mt-2">
                    {user.role?.name === "Admin"
                      ? "Create your first course to get started."
                      : "No courses are available to manage at the moment."}
                  </p>
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
                                <div className="flex gap-1 sm:gap-2">
                                  <Link
                                    href={`/courses/${documentId}`}
                                    className="btn btn-outline btn-neutral btn-xs sm:btn-sm"
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
                                    className="btn btn-error btn-xs sm:btn-sm"
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
    <div className="min-h-screen bg-base-200">
      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden bg-base-100 border-b border-base-300 p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-base-content">Dashboard</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="btn btn-square btn-ghost"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div className="flex relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Left Sidebar */}
        <div
          className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 
          fixed lg:relative 
          inset-y-0 left-0 
          w-80 lg:w-80 
          bg-base-100 
          shadow-lg 
          border-r border-base-300 
          flex flex-col 
          z-50 
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "top-0" : "top-16 lg:top-0"}
        `}
        >
          {/* Close button for mobile */}
          <div className="lg:hidden p-4 border-b border-base-300 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-base-content">Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="btn btn-sm btn-circle btn-ghost"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* User Info Section */}
          <div className="p-4 lg:p-6 border-b border-base-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-neutral rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6 text-white"
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
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base-content truncate">
                  {userData.username}
                </h3>
                <p className="text-sm text-base-content/70 truncate">
                  {userData.email}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="badge badge-neutral badge-sm lg:badge-lg">
                {userData.role}
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActiveTab("overview");
                    setIsSidebarOpen(false);
                  }}
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

              {user && user.role?.name === "Admin" && (
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("users");
                      setIsSidebarOpen(false);
                    }}
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
              )}

              {user &&
                (user.role?.name === "Admin" ||
                  user.role?.name === "SocialMediaManager") && (
                  <li>
                    <button
                      onClick={() => {
                        setActiveTab("courses");
                        setIsSidebarOpen(false);
                      }}
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
                )}

              {/* Browse Courses */}
              <li className="pt-4 border-t border-base-300">
                <Link
                  href="/courses"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 text-base-content hover:bg-base-200"
                  onClick={() => setIsSidebarOpen(false)}
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
                  onClick={() => setIsSidebarOpen(false)}
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
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 lg:mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-base-content mb-2">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "users" && "User Management"}
                {activeTab === "courses" && "Course Management"}
              </h1>
              <p className="text-sm lg:text-base text-base-content/70">
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
    </div>
  );
};

export default Dashboard;
