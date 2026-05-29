export type ProductCategory = "workout" | "nutrition" | "ebook";

export type Product = {
  id: string;
  title: string;
  category: ProductCategory;
  description: string;
  price: number;
  badge: string;
  featured: boolean;
  days?: number;
  goal?: "Cut" | "Maintain" | "Bulk";
  calories?: number;
  downloadUrl: string;
  deliveryTag: "workout-plan" | "nutrition-plan" | "ebook";
};

export type CartItem = Product & {
  quantity: number;
};
