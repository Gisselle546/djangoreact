import { useState, useEffect } from "react";

export function getStorageValue(key: string, defaultValue?: any) {
  // getting stored value
  if (typeof window !== 'undefined') {
const saved = JSON.parse(sessionStorage.getItem(key)!)
return saved || defaultValue;
  }
}

export function setStorageValue(key: string, defaultValue: any) {
    // getting stored value
    if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(defaultValue));
 
    }
  }

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
// storing input name
    sessionStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

export function deleteStorageValue(key?: string, defaultValue?: any){
  if (typeof window !== 'undefined') {
    sessionStorage.clear();
  }
}

export function getStorageLocal(key: string, defaultValue?: any) {
  // getting stored value
  if (typeof window !== 'undefined') {
const saved = JSON.parse(localStorage.getItem(key)!)
return saved || defaultValue;
  }
}

export function setStorageLocal(key: string, defaultValue: any) {
    // getting stored value
    if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(defaultValue));
 
    }
}