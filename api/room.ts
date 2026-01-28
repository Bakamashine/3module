import AuthFetchJson from "config/AuthFetch";
export default class Room {
  async GetRooms() {
    const response = await AuthFetchJson({
      url: "/room",
    });

    return response;
  }
}
