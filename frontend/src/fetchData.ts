export async function fetchUserData(userId: string) {
  try {
    const response = await fetch(
      `http://localhost:3001/users/profile/${userId}`,
    );
    if (response.ok) {
      const data = await response.json();
      return data.user;
    }
  } catch (err) {
    console.error(err);
    console.log("Error fetching fetchUserData");
  }
}
