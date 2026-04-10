export const fetchTeams = async () => {
  const res = await fetch("/api/teams");

  if (!res.ok) throw new Error("Failed to fetch teams");

  return res.json();
};
