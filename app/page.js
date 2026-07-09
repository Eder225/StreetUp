import Image from "next/image";
import Link from "next/link";

const products = [
  { id: 1, src: "/images/teeshirt1.png", alt: "ONSEVENNINE TEE-SHIRT", name: "ONSEVENNINE TEE-SHIRT, TAILLE XL", oldPrice: "7.000 FCFA", price: "5.000 FCFA" },
  { id: 2, src: "/images/teeshirt2.png", alt: "BABYMETAL TEE-SHIRT", name: "BABYMETAL TEE-SHIRT, TAILLE XL", oldPrice: "7.000 FCFA", price: "5.000 FCFA" },
  { id: 3, src: "/images/teeshirt3.png", alt: "SAINT TEARS TEE-SHIRT", name: "SAINT TEARS TEE-SHIRT, TAILLE L", oldPrice: "7.000 FCFA", price: "5.000 FCFA" },
  { id: 4, src: "/images/teeshirt4.png", alt: "NICOLETTO'S PASTA CO.", name: "NICOLETTO'S PASTA CO. TEE-SHIRT, TAILLE XL", oldPrice: "7.000 FCFA", price: "5.000 FCFA" },
  { id: 5, src: "/images/teeshirt5.png", alt: "IH NOM UH NIT TEE-SHIRT", name: "IH NOM UH NIT TEE-SHIRT, TAILLE XL", oldPrice: "7.000 FCFA", price: "5.000 FCFA" },
];

const categories = [
  { id: 1, src: "/images/teeshirts-category.png", alt: "Tee-shirts", code: "[ 01 ]", name: "TEE-SHIRTS", href: "/vetements" },
  { id: 2, src: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800", alt: "Hoodies & Sweats", code: "[ 02 ]", name: "HOODIES & SWEATS", href: "/vetements" },
  { id: 3, src: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80", alt: "Pantalons & Cargos", code: "[ 03 ]", name: "PANTALONS & CARGOS", href: "/vetements" },
  { id: 4, src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800", alt: "Sneakers", code: "[ 04 ]", name: "SNEAKERS", href: "/sneakers" },
  { id: 5, src: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800", alt: "Accessoires", code: "[ 05 ]", name: "ACCESSOIRES", href: "/accessoires" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-image-container">
          <Image
            src="/images/hero.png"
            alt="hero-img"
            className="hero-img"
            fill
            style={{ objectFit: "cover", objectPosition: "60% center" }}
            priority
          />
        </div>
        <div className="hero-content">
          <p className="hero-subtitle">NOUVEAU DROP CHAQUE MOIS</p>
          <h1 className="hero-title">Redéfinis ton style.</h1>
          <Link href="/nouveautes" className="hero-cta">
            Découvrir les Nouveautés
          </Link>
        </div>
      </section>

      {/* Derniers Drops */}
      <section className="latest-drops-section">
        <div className="section-header">
          <h2 className="section-title">Derniers drops</h2>
          <Link href="/nouveautes" className="section-link">Voir plus →</Link>
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

      {/* Catégories */}
      <section className="categories-section">
        <div className="categories-header">
          <h2 className="categories-main-title">Catégories</h2>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link key={cat.id} href={cat.href} className="category-card">
              <div className="category-image-wrapper">
                <Image
                  src={cat.src}
                  alt={cat.alt}
                  className="category-image"
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized={cat.src.startsWith("https://")}
                />
              </div>
              <div className="category-meta">
                <span className="category-code">{cat.code}</span>
                <h3 className="category-name">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <p className="newsletter-tag">Restez connecté</p>
          <h2 className="newsletter-title">Ne rate aucun drop.</h2>
          <p className="newsletter-description">
            Inscris-toi et reçois en avant-première nos nouveautés, offres
            exclusives et accès anticipés aux prochains lancements.
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              className="newsletter-input"
              placeholder="Ton adresse email"
              required
            />
            <button type="submit" className="newsletter-submit">
              S&apos;inscrire
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
