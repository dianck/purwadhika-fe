import Link from "next/link";

export default function Page() {
  const products = ["topi", "sepatu", "baju", "celana"];

  return (
    <div className="px-20">
      {products.map((item, idx) => {
        return (
          <div key={idx}>
            <Link href={`/products/${item}`}>{item}</Link>
          </div>
        );
      })}
    </div>
  );
}
