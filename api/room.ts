import AuthFetchJson, { AuthFetch } from "config/AuthFetch";
import type ItemData from "interface/ItemInterface";
export default class Room {
  async GetRooms() {
    const response = await AuthFetchJson({
      url: "/room",
    });

    return response;
  }

  async GetRoomById(id: string) {
    const response = await AuthFetchJson({
      url: `/room/${id}`,
    });

    return response;
  }

  async SendItem(item: ItemData) {
    const response = await AuthFetch({
      url: `/block`,
      other: {
        body: JSON.stringify(item),
        method: "post",
      },
    });
    console.log("SendItem response: ", response);
  }

  async ReplaceItem(item: ItemData) {
    const response = await AuthFetch({
      url: "/block",
      other: {
        body: JSON.stringify(item),
        method: "put",
      },
    });
    // console.log("ReplaceItem response", response);
    // let data = await response.json();
    // console.log('Replace item data: ', data)
  }
}
