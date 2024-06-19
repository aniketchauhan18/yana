export async function fetchUserData(userId: string) {
  try {
    if (typeof userId === "string") {
      const response = await fetch(
        `http://localhost:3001/users/profile/${userId}`,
      );
      if (response.ok) {
        const data = await response.json();
        return data.user;
      }
    }
  } catch (err) {
    console.error(err);
    console.log("Error fetching fetchUserData");
  }
}

export async function fetchVehicles() {
  try {
    const response: Response = await fetch(`http://localhost:3001/vehicles`);
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  } catch (err) {
    console.error(err);
    console.log("Error fetching vehicles");
  }
}

export async function fetchUserVehicleData(userId: string) {
  try {
    const response: Response = await fetch(
      `http://localhost:3001/vehicles/user/${userId}`,
    );
    if (response.ok) {
      console.log("fetched user vehicle data");
    }
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.log();
  }
}

export async function fetchVehicle(vehicleId: string) {
  try {
    const response: Response = await fetch(
      `http://localhost:3001/vehicles/${vehicleId}`,
    );
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  } catch (err) {
    console.error(err);
    console.log("Error fetching vehicle");
  }
}
