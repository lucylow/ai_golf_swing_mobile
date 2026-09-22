export type ProfileUnits = "imperial" | "metric";

export function nextProfileUnits(units: ProfileUnits): ProfileUnits {
  return units === "imperial" ? "metric" : "imperial";
}

export function formatProfileUnits(units: ProfileUnits) {
  return units === "imperial" ? "Imperial" : "Metric";
}

