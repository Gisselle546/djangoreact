"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Search, filterSearch } from "@/redux/reducer/filterSlice";
import QueryList from "@/Components/QueryList/QueryList";

export default function SearchAppPage() {
  const params = useParams<{ name?: string[] }>();
  const q = useMemo(
    () => (params?.name ?? []).map((s) => decodeURIComponent(s)).join(" "),
    [params?.name]
  );

  const dispatch = useAppDispatch();
  const data = useAppSelector(filterSearch);

  useEffect(() => {
    if (q) dispatch(Search({ searchterm: q }));
  }, [dispatch, q]);

  const heading =
    data?.length === 0 ? `No results for "${q}"` : `Results for "${q}"`;

  return <QueryList key={heading} data={data} heading={heading || "Search"} />;
}
