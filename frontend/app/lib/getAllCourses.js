export default async function getAllCourses() {
  const result = await fetch(
    "http://127.0.0.1:1337/api/courses?populate=modules"
  );

  if (!result.ok) {
    throw new Error("There was an error fetching courses");
  }

  return result.json();
}
