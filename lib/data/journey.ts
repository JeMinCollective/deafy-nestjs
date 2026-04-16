export const fetchJourneys = async () => {
  const res = await fetch("/api/journeys");

  if (!res.ok) throw new Error("Failed to fetch journeys");

  return res.json();
};
