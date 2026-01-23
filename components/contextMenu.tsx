import React from "react"

interface ContextMenuProps {
    buttons: {
        text: string,
        callback: () => void,
    }[],
    style: React.CSSProperties;
}
export default function ContextMenu({buttons, style}: ContextMenuProps) {
    return (
        <div className="ContextMenu" style={style}>
            {buttons.map((item, index) => (
                <div className="ContextMenu__button" onClick={item.callback}>
                    {item.text}
                </div>
            ))}
        </div>
    )
}