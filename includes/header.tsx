import User from "api/user";
import { Link } from "react-router";

export default function Header() {
  const username = User.GetUserName();
  return (
    <header className="bg-gray-200">
      <Link to={"register"} className="text-blue-600 block">
        Register
      </Link>
      <Link to={"login"} className="text-blue-600 block">
        Login
      </Link>
      <Link to={"about_us"} className="text-blue-600 block">
        About us
      </Link>
      <Link to={"/"} className="text-blue-600 block">
        Home
      </Link>
      <Link to={"drawing"} className="block">
        Drawer
      </Link>
      {username && (
        <div className="mb-3">
          <p>Добро пожаловать {username} </p>
        </div>
      )}
    </header>
  );
}
