import { NextResponse } from "next/server";
import { getProducts, createProduct, getCategoryBySlug } from "@/lib/queries";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const isNew = searchParams.get("isNew");

  const products = await getProducts({
    category,
    isNew: isNew === "true" ? true : isNew === "false" ? false : undefined,
  });

  return NextResponse.json(products);
}

export async function POST(request) {
  const body = await request.json();

  const category = await getCategoryBySlug(body.category);
  if (!category) {
    return NextResponse.json({ error: "Catégorie introuvable" }, { status: 400 });
  }

  const product = await createProduct({
    name: body.name,
    price: parseFloat(body.price),
    oldPrice: body.oldPrice ? parseFloat(body.oldPrice) : null,
    image: body.image,
    sizes: body.sizes ?? [],
    isNew: body.isNew ?? true,
    categoryId: category.id,
  });

  return NextResponse.json(product, { status: 201 });
}
