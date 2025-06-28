export default async function getOneCourse(id) {
  const token = localStorage.getItem("token");

  const result = await fetch(
    `http://localhost:1337/api/courses/${id}?populate=*`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // Ensures fresh data on each request
    }
  );

  if (!result.ok) {
    if (result.status === 401) {
      throw new Error(
        "Authentication required. Please log in to view this course."
      );
    }
    if (result.status === 403) {
      throw new Error(
        "Access denied. You don't have permission to view this course."
      );
    }
    if (result.status === 404) {
      throw new Error("Course not found.");
    }
    throw new Error(
      `There was an error fetching the course (${result.status})`
    );
  }

  return result.json();
}
