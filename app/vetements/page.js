export const metadata = {
  title: 'Vêtements | STREET UP',
  description: 'Tous nos vêtements streetwear.',
};

export default function VetementsPage() {
  return (
    <section className="latest-drops-section" style={{ minHeight: '60vh' }}>
      <div className="section-header">
        <h1 className="section-title">Vêtements</h1>
      </div>
      <div className="drops-grid">
        {/* Les produits seront ajoutés ici */}
      </div>
    </section>
  );
}
