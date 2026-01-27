import { Layout } from "~/root";
import type { Route } from "../+types/root";
import { Form, redirect, Router, useFetcher, useNavigate } from "react-router";
import Auth from "api/auth";
import { useEffect, useState, type FormEvent } from "react";
import { IsLogin } from "api/func";
import { URL_BACK } from "config";
import type AuthError from "interface/AuthError";
import ShowError from "helper/showError";

interface RegisterError {
  password?: string;
  name?: string;
}
export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<AuthError>();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = new Auth();
    const result = await auth.Register(name, password);
    if (!result?.error) {
      // throw redirect("/");
      // navigate("/");
    } else {
      setErrors(result.data);
    }
  };

  return (
    <form method="post" onSubmit={submit}>
      <div className="mb-3">
        <label>Username</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <ShowError errors={errors?.errors.Name} />
      </div>
      <div className="mb-3">
        <label htmlFor="">Password</label>
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <ShowError errors={errors?.errors.Password} />
      </div>
      <div className="mb-3">
        <button>Register</button>
      </div>
    </form>
  );
}
