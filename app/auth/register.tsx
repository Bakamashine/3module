import { Layout } from "~/root";
import type { Route } from "../+types/root";
import { Form, redirect, Router, useFetcher, useNavigate } from "react-router";
import Auth from "api/auth";
import { useEffect, useState, type FormEvent } from "react";
import { IsLogin } from "api/func";
import { URL_BACK } from "config";

export async function loader() {
  // if (IsLogin()) throw redirect("/");
}

interface RegisterError {
  email?: string;
  password?: string;
  name?: string;
}
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<RegisterError>();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = new Auth();
    const result = await auth.Register(name, email, password);
    if (result && result.code != 422) {
      // throw redirect("/");
      navigate("/");
    } else {
      setErrors(result.data.errors);
    }
  };

  //   useEffect(() => {
  //     console.log("Errors: ", errors);
  //   }, [errors]);

  //   useEffect(() => {
  //     console.log("Email: ", email);
  //     console.log("Password: ", password);
  //   }, [email, password]);

  return (
    <form method="post" onSubmit={submit}>
      <div className="mb-3">
        <label>Username</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors && <p className="text-danger">{errors.name}</p>}
      </div>
      <div className="mb-3">
        <label>E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors && <p className="text-danger">{errors.email}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="">Password</label>
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {errors && <p className="text-danger">{errors.password}</p>}
      </div>
      <div className="mb-3">
        <button>Register</button>
      </div>
    </form>
  );
}
