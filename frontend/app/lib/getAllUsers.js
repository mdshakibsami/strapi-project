export default async function getAllUsers() {
  const result = await fetch("GET http://localhost:1337/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.ok) {
    throw new Error("There was an error fetching courses");
  }
  return result.json();
}
