import { Link } from 'react-router-dom';
import { AiFillLock } from 'react-icons/ai'
import { useMemesContext } from '../context/memes_context'
import { useUserContext } from '../context/user_context'
import styled from 'styled-components';
import Loading from './Loading'
import Error from './Error'


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
        <h3>Meme List</h3>
        <ul>
            {memes ? memes.map((m) => {
                return (
                    <li key={m.id} className={"align-items-center"}>
                        <Link to={{ pathname: `/memes/${m.id}` }} style={{ textDecoration: 'none' }} >{m.title}</Link>
                        {m.protected ? <AiFillLock /> : ""}
                        {isAuthenticated ?
                            <span >
                                {m.user_id === myUser.id ? <button onClick={() => deleteMeme(m.id)} >Delete</button> : ""}

                                <Link to={"/copy/" + m.id} >   <button>Copy</button></Link>

                            </span> : ""}

                    </li>
                )
            }) : ''}

        </ul>
        {<AddButton isAuthenticated={isAuthenticated} />}


    </Wrapper >)
}

function AddButton(props) {
    return (<> {props.isAuthenticated && (
        <Link to={{
            pathname: "/new",
        }} style={{
            position: 'absolute',
            top: "80%",
            left: "80%"
        }}><button className='btn btn-new'>New Meme</button>
        </Link>)} </>
    )
}
export default MemeList;


const Wrapper = styled.div`

display: flex;
flex-direction: column;
align-content: space-between ;


@media (max-width: 992px) {
.btn-new{
    display:none
}
}
`