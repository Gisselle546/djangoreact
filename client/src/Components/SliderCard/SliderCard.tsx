"use client";
import React from "react";
import { useRouter } from "next/navigation";

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
    /*     <SliderContainer onClick={() => handleClick()}>
      <ImageContainer img={primary_image || image_url} />
      <Heading>
        {name
          ? name.length > 41
            ? name.substring(0, 40)
            : name
          : `${first_name} ${last_name}`}
      </Heading>
      <ButtonContainer>Details</ButtonContainer>
    </SliderContainer> */

    <article
      key={product_id}
      className="snap-start min-w-[16rem] sm:min-w-[20rem] md:min-w-[24rem] cursor-pointer"
      onClick={() => handleClick()}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200">
        <img
          src={primary_image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3 text-white drop-shadow">
          <h3 className="text-lg font-semibold">{name}</h3>
          {/*           <p className="text-sm opacity-90">
            {" "}
            {name
              ? name.length > 41
                ? name.substring(0, 40)
                : name
              : `${first_name} ${last_name}`}
          </p> */}
        </div>
      </div>
    </article>
  );
}

export default SliderCard;
