import { rest } from "msw";

let memes = [
  {
    id: 2,
    template_id: 1,
    user_id: 1,
    user_name: "Mario",
    title: "Titolo",
    texts: ["testo1", "testo2", ""],
    font: "Arial",
    color: "Black",
    protected: true,
  },
  {
    id: 3,
    template_id: 2,
    user_id: 2,
    user_name: "Piero",
    title: "prova",
    texts: ["testo4", "testo5", ""],
    font: "Arial",
    color: "Black",
    protected: true,
  },
];
export const handlers = [
  rest.get("/api/memes", (req, res, ctx) => {
    return res(ctx.json(memes));
  }),
  rest.get("/api/templates", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 2,
          url: "/template_4.jpg",
          fontSize: 20,
          textAreaNumber: 2,
          textAreas: [
            ["15%", "0%", "50%"],
            ["55%", "0%", "50%"],
            ["null", "null", "null"],
          ],
        },
      ])
    );
  }),
  rest.post("/api/order", (req, res, ctx) => {
    return res(ctx.json({ orderNumber: 123455676 }));
  }),
];
