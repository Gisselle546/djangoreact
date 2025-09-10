function safeParse<T>(raw: string | null, fallback?: T): T | undefined {
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getSessionValue<T>(key: string, fallback?: T): T | undefined {
  if (typeof window === "undefined") return fallback;
  return safeParse<T>(sessionStorage.getItem(key), fallback);
}

export function setSessionValue<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function removeSessionValue(key: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(key);
}

export function getLocalValue<T>(key: string, fallback?: T): T | undefined {
  if (typeof window === "undefined") return fallback;
  return safeParse<T>(localStorage.getItem(key), fallback);
}

export function setLocalValue<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalValue(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}
