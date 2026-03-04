"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getFilter = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const getFilterArray = useCallback(
    (key: string): string[] => {
      const value = searchParams.get(key);
      return value ? value.split(",") : [];
    },
    [searchParams]
  );

  const setFilter = useCallback(
    (key: string, value: string | string[] | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set(key, value.join(","));
      } else {
        params.set(key, value);
      }
      router.push(pathname + "?" + params.toString(), { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return { getFilter, getFilterArray, setFilter, clearFilters, searchParams };
}
