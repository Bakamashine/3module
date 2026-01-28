import Auth from "api/auth";
import { URL_BACK } from "config";
interface AuthFetchProps {
  other?: {
    body?: string;
    method?: string;
    // headers: object;
  };
  url: string;
}

async function AuthFetchJson({ other, url }: AuthFetchProps) {
  let errors = false;
  const response = await fetch(URL_BACK.concat(url), {
    body: other?.body,
    method: other?.method ? other.method : "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(Auth.keyToken)}`,
      "Content-Type": "application/json"
    },
  });
  const data = await response.json();
  if (response.status >= 400) {
    console.error("Error!", data);
    errors = true;
  }
  return { response, data, errors };
}

export async function AuthFetch({ other, url }: AuthFetchProps) {
  let errors = false;
  const response = await fetch(URL_BACK.concat(url), {
    body: other?.body,
    method: other?.method ? other.method : "get",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(Auth.keyToken)}`,
      "Content-Type": "application/json"
    },
    // credentials:"include"
  });
  // const data = await response.json();
  if (response.status >= 400) {
    console.error("Error!", response);
    errors = true;
  }
  return response;
  // return { response, data, errors };
}

export default AuthFetchJson;
