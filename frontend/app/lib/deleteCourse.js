export async function deleteCourse(courseId) {
  const token = localStorage.getItem("token");
  console.log(token);

  const res = await fetch(`http://localhost:1337/api/courses/${courseId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to delete course");
  }

  return { success: true, message: "Course deleted successfully" };
}
