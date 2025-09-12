"use client";

import React, { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { filterMethod, filterValue } from "@/redux/reducer/filterSlice";
import QueryList from "@/Components/QueryList/QueryList";

function NationalQuery() {
  const params = useParams<{ country: string }>() || { country: "" };
  const country = decodeURIComponent(params.country ?? "");
  const dispatch = useAppDispatch();
  const data = useAppSelector(filterValue);

  useEffect(() => {
    if (!country) return;
    // Your backend filters products by team/country via ?q=
    dispatch(
      filterMethod({ filter_type: "products", team_type: "q", club: country })
    );
  }, [dispatch, country]);

  return (
    <>
      <QueryList
        data={data}
        heading={`${country}`}
        subheading={`${country}'s Jerseys and Gear`}
      />
    </>
  );
}

export default NationalQuery;
