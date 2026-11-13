"use client";

import { useCallback } from "react";
import { getStation, stations } from "@/content/operations";
import { useLocalStorage } from "./use-local-storage";

export const STATION_STORAGE_KEY = "dlp-playbook:station";

/** The station this DLP operates. Persisted in the browser. */
export function useStation() {
  const [stationId, setStationId, hydrated] = useLocalStorage<string | null>(
    STATION_STORAGE_KEY,
    null,
  );
  const station = hydrated ? getStation(stationId) : undefined;
  const select = useCallback(
    (id: string | null) => setStationId(id),
    [setStationId],
  );
  return {
    station,
    stationId: hydrated ? stationId : null,
    select,
    hydrated,
    stations,
  };
}

export function isPlaceholder(value: string) {
  return value.startsWith("Add ");
}
