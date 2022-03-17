import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMemesContext } from "../context/memes_context";
import Loading from "./Loading";
import styled from "styled-components";

function MemeCreator() {
  const { id } = useParams();
  const { templates, memes, memes_loading, template_loading } =
    useMemesContext();
  let navigate = useNavigate();

  if (memes_loading || template_loading) {
    return <Loading />;
  }
  const meme = memes.find((el) => el.id === parseInt(id));
  const template = templates.find((el) => el.id === meme.template_id);
  return meme && template ? (
    <Wrapper>
      <h1>{meme.title}</h1>

      <Meme
        style={{ backgroundImage: `url(${template.url})` }}
        className="memeimg"
      >
        {template.textAreas.map((el, index) => {
          return (
            index < template.textAreasNumber && (
              <h2
                key={index}
                className={`text${index}`}
                style={{
                  position: "absolute",
                  top: el[0],
                  left: el[1],
                  width: el[2],
                  overflowWrap: "normal",
                  color: meme.color,
                  fontFamily: meme.font,
                  fontSize: template.fontSize,
                  textAlign: "center",
                }}
              >
                {meme.texts[index]}
              </h2>
            )
          );
        })}
      </Meme>
    </Wrapper>
  ) : null;
}

export default MemeCreator;

const Wrapper = styled.div`
  h1 {
    margin: 2rem 0;
    text-align: center;
  }
`;

const Meme = styled.div`
  height: 30rem;
  width: 30rem;
  position: relative;
  background-size: contain;
  background-repeat: no-repeat;
  align-self: center;
  margin: 10rem auto;

  .img {
    background-size: cover; /* <-- background size */
    background-position: center;
  }

  .text-container {
    position: absolute;
  }
`;
