import { Layout } from "~/root";
import type { Route } from "../+types/root";
import { Form, redirect, Router, useFetcher, useNavigate } from "react-router";
import Auth from "api/auth";
import { useEffect, useState, type FormEvent } from "react";
import { IsLogin } from "api/func";
import { URL_BACK } from "config";

export async function loader() {
  if (IsLogin()) {
    throw redirect("/");
  }
}

interface LoginError {
  email?: string;
  password?: string;
}
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginError>();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = new Auth();
    const result = await auth.Login(email, password);
    if (result && result.code != 422) {
      // throw redirect("/");
      navigate("/");
    } else {
      setErrors(result.data.errors);
    }
  };

  return (
    <form method="post" onSubmit={submit}>
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
        <button>Login</button>
      </div>
    </form>
  );
}
