"use client";
import React from "react";
import { Router, useRouter } from "next/router";
import {
  ButtonContainer,
  ImageContainer,
  SliderContainer,
  Heading,
} from "./SliderCard.style";
import { useAppDispatch } from "@/redux/hooks";
import { filterProductMethod } from "@/redux/reducer/filterSlice";

type Props = {
  data: {
    name: string;
    primary_image: string;
    product_id: any;
    image_url: any;
    first_name: any;
    last_name: any;
  };
};

function SliderCard({ data }: Props) {
  const router = useRouter();
  const { name, primary_image, product_id, image_url, first_name, last_name } =
    data;

  const handleClick = () => {
    router.push(`/products/${product_id}`);
  };

  return (
    <SliderContainer onClick={() => handleClick()}>
      <ImageContainer img={primary_image || image_url} />
      <Heading>
        {name
          ? name.length > 41
            ? name.substring(0, 40)
            : name
          : `${first_name} ${last_name}`}
      </Heading>
      <ButtonContainer>Details</ButtonContainer>
    </SliderContainer>
  );
}

export default SliderCard;
