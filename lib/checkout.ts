import type { CartItem } from "@/lib/types";

export type CheckoutPayload = {
  customerEmail: string;
  items: CartItem[];
  total: number;
};

export async function createMolliePayment(payload: CheckoutPayload) {
  return {
    provider: "mollie",
    status: "prepared",
    amount: payload.total,
    redirectUrl: "/checkout?status=placeholder",
    note: "Plaats hier later de Mollie Payments API call met order metadata.",
  };
}
