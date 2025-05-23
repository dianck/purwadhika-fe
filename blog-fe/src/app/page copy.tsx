import Wrapper from "@/components/wrapper";
import { IBlog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";



export default async function Home() {
  const res = await fetch("https://buffbasket-us.backendless.app/api/data/Blogs?loadRelations=author");
  const data: IBlog[] = await res.json();
  console.log(data);

  return (
    <Wrapper>
    {/* <div className="px-10 pt-[80px] bg-white grid w-full p-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-2.5"> */}
    <div className="py-4 sm:py-8">  
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-300 md:my-2 text-shadow">
          Artikel <span className="text-green-700">Terkini</span>
        </h2>        
        {
          data.map((item, idx) => {
            return(
              <div key={idx} className="flex flex-col gap-2">
                  <div className="h-[200px] w-full relative overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      priority
                      className="object-fill hover:scale-110 transition duration-300"
                    />
                  </div>
                  <h2 className="text-teal-600 text-md font-bold line-clamp-2">{item.title}</h2>

                  <div className="flex gap-2 mt-4">
                    <div className="w-10 h-10 rounded-full relative ">
                      <Image 
                        className="rounded-full object-cover"
                        src={
                          "https://media.istockphoto.com/id/1495088043/id/vektor/ikon-profil-pengguna-avatar-atau-ikon-orang-gambar-profil-simbol-potret-gambar-potret.jpg?s=612x612&w=0&k=20&c=vMnxIgiQh5EFyQrFGGNKtbb6tuGCT04L58nwwEGzIbc="
                        }
                        alt={item.author.name}
                        fill
                        priority
                        // width={40}
                        // height={40}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm">{item.author.name}</p>
                      <p className="text-gray-600 text-sm">{item.author.email}</p>
                    </div>
                  </div>

                  <div>
                    <Link href={`/blog/${item.objectId}`} className={`text-white bg-teal-600 inline-flex items-center px-3 py-1 text-sm rounded-xl hover:bg-teal-700 transition duration-300 ${item.objectId}`}>
                        Read more
                    </Link>
                    {/* <p className="text-gray-600 text-sm line-clamp-2">{item.content}</p>
                    <p className="text-gray-600 text-sm">{item.category}</p> */}
                  </div>
              </div>

            )
          })
        }
    </div>
    </Wrapper>
  );
}
