import { NextResponse } from "next/server";
import { getProduct, deleteProduct } from "@/lib/queries";

export async function GET(request, { params }) {
  const { id } = await params;
  const product = await getProduct(parseInt(id));

  if (!product) {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  await deleteProduct(parseInt(id));
  return NextResponse.json({ success: true });
}
