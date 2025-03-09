import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// Enable CORS
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (c) => {
  return c.json({ message: "Hello, world!" });
});
