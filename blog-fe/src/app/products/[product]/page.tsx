
export default async function Page({params}: { params: Promise<{product: string}> }) {
    const { product } = await params;

    return (
        <div className="px-10 pt-[80px] bg-white">
            <h2 className="text-3xl font-bold text-black">Page Produk {product}</h2>
        </div>
    );
  }
  