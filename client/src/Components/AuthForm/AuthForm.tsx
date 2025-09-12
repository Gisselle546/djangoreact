"use client";
import React from "react";
import Image from "next/image";
import background from "../../assets/images/signbackground.jpeg";
import { BsFillPersonFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  registerUser,
  loginUser,
  error as errorSelector,
} from "@/redux/reducer/userSlice";
import * as Yup from "yup";
import { useFormik } from "formik";

type Props = {
  type: "Sign In" | "Register";
};

export default function AuthForm({ type }: Props) {
  const isSignIn = type === "Sign In";
  const ctaAlt = isSignIn ? "Register" : "Sign in";
  const link = isSignIn ? "/signup" : "/signin";

  const router = useRouter();
  const dispatch = useAppDispatch();
  const errorValue = useAppSelector(errorSelector);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const thunk: any = isSignIn ? loginUser(values) : registerUser(values);
      await dispatch(thunk);

      router.back();
      setTimeout(() => window.location.reload(), 1000);
    },
  });

  return (
    <div className="relative min-h-[100svh]">
      {/* Background layer */}
      <Image src={background} alt="" fill priority className="object-cover" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"
        aria-hidden
      />

      <div className="relative flex min-h-[100svh] items-center justify-center px-4 sm:px-6 lg:px-8">
        <form onSubmit={formik.handleSubmit} className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl bg-white/90 backdrop-blur-md shadow-xl ring-1 ring-black/5 p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6 flex items-center text-xl font-semibold text-neutral-900">
              <BsFillPersonFill className="mr-2 inline-block" size={24} />
              <span>{type}</span>
            </div>

            {errorValue ? (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {typeof errorValue === "string"
                  ? errorValue
                  : "Something went wrong. Please try again."}
              </div>
            ) : null}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-neutral-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="you@example.com"
                  aria-invalid={!!(formik.touched.email && formik.errors.email)}
                  aria-describedby={
                    formik.errors.email ? "email-error" : undefined
                  }
                  className="block w-full rounded-xl border border-neutral-300 bg-white/95 px-3 py-2 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0"
                />
                {formik.touched.email && formik.errors.email ? (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-neutral-800"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  aria-invalid={
                    !!(formik.touched.password && formik.errors.password)
                  }
                  aria-describedby={
                    formik.errors.password ? "password-error" : undefined
                  }
                  className="block w-full rounded-xl border border-neutral-300 bg-white/95 px-3 py-2 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {formik.touched.password && formik.errors.password ? (
                  <p id="password-error" className="mt-1 text-sm text-red-600">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {type}
              </button>

              <button
                type="button"
                onClick={() => router.push(link)}
                className="block w-full text-center text-sm font-medium text-emerald-700 hover:underline"
              >
                {ctaAlt} &rarr;
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-neutral-300">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}
