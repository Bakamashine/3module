import { URL_BACK } from "config";
import unAuthFetchJson from "config/unAuthFetch";

interface AuthResponseToken {
  token: string;
}
export default class Auth {
  public static keyToken = "token";
  public static keyName = "name";

  private ReturnError(response: any) {
    return {
      code: response.response.status,
      data: response.data,
      error: response.errors,
    }
  }

  public SetToken(token: string, name: string) {
    console.log("Token received: ", token);
    if (token) {
      localStorage.setItem(Auth.keyToken, token);
    }
    if (name) {
      localStorage.setItem(Auth.keyName, name);
    }
  }

  public GetToken(): string | null {
    return localStorage.getItem(Auth.keyToken);
  }

  public async Login(name: string, password: string) {
    const response = await unAuthFetchJson({
      other: {
        method: "post",
        body: JSON.stringify({ name, password }),
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
      },
      url: URL_BACK.concat("/login"),
    });

console.log("Login response: ", response.response);
console.log("Login data: ", response.data);

if (!response.errors) {
  this.SetToken(response.data.token, response.data.name)
}
else {
  return this.ReturnError(response);
}


    // const response = await fetch(URL_BACK.concat("/login"), {
    //   method: "post",
    //   body: JSON.stringify({ name, password }),
    //   headers: {
    //     Accept: "Application/json",
    //     "Content-Type": "Application/json",
    //   },
    // });
    // let result = await response.json();
    // this.SetToken(result.token, result.name);
    // return { data: result, code: response.status };
  }

  public Logout() {
    localStorage.removeItem(Auth.keyToken);
    console.log("Logout!");
  }

  public async Register(name: string, password: string) {
    const response = await unAuthFetchJson({
      other: {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, password }),
        method: "post",
      },
      url: URL_BACK.concat("/register"),
    });
    console.log("Register response: ", response);
    console.log("Register data: ", response.data);
    if (!response.errors) {
      return await this.Login(name, password);
    }
    return {
      code: response.response.status,
      data: response.data,
      error: response.errors,
    };
  }
}
