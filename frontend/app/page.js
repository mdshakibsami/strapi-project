import Image from "next/image";
// import bannerImage from "@/public/cpsCover.jpg";
import bannerImage from "@/public/covertest.jpg";
// import getAllCourses from "./lib/getAllCourses";

export default async function Home() {
  // const coursesObject = await getAllCourses();
  // const courses = coursesObject.data;

  return (
    <main>
      <div style={{ width: "100vw", height: "450px", position: "relative" }}>
        <Image src={bannerImage} alt="cover image" fill />
      </div>
    </main>
  );
}
