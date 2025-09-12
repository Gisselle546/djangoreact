"use client";
import { useState, useEffect } from "react";
import { getSessionValue, setSessionValue } from "./storage";

export function useSessionStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(
    () => getSessionValue<T>(key, fallback) as T
  );
  useEffect(() => {
    setSessionValue(key, value);
  }, [key, value]);
  return [value, setValue] as const;
}
