import React from "react";
import MemeForm from "../components/MemeForm";

const FormMemePage = ({ copy }) => {
  return (
    <main>
      <MemeForm copy={copy} />
    </main>
  );
};

export default FormMemePage;
