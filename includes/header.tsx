import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-gray-200">
      <Link to={"register"} className="text-blue-600 block">Register</Link>
      <Link to={"login"} className="text-blue-600 block">Login</Link>
      <Link to={"about_us"} className="text-blue-600 block">About us</Link>
      <Link to={"/"} className="text-blue-600 block">Home</Link>
      <Link to={"drawing"} className="block">Drawer</Link>
    </header>
  );
}
