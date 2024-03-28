import { Elysia } from "elysia";
import { e } from "./routes/link/link-controller";

const app = new Elysia();
app.use(e);
app.listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
