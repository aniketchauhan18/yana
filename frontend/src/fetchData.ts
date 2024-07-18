export const BASE_URL = "https://yana-p1ew.onrender.com/api/v1";
// http://localhost:3001/api/v1   

export async function fetchUserData(userId: string) {
  try {
    if (typeof userId === "string") {
      const response = await fetch(`${BASE_URL}/users/profile/${userId}`);
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
    const response: Response = await fetch(`${BASE_URL}/vehicles`);
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
      `${BASE_URL}/vehicles/user/${userId}`,
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
    const response: Response = await fetch(`${BASE_URL}/vehicles/${vehicleId}`);
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  } catch (err) {
    console.error(err);
    console.log("Error fetching vehicle");
  }
}

export async function fetchRentedVehicles(userId: string) {
  try {
    console.log(userId);
    const response: Response = await fetch(
      `${BASE_URL}/users/rented-vehicles/${userId}`,
    );
    if (!response.ok) {
      console.log("Error fetching rented vehicles");
    }
    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (err) {
    console.log("Inside fetchData");
    console.log(err);
  }
}

export async function fetchFilteredVehicles(query: string, category: string) {
  try {
    if (query == "" && category == "") {
      console.log("hi");
      const response = await fetch(`${BASE_URL}/vehicles`);
      const data = await response.json();
      return data.data;
    }
    const newQuery = query;
    if (newQuery == "") {
      query = ".*";
    }
    const response = await fetch(`${BASE_URL}/vehicles/filter/${query}?category=${category}`);
    const data = await response.json();
    console.log(data);
    return data.data;
  } catch (err) {
    console.log("error inside filtered vehicles");
  }
}
