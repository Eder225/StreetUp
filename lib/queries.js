import { db } from "@/lib/db";

export async function getProducts({ category, isNew, limit } = {}) {
  let sql = `SELECT p.*, c.name as categoryName, c.slug as categorySlug
    FROM Product p JOIN Category c ON p.categoryId = c.id`;
  const conditions = [];
  const args = {};

  if (category) {
    conditions.push("c.slug = $category");
    args.category = category;
  }
  if (isNew === true) {
    conditions.push("p.isNew = 1");
  }
  if (isNew === false) {
    conditions.push("p.isNew = 0");
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  sql += " ORDER BY p.createdAt DESC";

  if (limit) {
    sql += " LIMIT $limit";
    args.limit = limit;
  }

  const result = await db.execute({ sql, args });
  return result.rows;
}

export async function getProduct(id) {
  const result = await db.execute({
    sql: `SELECT p.*, c.name as categoryName, c.slug as categorySlug
      FROM Product p JOIN Category c ON p.categoryId = c.id
      WHERE p.id = $id`,
    args: { id },
  });
  return result.rows[0] || null;
}

export async function createProduct(data) {
  const result = await db.execute({
    sql: `INSERT INTO Product (name, price, oldPrice, image, sizes, isNew, categoryId)
      VALUES ($name, $price, $oldPrice, $image, $sizes, $isNew, $categoryId)`,
    args: {
      name: data.name,
      price: data.price,
      oldPrice: data.oldPrice ?? null,
      image: data.image,
      sizes: JSON.stringify(data.sizes ?? []),
      isNew: data.isNew ?? true,
      categoryId: data.categoryId,
    },
  });
  return getProduct(Number(result.lastInsertRowid));
}

export async function deleteProduct(id) {
  await db.execute({ sql: "DELETE FROM Product WHERE id = $id", args: { id } });
}

export async function getCategoryBySlug(slug) {
  const result = await db.execute({
    sql: "SELECT * FROM Category WHERE slug = $slug",
    args: { slug },
  });
  return result.rows[0] || null;
}

export async function getAllCategories() {
  const result = await db.execute("SELECT * FROM Category ORDER BY id");
  return result.rows;
}
