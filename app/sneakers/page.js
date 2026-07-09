export const metadata = {
  title: 'Sneakers | STREET UP',
  description: 'Notre sélection de sneakers.',
};

export default function SneakersPage() {
  return (
    <section className="latest-drops-section" style={{ minHeight: '60vh' }}>
      <div className="section-header">
        <h1 className="section-title">Sneakers</h1>
      </div>
      <div className="drops-grid">
        {/* Les produits seront ajoutés ici */}
      </div>
    </section>
  );
}
