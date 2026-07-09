import Image from "next/image";

const products = [
  { id: 1, src: "/images/teeshirt1.png", alt: "ONSEVENNINE TEE-SHIRT", name: "ONSEVENNINE TEE-SHIRT, TAILLE XL", oldPrice: "7.000 FCFA", price: "5.000 FCFA" },
  { id: 2, src: "/images/teeshirt2.png", alt: "BABYMETAL TEE-SHIRT", name: "BABYMETAL TEE-SHIRT, TAILLE XL", oldPrice: "7.000 FCFA", price: "5.000 FCFA" },
  { id: 3, src: "/images/teeshirt3.png", alt: "SAINT TEARS TEE-SHIRT", name: "SAINT TEARS TEE-SHIRT, TAILLE L", oldPrice: "7.000 FCFA", price: "5.000 FCFA" },
  { id: 4, src: "/images/teeshirt4.png", alt: "NICOLETTO'S PASTA CO.", name: "NICOLETTO'S TEE-SHIRT, TAILLE XL", oldPrice: "7.000 FCFA", price: "5.000 FCFA" },
  { id: 5, src: "/images/teeshirt5.png", alt: "IH NOM UH NIT TEE-SHIRT", name: "IH NOM UH NIT TEE-SHIRT, TAILLE XL", oldPrice: "7.000 FCFA", price: "5.000 FCFA" },
];

export const metadata = {
  title: "Nouveautés | STREET UP",
  description: "Découvrez les derniers drops et nouveautés STREET UP.",
};

export default function NouveautesPage() {
  return (
    <section className="latest-drops-section" style={{ minHeight: "60vh" }}>
      <div className="section-header">
        <h1 className="section-title">Nouveautés</h1>
      </div>
      <div className="drops-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <Image
                src={product.src}
                alt={product.alt}
                className="product-image"
                width={300}
                height={400}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">
                <span className="old-price">{product.oldPrice}</span>
                <span className="current-price">{product.price}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
