import BlogCard from "@/components/blog/card";
import Wrapper from "@/components/wrapper";
import { IBlog } from "@/types/blog";


import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "Home Page",
}

export default async function Home() {
  const res = await fetch("https://buffbasket-us.backendless.app/api/data/Blogs?loadRelations=author");
  const data: IBlog[] = await res.json();
  console.log(data);

  return (
    <Wrapper>
      <div className="py-4 sm:py-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-300 md:my-2 text-shadow">
          Artikel <span className="text-green-700">Terkini</span>
        </h2>
        {/* <div className="hidden md:block bg-red-500 text-white p-2">
          Ini hanya muncul di desktop
        </div> */}
        <div className="grid w-full sm:py-4 sm:gap-2 md:gap-10 grid-cols-1 xl:grid-cols-7 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
          {data.map((blog, idx) => {
            return <BlogCard blog={blog} key={idx} />;
          })}
        </div>
      </div>
    </Wrapper>  
  );
}
