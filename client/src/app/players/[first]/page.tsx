"use client";

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { filterPlayerQuery, filterPlayer } from "@/redux/reducer/filterSlice";
import QueryList from "@/Components/QueryList/QueryList";

export default function PlayerSearchPage() {
  const params = useParams<{ first: string }>() || { first: "" };
  const raw = params.first;
  const sp = useSearchParams();
  const firstName = decodeURIComponent(raw ?? "");
  const lastName = sp?.get("last_name") ?? "";

  const dispatch = useAppDispatch();
  const data = useAppSelector(filterPlayer);

  useEffect(() => {
    if (!firstName) return;
    dispatch(
      filterPlayerQuery({
        filter_type: "products",
        player_first_name: firstName,
        player_last_name: lastName,
      })
    );
  }, [dispatch, firstName, lastName]);

  const heading = [firstName, lastName].filter(Boolean).join(" ");

  return (
    <>
      <QueryList
        data={data}
        heading={heading}
        subheading={`${firstName} ${lastName}'s Jerseys and Gear`}
      />
    </>
  );
}
