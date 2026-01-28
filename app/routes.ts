import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("home.tsx"),
  route("about_us", "./about.tsx"),
  route("register", "auth/register.tsx"),
  route("login", "auth/login.tsx"),
  // route("drawing", "./drawing.tsx"),
  route("room/:id", './room.tsx')
] satisfies RouteConfig;
