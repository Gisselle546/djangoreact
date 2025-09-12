"use client";

import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { filterMethod, filterValue } from "@/redux/reducer/filterSlice";
import CardList from "@/Components/CardList/CardList";

function Players() {
  const dispatch = useAppDispatch();
  const value = useAppSelector(filterValue);

  const players = useCallback(() => {
    dispatch(filterMethod({ filter_type: "players", team_type: "", club: "" }));
  }, [dispatch]);

  useEffect(() => {
    players();
  }, [players]);

  return (
    <>
      <CardList
        data={value}
        heading={"Players"}
        subheading="Get the latest Gear from your favorite Players"
      />
    </>
  );
}

export default Players;
