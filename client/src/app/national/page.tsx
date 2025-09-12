"use client";

import React, { useCallback, useEffect } from "react";
import CardList from "@/Components/CardList/CardList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { filterMethod, filterValue } from "@/redux/reducer/filterSlice";

function NationalTeam() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(filterValue);

  const fetchNational = useCallback(() => {
    dispatch(
      filterMethod({
        filter_type: "teams",
        team_type: "national",
        club: "",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    fetchNational();
  }, [fetchNational]);

  return (
    <>
      <CardList
        data={value}
        heading={"National Teams"}
        subheading="National Team's Jerseys and Gear"
      />
    </>
  );
}

export default NationalTeam;
