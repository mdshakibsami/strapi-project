import Image from "next/image";
import bannerImage from "@/public/cpsCover.jpg";
import getAllCourses from "./lib/getAllCourses";

export default async function Home() {
  return (
    <main>
      <div style={{ width: "100vw", height: "450px", position: "relative" }}>
        <Image src={bannerImage} alt="cover image" fill />
      </div>
    </main>
  );
}
