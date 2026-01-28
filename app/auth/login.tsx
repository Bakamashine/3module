import { Layout } from "~/root";
import type { Route } from "../+types/root";
import { Form, redirect, Router, useFetcher, useNavigate } from "react-router";
import Auth from "api/auth";
import { useContext, useEffect, useState, type FormEvent } from "react";
import { IsLogin } from "api/func";
import { URL_BACK } from "config";
import ShowError from "helper/showError";

interface LoginError {
  Name?: string;
  // Password?: string;
}
export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginError>();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = new Auth();
    const result = await auth.Login(name, password);
    if (!result.error) {
      // throw redirect("/");
      // navigate("/");
    } else {
      setErrors({ Name: "User not found" });
    }
  };

  return (
    <form method="post" onSubmit={submit}>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="error">
          <p className="text-danger">{errors?.Name}</p>
        </div>
        {/* {errors && <p className="text-danger">{errors.name}</p>} */}
      </div>
      <div className="mb-3">
        <label htmlFor="">Password</label>
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {/* {errors && <p className="text-danger">{errors.password}</p>} */}
      </div>
      <div className="mb-3">
        <button>Login</button>
      </div>
    </form>
  );
}
