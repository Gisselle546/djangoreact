"use client";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import React, { useState } from "react";
import {
  ButtonContainer,
  InputWrapper,
  ReviewContainer,
  ReviewHeader,
  TextArea,
} from "./ReviewForm.style";
import StarRating from "../StarRating/StarRating";
import { useAppDispatch } from "@/redux/hooks";
import { createReview } from "@/redux/reducer/filterSlice";

type Props = {
  product_id: any;
};

function ReviewForm({ product_id }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      comment: "",
      rating: rating,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Title is required!"),
      comment: Yup.string().required("Please write your review!"),
    }),
    onSubmit: async (values) => {
      dispatch(
        createReview({
          filter_type: "products",
          product_id: product_id,
          data: values,
        })
      );
      router.push(`/products/${product_id}`);
    },
  });

  const handleRatingChange = (newRating: any) => {
    setRating(newRating);
    formik.setFieldValue("rating", newRating);
  };

  return (
    <form
      style={{ border: "0", margin: "0", padding: "0" }}
      onSubmit={formik.handleSubmit}
    >
      <ReviewContainer>
        <ReviewHeader>Leave a Review</ReviewHeader>
        <InputWrapper
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter title"
        />
        Rating:{" "}
        <StarRating
          changable={true}
          ratingValue={rating}
          setRating={handleRatingChange}
        />
        <TextArea
          name="comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          rows={5}
          cols={50}
        />
        <ButtonContainer type="submit">Submit</ButtonContainer>
      </ReviewContainer>
    </form>
  );
}

export default ReviewForm;
