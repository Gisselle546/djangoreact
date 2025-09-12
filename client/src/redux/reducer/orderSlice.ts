import { AppState } from "../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { create_order } from "../action/create_order";
import { getLocalValue, setLocalValue } from "../../utils/storage";

export interface Order {
  data: {
    payment_method: string;
    tax_price: any;
    shipping_price: any;
    total_price: any;
    shipping_address: {
      street_address: string;
      city: string;
      state: string;
      zip_code: string;
      country: string;
    };
    order_items: any;
  };
  status: "idle" | "loading" | "failed";
  error?: {} | any;
}

const initialState: Order = {
  data: {
    payment_method: "",
    tax_price: 0.0,
    shipping_price: 0.0,
    total_price: 0.0,
    shipping_address: getLocalValue("shipping_address") || {
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      country: "USA",
    },
    order_items: [],
  },
  status: "idle",
  error: null,
};

export const createOrder = createAsyncThunk(
  "action/create_order",
  async (
    {
      data,
    }: {
      data: {
        payment_method: string;
        tax_price: any;
        shipping_price: any;
        total_price: any;
        shipping_address: {
          street_address: string;
          city: string;
          state: string;
          zip_code: string;
          country: string;
        };
        order_items: any;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await create_order({ data });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    shippingdetails: (state, action) => {
      state.data.shipping_address = action.payload;
      setLocalValue("shipping_address", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;

        // Build a compact snapshot for the confirmation page
        try {
          const req = action.meta?.arg?.data;
          const payload = action.payload ?? {};

          const lastOrder = {
            id: payload?.id ?? payload?.order_id ?? String(Date.now()),
            createdAt: new Date().toISOString(),
            email: undefined, // if you have it, set here
            total: Number(req?.total_price ?? 0),
            tax: Number(req?.tax_price ?? 0),
            shipping: Number(req?.shipping_price ?? 0),
            payment: {
              brand: String(req?.payment_method ?? "card"),
              last4: undefined,
            },
            address: req?.shipping_address,
            items: Array.isArray(req?.order_items)
              ? req.order_items.map((it: any) => {
                  const pv = it?.product_variant ?? {};
                  return {
                    name: pv?.name ?? "Item",
                    sizeLabel:
                      pv?.size?.label ??
                      pv?.size?.name ??
                      pv?.size?.size ??
                      undefined,
                    quantity: Number(it?.quantity ?? 1),
                    price: Number(pv?.price ?? 0),
                    image:
                      pv?.image ??
                      pv?.images?.[0]?.url ??
                      pv?.images?.[0] ??
                      undefined,
                  };
                })
              : [],
          };

          // Persist for confirmation page
          setLocalValue("last_order", lastOrder);
        } catch {
          /* ignore */
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { shippingdetails } = orderSlice.actions;

export const error = (state: AppState) => state.order.error;
export const orderValue = (state: AppState) => state.order.data;
export const shippingValue = (state: AppState) =>
  state.order.data.shipping_address;
export default orderSlice.reducer;
