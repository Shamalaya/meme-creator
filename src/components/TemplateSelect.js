import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useMemesContext } from '../context/memes_context'

function TemplateSelect() {
  let history = useNavigate();
  const { templates } = useMemesContext();
  return (<Wrapper>
    <h1>Select a template</h1>
    <div className='products-container'>
      {templates.map(el => {
        return (

          <div key={el.id} className="container" >
            <Link to={"/new/" + el.id} > <img src={el.url} className='image' /></Link>
          </div>
        )
      })
      }</div>
    <button onClick={() => history.goBack()} className=""
      style={{
        position: 'absolute',
        top: "50rem",
        left: "90rem"
      }}>Back</button></Wrapper>
  )
}


const Wrapper = styled.section`
 img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

   .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
   .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`



export default TemplateSelect;