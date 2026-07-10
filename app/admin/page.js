"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    oldPrice: "",
    image: "",
    sizes: [],
    category: "vetements",
    isNew: true,
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
  const categories = [
    { slug: "vetements", label: "Vêtements" },
    { slug: "sneakers", label: "Sneakers" },
    { slug: "accessoires", label: "Accessoires" },
  ];

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }, [authenticated]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError(false);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: loginPassword }),
    });
    if (res.ok) {
      sessionStorage.setItem("admin_auth", "true");
      setAuthenticated(true);
    } else {
      setLoginError(true);
    }
  }

  function toggleSize(size) {
    setForm((f) => ({
      ...f,
      sizes: f.sizes.includes(size)
        ? f.sizes.filter((s) => s !== size)
        : [...f.sizes, size],
    }));
  }

  async function uploadImage() {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setForm((f) => ({ ...f, image: data.url }));
    setUploading(false);
    setFile(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    if (file) await uploadImage();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const newProduct = await res.json();
      setProducts((prev) => [newProduct, ...prev]);
      setForm({
        name: "",
        price: "",
        oldPrice: "",
        image: "",
        sizes: [],
        category: "vetements",
        isNew: true,
      });
      setFile(null);
      setMessage({ type: "success", text: "✓ Produit ajouté avec succès !" });
    } else {
      const err = await res.json();
      setMessage({ type: "error", text: "Erreur : " + (err.error || "inconnue") });
    }
    setSaving(false);
  }

  async function deleteProduct(id) {
    if (!confirm("Supprimer ce produit ?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  if (!authenticated) {
    return (
      <div style={{ maxWidth: 400, margin: "80px auto", padding: "32px 16px", textAlign: "center" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
          STREET UP
        </h1>
        <p style={{ fontSize: 13, color: "#71717a", marginBottom: 24 }}>
          Administration
        </p>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Mot de passe"
            autoFocus
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: 14,
              border: "1px solid",
              borderColor: loginError ? "#dc2626" : "#d4d4d8",
              backgroundColor: "#fff",
              color: "#000",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {loginError && (
            <p style={{ fontSize: 12, color: "#dc2626", textAlign: "left" }}>
              Mot de passe incorrect
            </p>
          )}
          <button type="submit" style={{
            padding: "12px 24px",
            fontSize: 13,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            backgroundColor: "#000",
            color: "#fff",
            border: "1px solid #000",
            cursor: "pointer",
          }}>
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Administration
        </h1>
        <button onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthenticated(false); }} style={{
          background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#71717a", textDecoration: "underline",
        }}>
          Déconnexion
        </button>
      </div>

      {message && (
        <p style={{
          padding: "12px 16px", marginBottom: 24, fontSize: 14,
          backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
          color: message.type === "success" ? "#155724" : "#721c24",
          border: "1px solid",
          borderColor: message.type === "success" ? "#c3e6cb" : "#f5c6cb",
        }}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>Nom du produit</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="ex: MON TEE-SHIRT, TAILLE M" />
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>Prix (FCFA)</label>
            <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} style={inputStyle} placeholder="5000" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>Ancien prix (optionnel)</label>
            <input type="number" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} style={inputStyle} placeholder="7000" />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>Image</label>
          {form.image && (
            <div style={{ marginBottom: 8 }}>
              <img src={form.image} alt="" style={{ width: 80, height: 80, objectFit: "cover", border: "1px solid #e4e4e7" }} />
            </div>
          )}
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} style={inputStyle} />
          <p style={{ fontSize: 11, color: "#71717a", marginTop: 4 }}>ou entre une URL :</p>
          <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} style={inputStyle} placeholder="https://exemple.com/image.png" />
        </div>

        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>Tailles disponibles</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {sizeOptions.map((size) => (
              <button key={size} type="button" onClick={() => toggleSize(size)} style={{
                padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer",
                border: "2px solid",
                borderColor: form.sizes.includes(size) ? "#000" : "#d4d4d8",
                backgroundColor: form.sizes.includes(size) ? "#000" : "#fff",
                color: form.sizes.includes(size) ? "#fff" : "#000",
              }}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>Catégorie</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle}>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>Nouveauté</label>
            <select value={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.value === "true" })} style={inputStyle}>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>
          <button type="submit" disabled={saving || uploading} style={{
            padding: "12px 32px", fontSize: 13, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.08em", backgroundColor: "#000", color: "#fff",
            border: "1px solid #000", cursor: "pointer", whiteSpace: "nowrap",
          }}>
            {saving || uploading ? "..." : "Ajouter"}
          </button>
        </div>
      </form>

      <h2 style={{ fontSize: 18, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>
        Produits ({products.length})
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {products.map((product) => (
          <div key={product.id} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "8px 12px", border: "1px solid #e4e4e7", fontSize: 13,
          }}>
            <img src={product.image} alt="" style={{ width: 48, height: 48, objectFit: "cover", backgroundColor: "#f4f4f5" }} />
            <div style={{ flex: 1 }}>
              <strong>{product.name}</strong>
              <span style={{ color: "#71717a", marginLeft: 8 }}>
                {product.price.toLocaleString("fr-FR")} FCFA
              </span>
              <span style={{ color: "#71717a", marginLeft: 8, fontSize: 11 }}>
                ({product.categoryName})
              </span>
            </div>
            <button onClick={() => deleteProduct(product.id)} style={{
              background: "none", border: "none", cursor: "pointer", color: "#dc2626", fontSize: 18,
            }} title="Supprimer">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  fontSize: 14,
  border: "1px solid #d4d4d8",
  backgroundColor: "#fff",
  color: "#000",
  outline: "none",
  boxSizing: "border-box",
};
