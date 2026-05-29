import products from "@/data/products.json";
import type { Product, ProductCategory } from "@/lib/types";

export const allProducts = products as Product[];

export function getProductsByCategory(category: ProductCategory) {
  return allProducts.filter((product) => product.category === category);
}

export function getFeaturedProducts() {
  return allProducts.filter((product) => product.featured).slice(0, 3);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}
