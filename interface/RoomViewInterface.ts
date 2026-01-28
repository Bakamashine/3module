import type ItemData from "./ItemInterface";

export default interface RoomViewInterface {
  id: string;
  block: ItemData[]
//   block: {
//     height: number;
//     id: string;
//     roomId: string;
//     width: number;
//     color: string;
//     x: number;
//     y: number;
//   }[];
}
