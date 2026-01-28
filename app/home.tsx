import React, { useEffect } from "react";
import Room from "api/room";
import * as IRoom from "interface/RoomInterface";
import Reload from "components/Reload";

export default function Home() {
  const [room, setRoom] = React.useState<IRoom.default[]>();
  const [loading, setLoading] = React.useState(true);

  async function GetRooms() {
    try {
      const room = new Room();
      let receivedRooms = await room.GetRooms();
      if (receivedRooms) setRoom(receivedRooms.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetRooms();
  }, []);

  if (loading) {
    return <Reload />;
  }

  return (
    <>
      {room && room.length > 0 ? (
        <nav>
          <ol>
            {room.map((item) => (
              <li key={item.id}>
                <a href="#">{item.id}</a>
              </li>
            ))}
          </ol>
        </nav>
      ) : (
        <p className="text-center">Rooms not found</p>
      )}
    </>
  );
}
