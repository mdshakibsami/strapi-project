import Image from "next/image";
import bannerImage from "@/public/cpsCover.jpg";
import getAllCourses from "./lib/getAllCourses";

export default async function Home() {
  const coursesObject = await getAllCourses();
  const courses = coursesObject.data;

  console.log(courses);
  return (
    <main>
      <div style={{ width: "100vw", height: "450px", position: "relative" }}>
        <Image src={bannerImage} alt="cover image" fill />
      </div>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </main>
  );
}
