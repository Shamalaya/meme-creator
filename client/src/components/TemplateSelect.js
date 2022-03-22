import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMemesContext } from "../context/memes_context";

function TemplateSelect() {
  let history = useNavigate();
  const { templates } = useMemesContext();
  return (
    <Wrapper>
      <h1>Select a template</h1>
      <div className="img-container">
        {templates.map((el) => {
          return (
            <div key={el.id} className="img-box">
              <Link to={"/new/" + el.id}>
                {" "}
                <img src={el.url} className="image" />
              </Link>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => history.goBack()}
        className=""
        style={{
          position: "absolute",
          top: "50rem",
          left: "90rem",
        }}
      >
        Back
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  text-align: center;
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .img-container {
    display: grid;
    gap: 2rem 1.5rem;
    grid-template-columns: repeat(4, 1fr);
  }

  .img-box:hover img {
    opacity: 0.5;
  }

  @media (max-width: 992px) {
    .img-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default TemplateSelect;
