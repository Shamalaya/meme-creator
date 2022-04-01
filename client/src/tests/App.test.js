import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { MemesProvider } from "../context/memes_context";
import { UserProvider } from "../context/user_context";
import React from "react";

test("New Meme", async () => {
  render(
    <MemesProvider>
      <UserProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserProvider>
    </MemesProvider>
  );

  const meme1 = await screen.findByText("Titolo");
  const meme2 = await screen.findByText(/Prova/i);

  expect(meme1).toBeInTheDocument();
  expect(meme2).toBeInTheDocument();
});
