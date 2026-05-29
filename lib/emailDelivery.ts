import type { CartItem } from "@/lib/types";

export function buildDeliveryEmail(items: CartItem[]) {
  return {
    subject: "Je TrophyGains downloads staan klaar",
    downloadLinks: items.map((item) => ({
      productId: item.id,
      title: item.title,
      url: item.downloadUrl,
      tag: item.deliveryTag,
    })),
  };
}
