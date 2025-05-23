import { convertTime } from "@/utils/time";
import Wrapper from "@/components/wrapper";
import { IBlog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default async function Page({params}: {params: Promise< { id: string} >}){
    const id = (await params).id;
    const res = await fetch(`https://buffbasket-us.backendless.app/api/data/Blogs/${id}?loadRelations=author`);
    const blog: IBlog = await res.json();

    console.log(id)

    return(
        <Wrapper>
            <div className="flex mt-6 gap-2 w-full">

                <div className="flex-2/3 box-content md:mt-8 pr-36 max-lg:pr-0">
                    <div className="text-sm font-bold text-green-700 uppercase">
                        {blog.category}
                    </div>
                    <div className="text-3xl max-md:text-2xl font-bold my-4">
                        {blog.title}
                    </div>
                    <div className="flex gap-2 text-[12px] capitalize">
                        <span className="font-bold">{blog.author.name}</span>
                        <span>.</span>
                        <span className="font-light">{convertTime (blog.created)}</span>
                    </div>

                    <div className="mt-5">
                        {/* <div className="sticky top-[100px]"> */}
                            <div className="text-sm flex items-center gap-1 text-red-500">
                                <IoArrowBack />
                                <Link href="/" className="uppercase font-bold text-[12px]">
                                    kembali
                                </Link>
                            </div>
                        {/* </div> */}
                    </div>

                    <div className="w-full flex justify-center my-6">
                        <div className="w-full md:w-1/2 max-w-[1200px]">
                            <Image
                            src={blog.thumbnail}
                            alt={blog.title}
                            width={1200} // ganti sesuai dimensi asli gambar
                            height={675} // sesuaikan dengan rasio
                            layout="responsive"
                            className="rounded-lg object-contain"
                            priority
                            />
                        </div>
                    </div>


                    <div>
                        {/* <div>{blog.content}</div> */}
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>
                </div>

            </div>
        </Wrapper>
    )
}