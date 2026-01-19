import React, {
  Component,
  useEffect,
  useState,
  type MouseEventHandler,
} from "react";

const itemsColor = ["red", "blue", "yellow", "pink"];

const Item = ({ styleName }: { styleName: string }) => (
  <div className={`item ${styleName}`} />
);

export default function Drawing() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [items, setItems] = useState([]);

  const setMousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  };

  const clickItem = () => {};

  const addItem = () => {
    const color = itemsColor[Math.floor(Math.random() * itemsColor.length)];
    console.log("Color: ", color)
    setItems((prev) => [...prev, <Item key={prev.length} styleName={color} />]);
  };

  useEffect(() => {
    // setMousePosition()
    console.log("MouseX: ", mouseX);
    console.log("MouseY: ", mouseY);
  }, [mouseX, mouseY]);
  return (
    <div>
      <div className="">
        <button onClick={addItem}>Add Item</button>
      </div>
      <div className="box box-border mb-3 h1000" onMouseMove={setMousePosition}>
        {items && (
          <>
            {items.map((item, index) => (
            //   <Item key={index}  />
            <React.Fragment key={index}>{item}</React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
