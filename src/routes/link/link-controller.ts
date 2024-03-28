import { Elysia, t } from "elysia";
import { createLink, deleteLink, getLink, getLinkById } from "./link-service";

export const e = new Elysia({ prefix: "/link" });

e.get("/", () => getLink());

e.get(
  "/:id",
  async ({ params, set }) => (set.redirect = await getLinkById(params.id)),
  {
    params: t.Object({
      id: t.String(),
    }),
  }
);

e.post("/", ({ body }) => createLink(body), {
  body: t.Object({
    url: t.String(),
  }),
});

e.delete("/:id", ({ params }) => deleteLink(params.id), {
  params: t.Object({
    id: t.String(),
  }),
});
