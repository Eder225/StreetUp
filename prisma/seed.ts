import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client.ts";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  }),
});

const categories = [
  { name: "Vêtements", slug: "vetements" },
  { name: "Sneakers", slug: "sneakers" },
  { name: "Accessoires", slug: "accessoires" },
];

const products = [
  {
    name: "ONSEVENNINE TEE-SHIRT, TAILLE XL",
    price: 5000,
    oldPrice: 7000,
    image: "/images/teeshirt1.png",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    isNew: true,
    categorySlug: "vetements",
  },
  {
    name: "BABYMETAL TEE-SHIRT, TAILLE XL",
    price: 5000,
    oldPrice: 7000,
    image: "/images/teeshirt2.png",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    isNew: true,
    categorySlug: "vetements",
  },
  {
    name: "SAINT TEARS TEE-SHIRT, TAILLE L",
    price: 5000,
    oldPrice: 7000,
    image: "/images/teeshirt3.png",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    isNew: true,
    categorySlug: "vetements",
  },
  {
    name: "NICOLETTO'S PASTA CO. TEE-SHIRT, TAILLE XL",
    price: 5000,
    oldPrice: 7000,
    image: "/images/teeshirt4.png",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    isNew: true,
    categorySlug: "vetements",
  },
  {
    name: "IH NOM UH NIT TEE-SHIRT, TAILLE XL",
    price: 5000,
    oldPrice: 7000,
    image: "/images/teeshirt5.png",
    sizes: JSON.stringify(["S", "M", "L", "XL"]),
    isNew: true,
    categorySlug: "vetements",
  },
];

async function main() {
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  for (const product of products) {
    const { categorySlug, ...data } = product;
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });
    if (category) {
      await prisma.product.create({
        data: { ...data, categoryId: category.id },
      });
    }
  }

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
