"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  filterMethod,
  filterMethodPlayer,
  filterPlayer,
  filterValue,
} from "@/redux/reducer/filterSlice";
import Image from "next/image";
import first from "../assets/images/messi-1-min.jpg";
import second from "../assets/images/NikeMercurialDream.png";
import third from "../assets/images/M181.jpeg";
import Banner from "@/Components/Banner/Banner";

const banner_image_data = [
  {
    name: "X SPEEDPORTAL MESSI FG",
    heading: "Gets the new messi kicks",
    image: first,
    url: "/products/LIKCOJV8",
  },
  {
    name: "NIKE MERCURIAL DREAM SPEED 6 ",
    heading: "get the new ronaldo",
    image: second,
    url: "/products/EULFTKOU",
  },
  {
    name: "FUTURE ULTIMATE CREATIVITY FG/AG",
    heading: "Go crazy with Neymars creativity",
    image: third,
    url: "/products/SHPZ0Y7G",
  },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(filterValue);
  const player = useAppSelector(filterPlayer);

  useEffect(() => {
    dispatch(
      filterMethod({
        filter_type: "products",
        team_type: "tag",
        club: "Best Seller",
      })
    );
    dispatch(
      filterMethodPlayer({
        filter_type: "products",
        team_type: "playerjersey",
        club: "true",
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("value", value);
  console.log("player", player);

  return (
    <>
      <section className="section-y ">
        <div className="page-container">
          <Banner data={banner_image_data} />
        </div>
      </section>
      <section className="section-y">
        <div className="page-container">
          <h2 className="font-head font-bold tracking-tight text-2xl md:text-3xl text-slate-900">
            Best Sellers
          </h2>
        </div>
      </section>
    </>
  );
}
