"use client";

import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { filterMethod, filterValue } from "@/redux/reducer/filterSlice";
import QueryList from "@/Components/QueryList/QueryList";

function Footwear() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(filterValue);

  const footwear = useCallback(() => {
    dispatch(
      filterMethod({
        filter_type: "products",
        team_type: "tag",
        club: "Footwear",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    footwear();
  }, [footwear]);

  return (
    <>
      <QueryList
        data={value}
        heading={"Footwear"}
        subheading="Get the latest Footwear"
      />
    </>
  );
}

export default Footwear;
