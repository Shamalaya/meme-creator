import React from "react";
import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper>
      <div className="section section-center text-center">
        <h2>there was an error...</h2>
      </div>
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  margin-top: 5rem;
  h2 {
    text-align: center;
  }
`;
