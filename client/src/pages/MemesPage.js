import React from "react";
import MemeList from "../components/MemeList";

const MemesPage = ({ myMemes }) => {
  return (
    <main>
      <MemeList myMemes={myMemes} />
    </main>
  );
};

export default MemesPage;
