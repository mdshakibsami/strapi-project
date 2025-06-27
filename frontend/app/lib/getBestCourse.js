export default async function getBestCourses() {
  const result = await fetch("http://127.0.0.1:1337/api/courses?pagination[limit]=4");
  if (!result.ok) {
    throw new Error("There was an error fetching courses");
  }

  return result.json();
}
