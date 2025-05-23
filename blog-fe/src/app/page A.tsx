import BlogCard from "@/components/blog/card";
import Wrapper from "@/components/wrapper";
import { IBlog } from "@/types/blog";

export default async function Home() {
  const res = await fetch(
    "https://saucysmile-us.backendless.app/api/data/Blogs?loadRelations=author"
  );
  const data: IBlog[] = await res.json();

  return (
    <Wrapper>
    {/* <div className="px-10 pt-[80px] bg-white grid w-full p-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-2.5"> */}

      <div className="py-4 pt-[80px] sm:py-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-300 md:my-2 text-shadow">
          Artikel <span className="text-green-700">Terkini</span>
        </h2>
        <div className="grid w-full sm:py-4 sm:gap-2 md:gap-10 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
          {data.map((blog, idx) => {
            return <BlogCard blog={blog} key={idx} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
}