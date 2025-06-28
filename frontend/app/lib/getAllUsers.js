export default async function getAllUsers() {
  const token = localStorage.getItem("token");
  console.log("this is token",token);
  const result = await fetch("http://localhost:1337/api/users?populate=role", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.ok) {
    throw new Error("There was an error fetching users");
  }
  return result.json();
}
