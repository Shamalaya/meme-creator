import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useMemesContext } from '../context/memes_context';
import Loading from './Loading';
import styled from "styled-components";

function MemeCreator() {
  const { id } = useParams();
  const { templates, memes, memes_loading, template_loading } = useMemesContext();
  let navigate = useNavigate();

  if (memes_loading || template_loading) {
    return <Loading />
  }
  const meme = memes.find((el) => el.id === parseInt(id))
  const template = templates.find((el) => el.id === meme.template_id)
  return (
    meme && template ?
      <div >
        <div style={{
          width: "100%",
          textAlign: "center",
          top: "10rem"
        }}>
          <h1>{meme.title}</h1> </div>

        <Wrapper>

          <div className="img" style={{ backgroundImage: `url(${template.url})` }}>
            <div className="text-container"></div>

            {template.textAreas.map((el, index) => {
              return (
                (index < template.textAreasNumber) &&
                (<div key={index} className={`text${index}`} style={{
                  overflowWrap: 'normal',
                  color: meme.color,
                  fontFamily: meme.font,
                  fontSize: template.fontSize,
                  textAlign: "center"

                }}>{meme.texts[index]}
                </div>))
            })
            }   </div></Wrapper >



      </div > : null

  )
}


export default MemeCreator;


const Wrapper = styled.div`
flex-grow: 4;
display: grid;
grid-template-columns: 1fr 5fr 1fr;
grid-template-rows: 1fr 1fr;


.img{
  grid-row: 1;
  grid-column: 2;
  background-size: cover; /* <-- background size */
  background-position: center
}

`
