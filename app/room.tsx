import { useParams } from "react-router";
import Room from "api/room";
import React, { useEffectEvent, useState } from "react";
import Reload from "components/Reload";
import type RoomViewInterface from "interface/RoomViewInterface";
import type ItemData from "interface/ItemInterface";

const itemsColor = ["red", "blue", "white"];

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
}

const Item = ({ color, ...props }: ItemProps) => (
  <div className={`item ${color}`} {...props} />
);

const room = new Room();
export default function RoomView() {
  const [data, setData] = React.useState<RoomViewInterface>();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ItemData[]>([]);
  const [dragId, setDragId] = useState<string | null>();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  let params = useParams<{ id: string }>();
  //   console.log(params);

  function sendItem(item: ItemData) {
    room.SendItem(item);
  }

  function clickItem(id: string, e: React.MouseEvent<HTMLDivElement>) {
    if (id) {
      const rect = e.currentTarget.getBoundingClientRect();
      setDragId(id);
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (dragId === null) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === dragId
          ? {
              ...item,
              x: e.clientX - offset.x,
              y: e.clientY - offset.y,
            }
          : item,
      ),
    );
  }

  const onMouseUp = () => {
    // setDragId(null);
    // sendItem()
  };

  const clickContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragId(null);
    let currentItem = items.find((item) => item.id === dragId);

    console.log("Current item: ", currentItem);
    if (!currentItem) return;
    room.ReplaceItem(currentItem);
  };

  const addItem = () => {
    try {
      const color = itemsColor[Math.floor(Math.random() * itemsColor.length)];
      //   console.log("Color item: ", color);
      if (data) {
        let newItem = {
          id: Date.now().toString(),
          color,
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          RoomId: data.id,
        };
        setItems((prev) => [...prev, newItem]);
        sendItem(newItem);
      } else {
        throw new Error("Data is null");
      }
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    console.log(dragId);
  }, []);

  async function loader() {
    try {
      let response;
      if (params.id) response = await room.GetRoomById(params.id);
      else {
        throw new Error();
      }
      console.log("Current room: ", response);
      setData(response.data);
      const renderedItems: ItemData[] = response.data.blocks.map(
        (b: ItemData) => ({
          id: b.id,
          color: b.color,
          x: b.x,
          y: b.y,
          width: b.width,
          height: b.height,
        }),
      );

      setItems(renderedItems);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    loader();
  }, []);

  //   React.useEffect(() => {
  //     console.log("Items: ", items);
  //   }, [items]);

  if (loading) return <Reload />;

  return (
    <>
      <h1 className="text-center">Room: {data?.id}</h1>
      <div>
        <div className="">
          <button onClick={addItem}>Add Item</button>
        </div>

        {items && items.length > 0 && (
          <div
            className="h1000"
            // onMouseMove={onMouseMove}
            // onMouseUp={onMouseUp}
            // onMouseLeave={onMouseUp}
            // onContextMenu={clickContextMenu}
            //   onMouseDown={openContextMenu}
          >
            {items && (
              <>
                {items.map((item) => (
                  <Item
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    onContextMenu={clickContextMenu}
                    key={item.id}
                    color={item.color}
                    onClick={(e) => clickItem(item.id, e)}
                    style={{
                      position: "absolute",
                      left: item.x,
                      top: item.y,
                      cursor: "grab",
                      width: item.width,
                      height: item.height,
                    }}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
