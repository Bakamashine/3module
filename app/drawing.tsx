import React, { useState } from "react";

const itemsColor = ["red", "blue", "white" ];

interface ItemData {
  id: number;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
}

const Item = ({ color, ...props }: ItemProps) => (
  <div className={`item ${color}`} {...props} />
);

const Menu =  {
  
}

export default function Drawing() {
  const [items, setItems] = useState<ItemData[]>([]);
  const [dragId, setDragId] = useState<number | null>();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isContextMenu, SetContextMenu] = useState(false)

  const clickItem = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (id) {
      const rect = e.currentTarget.getBoundingClientRect();
      setDragId(id);
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
  };

  const onMouseUp = () => setDragId(null);

  const clickContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const openContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    SetContextMenu(true)

  }

  const addItem = () => {
    const color = itemsColor[Math.floor(Math.random() * itemsColor.length)];
    console.log("Color item: ", color);
    setItems((prev) => [...prev, { id: Date.now(), color, x: 0, y: 0, width: 100, height: 100 }]);
  };
  return (
    <div>
    </div>
    <div>
      <div className="">
        
        <button onClick={addItem}>Add Item</button>
      </div>
      <div
        {/* className="h1000" */}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onContextMenu={clickContextMenu}
        onMouseDown={openContextMenu}
      >
        {items && (
          <>
            {items.map((item) => (
              <Item
                key={item.id}
                color={item.color}
                onClick={(e) => clickItem(item.id, e)}
                style={{
                  position: "absolute",
                  left: item.x,
                  top: item.y,
                  cursor: "grab",
                  width: item.width,
                  height: item.height
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
