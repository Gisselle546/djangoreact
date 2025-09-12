"use client";

import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { filterMethod, filterValue } from "@/redux/reducer/filterSlice";
import QueryList from "@/Components/QueryList/QueryList";
import { useParams } from "next/navigation";

function ClubQuery() {
  const params = useParams<{ club: string }>();
  const raw = params?.club ?? "";
  const club = decodeURIComponent(raw);
  const dispatch = useAppDispatch();
  const data = useAppSelector(filterValue);

  useEffect(() => {
    if (!club) return;
    dispatch(filterMethod({ filter_type: "products", team_type: "q", club }));
  }, [dispatch, club]);
  return (
    <>
      <QueryList
        data={data}
        heading={`${club}`}
        subheading={`${club}'s Jerseys and Gear`}
      />
    </>
  );
}

export default ClubQuery;
