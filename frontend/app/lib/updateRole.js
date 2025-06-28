export default async function updateRole(id, role) {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  console.log("Updating user", id, "to role", role);

  try {
    const result = await fetch(`http://localhost:1337/api/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
      }),
    });

    if (!result.ok) {
      const error = await result.text();
      console.error("Failed to update user:", error);
      console.error("Status:", result.status);
      console.error("Status Text:", result.statusText);
      throw new Error(
        `Failed to update user role: ${result.status} ${result.statusText}`
      );
    }

    const responseData = await result.json();
    console.log("Update successful:", responseData);
    return responseData;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
}
