export type ProductCategory = "workout" | "nutrition" | "ebook";
export type ProductGoal = "Cut" | "Maintain" | "Bulk" | "Strength";
export type EbookFormat = "Guide" | "Ebook" | "Checklist" | "Planner";
export type EbookTopic = "Training" | "Nutrition" | "Mindset" | "Recovery";

export type Product = {
  id: string;
  title: string;
  category: ProductCategory;
  description: string;
  price: number;
  badge: string;
  featured: boolean;
  days?: number;
  goal?: ProductGoal;
  calories?: number;
  ebookFormat?: EbookFormat;
  ebookTopic?: EbookTopic;
  downloadUrl: string;
  deliveryTag: "workout-plan" | "nutrition-plan" | "ebook";
};

export type CartItem = Product & {
  quantity: number;
};
