import Auth from "./auth";

export function IsLogin() {
  if (typeof window !== "undefined") {
    console.log(localStorage.getItem(Auth.keyToken));
    return Boolean(localStorage.getItem(Auth.keyToken));
  } 
}
