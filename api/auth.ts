import { URL_BACK } from "config";

interface AuthResponseToken {
  token: string;
}
export default class Auth {
  public static keyToken = "token";

  public SetToken(token: string) {
    console.log("Token received: ", token);
    if (token) {
      localStorage.setItem(Auth.keyToken, token);
    }
  }

  public GetToken(): string | null {
    return localStorage.getItem(Auth.keyToken);
  }

  public async Login(email: string, password: string) {
    const response = await fetch(URL_BACK.concat("/login"), {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
    });
    let result = await response.json();
    let token = result.token;
    this.SetToken(token);
    return { data: result, code: response.status };
  }

  public Logout() {
    localStorage.removeItem(Auth.keyToken);
    console.log("Logout!");
  }

  public async Register(name: string, email: string, password: string) {
    const response = await fetch(URL_BACK.concat("/registr"), {
        headers: {
            "Content-Type": "Application/json",
            "Accept": "Application/json"
        },
        body: JSON.stringify({name, email, password}),
        method: "post"
    });
    const result = await response.json();
    console.log("Register response: ", response);
    if (result?.success) {
      return await this.Login(email, password);
    //   this.SetToken(response.data.token);
    }
    return {data: result, code: response.status}
  }
}
