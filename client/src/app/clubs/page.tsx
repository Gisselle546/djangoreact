"use client";

import React, { useCallback, useEffect } from "react";
import CardList from "@/Components/CardList/CardList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { filterMethod, filterValue } from "@/redux/reducer/filterSlice";

function Clubs() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(filterValue);

  const fetchClubs = useCallback(() => {
    dispatch(
      filterMethod({ filter_type: "teams", team_type: "club", club: "" })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  return (
    <>
      <CardList
        data={value}
        heading={"Popular Clubs"}
        subheading="Get the latest Club Jerseys and Gear"
      />
    </>
  );
}

export default Clubs;
