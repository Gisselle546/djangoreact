// src/redux/reducer/orderSlice.ts
import { AppState } from "../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { create_order } from "../action/create_order";
import { getLocalValue, setLocalValue } from "../../utils/storage";

/** ---------- Types ---------- */
export type ShippingAddress = {
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
};

type SizeLike =
  | { label?: string; name?: string; size?: string }
  | string
  | undefined;

export type ProductVariantLike = {
  id?: string | number;
  name?: string;
  price?: number | string;
  size?: SizeLike;
  image?: string;
  images?: Array<{ url?: string } | string>;
};

export type OrderItemPayload = {
  product_variant: ProductVariantLike;
  quantity: number;
};

export type OrderPayloadData = {
  payment_method: string;
  tax_price: number | string;
  shipping_price: number | string;
  total_price: number | string;
  shipping_address: ShippingAddress;
  order_items: OrderItemPayload[];
};

export interface OrderState {
  data: OrderPayloadData;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

/** ---------- Helpers ---------- */
function safeLoadShipping(): ShippingAddress {
  const fallback: ShippingAddress = {
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "USA",
  };
  try {
    const raw = getLocalValue("shipping_address");
    if (!raw || typeof raw !== "object") return fallback;
    const s = raw as Partial<ShippingAddress>;
    return {
      street_address: s.street_address ?? "",
      city: s.city ?? "",
      state: s.state ?? "",
      zip_code: s.zip_code ?? "",
      country: s.country ?? "USA",
    };
  } catch {
    return fallback;
  }
}

const getErrMsg = (err: unknown): string => {
  const anyErr = err as any;
  const d = anyErr?.response?.data;
  if (typeof d === "string") return d;
  if (d?.detail) return d.detail as string;
  try {
    return d ? JSON.stringify(d) : anyErr?.message ?? "Request failed";
  } catch {
    return anyErr?.message ?? "Request failed";
  }
};

/** ---------- Initial State ---------- */
const initialState: OrderState = {
  data: {
    payment_method: "",
    tax_price: 0.0,
    shipping_price: 0.0,
    total_price: 0.0,
    shipping_address: safeLoadShipping(),
    order_items: [],
  },
  status: "idle",
  error: null,
};

/** ---------- Thunk ---------- */
export const createOrder = createAsyncThunk<
  // Return type from API (unknown shape is OK)
  unknown,
  // Arg type
  { data: OrderPayloadData },
  // Rejection type
  { rejectValue: string }
>("action/create_order", async ({ data }, { rejectWithValue }) => {
  try {
    const response = await create_order({ data });
    return response.data as unknown;
  } catch (error) {
    return rejectWithValue(getErrMsg(error));
  }
});

/** ---------- Slice ---------- */
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    shippingdetails: (state, action: { payload: ShippingAddress }) => {
      state.data.shipping_address = action.payload;
      setLocalValue("shipping_address", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "idle";

        // Keep the canonical data we POSTed (known shape)
        const req = (action.meta?.arg as { data: OrderPayloadData })?.data;
        if (req) state.data = req;

        // Build + persist a compact snapshot for OrderConfirmation
        try {
          const resp: any = action.payload ?? {};
          const id: string = (resp?.id ??
            resp?.order_id ??
            String(Date.now())) as string;

          const items = Array.isArray(req?.order_items) ? req!.order_items : [];

          const normalizedItems = items.map((it) => {
            const pv = it.product_variant;
            const firstImg =
              pv?.image ??
              (Array.isArray(pv?.images)
                ? typeof pv.images[0] === "string"
                  ? (pv.images[0] as string)
                  : (pv.images[0] as { url?: string })?.url
                : undefined);

            const size =
              typeof pv?.size === "string"
                ? pv.size
                : pv?.size?.label ?? pv?.size?.name ?? pv?.size?.size;

            return {
              name: pv?.name ?? "Item",
              image: firstImg,
              quantity: it.quantity,
              total: Number(pv?.price ?? 0) * Number(it.quantity ?? 1),
              meta: {
                size,
                sku: pv?.id ? String(pv.id) : undefined,
              },
            };
          });

          const lastOrder = {
            id,
            createdAt: new Date().toISOString(),
            email: undefined as string | undefined, // set if you have it
            total: Number(req?.total_price ?? 0),
            tax: Number(req?.tax_price ?? 0),
            shipping: Number(req?.shipping_price ?? 0),
            payment: {
              brand: String(req?.payment_method ?? "card"),
              last4: undefined as string | undefined,
            },
            address: req?.shipping_address,
            items: normalizedItems,
          };

          setLocalValue("last_order", lastOrder);
        } catch {
          // ignore snapshot failures
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Order creation failed";
      });
  },
});

/** ---------- Exports ---------- */
export const { shippingdetails } = orderSlice.actions;

export const orderError = (state: AppState) => state.order.error;
export const orderValue = (state: AppState) => state.order.data;
export const shippingValue = (state: AppState) =>
  state.order.data.shipping_address;

export default orderSlice.reducer;
