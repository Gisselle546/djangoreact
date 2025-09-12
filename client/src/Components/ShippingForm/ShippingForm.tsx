"use client";

import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { shippingdetails, shippingValue } from "@/redux/reducer/orderSlice";

type Props = { onShipping: () => void };

type ShippingFormValues = {
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
};

const schema = Yup.object({
  street_address: Yup.string().trim().required("Address is required"),
  city: Yup.string().trim().required("City is required"),
  state: Yup.string().trim().required("State is required"),
  zip_code: Yup.string()
    .trim()

    .matches(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code")
    .required("ZIP code is required"),
  country: Yup.string().required(),
});

function safeLoad(): Partial<ShippingFormValues> {
  try {
    const raw = localStorage.getItem("shipping_address");
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

export default function ShippingForm({ onShipping }: Props) {
  const dispatch = useAppDispatch();
  const saved = useAppSelector(shippingValue); // from Redux store

  const initialValues = useMemo<ShippingFormValues>(
    () => ({
      street_address:
        saved?.street_address ?? (safeLoad().street_address as string) ?? "",
      city: saved?.city ?? (safeLoad().city as string) ?? "",
      state: saved?.state ?? (safeLoad().state as string) ?? "",
      zip_code: saved?.zip_code ?? (safeLoad().zip_code as string) ?? "",
      country: saved?.country ?? (safeLoad().country as string) ?? "USA",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [saved] // avoid reading localStorage on every render
  );

  const formik = useFormik<ShippingFormValues>({
    initialValues,
    validationSchema: schema,
    enableReinitialize: true, // if Redux prefill arrives later
    onSubmit: (values) => {
      // Persist to Redux
      dispatch(shippingdetails(values));
      // Persist to localStorage for next time
      try {
        localStorage.setItem("shipping_address", JSON.stringify(values));
      } catch {}
      // advance the checkout step
      onShipping();
    },
  });

  const err = formik.touched;

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {/* Address */}
      <div>
        <label
          htmlFor="street_address"
          className="block text-sm font-medium text-slate-700"
        >
          Street address
        </label>
        <input
          id="street_address"
          name="street_address"
          type="text"
          autoComplete="address-line1"
          value={formik.values.street_address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
          placeholder="123 Main St, Apt 4B"
        />
        {err.street_address && formik.errors.street_address && (
          <p className="mt-1 text-xs text-red-600">
            {formik.errors.street_address}
          </p>
        )}
      </div>

      {/* City + State */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-slate-700"
          >
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="City"
          />
          {err.city && formik.errors.city && (
            <p className="mt-1 text-xs text-red-600">{formik.errors.city}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-slate-700"
          >
            State
          </label>
          <input
            id="state"
            name="state"
            type="text"
            autoComplete="address-level1"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm uppercase outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="CA"
            maxLength={2}
          />
          {err.state && formik.errors.state && (
            <p className="mt-1 text-xs text-red-600">{formik.errors.state}</p>
          )}
        </div>
      </div>

      {/* ZIP + Country */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="zip_code"
            className="block text-sm font-medium text-slate-700"
          >
            ZIP code
          </label>
          <input
            id="zip_code"
            name="zip_code"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            value={formik.values.zip_code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="94107"
          />
          {err.zip_code && formik.errors.zip_code && (
            <p className="mt-1 text-xs text-red-600">
              {formik.errors.zip_code}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-slate-700"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="USA">United States</option>
          </select>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
          className="w-full rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </form>
  );
}
