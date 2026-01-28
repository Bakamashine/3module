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

const token = localStorage.getItem(Auth.keyToken);

async function AuthFetchJson({ other, url }: AuthFetchProps) {
  let errors = false;
  const response = await fetch(URL_BACK.concat(url), {
    body: other?.body,
    method: other?.method ? other.method : "get",
    headers: {
      Authorizate: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (response.status >= 400) {
    console.error("Error!", data);
    errors = true;
  }
  return { response, data, errors };
}

export default AuthFetchJson;
