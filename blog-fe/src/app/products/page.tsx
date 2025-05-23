import Link from "next/link";

export default function Page() {
  const products = ["topi", "sepatu", "baju", "celana"];

  return (
    <div className="px-28 max-sm:px-5 py-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Daftar Produk</h1>
      <div className="flex flex-col gap-3">
        {products.map((item, idx) => (
          <Link
            key={idx}
            href={`/products/${item}`}
            className="text-teal-600 hover:underline hover:text-teal-800"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
