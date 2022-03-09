import { Link } from 'react-router-dom';
import { AiFillLock } from 'react-icons/ai'
import { useMemesContext } from '../context/memes_context'
import { useUserContext } from '../context/user_context'
import styled from 'styled-components';
import Loading from './Loading'
import Error from './Error'
import { FaPlus } from "react-icons/fa"

function MemeList() {
    const { memes_loading: loading, memes_error: error, memes, deleteMeme } = useMemesContext();
    const { isAuthenticated, myUser } = useUserContext();

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <Error />
    }

    return (<Wrapper>
        {isAuthenticated && (
            <Link to={{
                pathname: "/new",
            }} ><button className='btn btn-new'>New Meme</button>
            </Link>)}
        <h3>Meme List</h3>
        <div className='memelist'>
            {memes ? memes.map((m) => {
                return (
                    <p key={m.id} className={"align-items-center"}>
                        <Link to={{ pathname: `/memes/${m.id}` }} style={{ textDecoration: 'none' }} >{m.title}</Link>
                        {m.protected ? <AiFillLock /> : ""}
                        {isAuthenticated ?
                            <span >
                                {m.user_id === myUser.id ? <button onClick={() => deleteMeme(m.id)} className="btn btn-delete" >Delete</button> : ""}

                                <Link to={"/copy/" + m.id} >   <button className="btn btn-copy">Copy</button></Link>

                            </span> : ""}

                    </p>
                )
            }) : ''}

        </div>


    </Wrapper >)
}

function AddButton(props) {
    return (<> )
    } </>
    )
}
export default MemeList;


const Wrapper = styled.div`
.memelist{
display: flex;
justify-content: center ;
flex-direction: column;
margin: 2rem 20rem;
}
p{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
svg{
    margin-right: auto;
}
.btn-delete{
    background-color:red;
}

.btn-new{
    font-size: 2rem;
position: relative;

}

@media (max-width: 992px) {
.btn-new{
    display:none
}
}
`