import Image from "next/image";
import { getProducts } from "@/lib/queries";

function formatPrice(price) {
  return price.toLocaleString("fr-FR") + " FCFA";
}

export const metadata = {
  title: "Accessoires | STREET UP",
  description: "Accessoires streetwear.",
};

export default async function AccessoiresPage() {
  const products = await getProducts({ category: "accessoires" });

  return (
    <section className="latest-drops-section" style={{ minHeight: "60vh" }}>
      <div className="section-header">
        <h1 className="section-title">Accessoires</h1>
      </div>
      <div className="drops-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <Image
                src={product.image}
                alt={product.name}
                className="product-image"
                width={300}
                height={400}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">
                {product.oldPrice && (
                  <span className="old-price">{formatPrice(product.oldPrice)}</span>
                )}
                <span className="current-price">{formatPrice(product.price)}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
