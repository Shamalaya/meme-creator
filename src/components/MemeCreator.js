import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useMemesContext } from '../context/memes_context';

function MemeCreator() {
  const { id } = useParams();
  const { templates, memes } = useMemesContext();
  let history = useNavigate();

  const meme = memes.find((el) => el.id === parseInt(id)) || {}
  const template = templates.find((el) => el.id === meme.template_id) || {}
  return (
    <div >
      <div style={{
        width: "100%",
        textAlign: "center",
        top: "10rem"
      }}>
        <h1>{meme.title}</h1> </div>
      < div >

        <img
          src={template.url}
          style={{
            position: 'absolute',
            top: '10em',
            left: '40em',

            width: 600,
            height: 600
          }}
        />
        {template.textAreas.map((el, index) => {
          return (
            (index < template.textAreasNumber) &&
            (<div key={index} style={{
              position: 'absolute',
              top: el[0],
              left: el[1],
              width: el[2],
              overflowWrap: 'normal',
              color: meme.color,
              fontFamily: meme.font,
              fontSize: template.fontSize,
              textAlign: "center"

            }}>{meme.texts[index]}
            </div>))
        })
        }
      </div >
      <div style={{
        position: 'absolute',
        top: "50rem"
      }}>
        Created By: {meme.user_name} </div>
      <button onClick={() => history.goBack()} className="float-sm-right"
        style={{
          position: 'absolute',
          top: "50rem",
          left: "90rem"
        }}>Back</button>
    </div>

  )
}


export default MemeCreator;

