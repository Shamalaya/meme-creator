import { Link } from 'react-router-dom';
import { AiFillLock } from 'react-icons/ai'
import { useMemesContext } from '../context/memes_context'
import Loading from './Loading'
import Error from './Error'


function MemeList() {
    const { memes_loading: loading, memes_error: error, memes } = useMemesContext();
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <Error />
    }

    return (<div>
        <h3>Meme List</h3>
        <ul>
            {memes.map((m) => {
                return (
                    <li key={m.id} className={"align-items-center"}>
                        <Link to={{ pathname: `/memes/${m.id}` }} style={{ textDecoration: 'none' }} >{m.title}</Link>
                        {m.protected ? <AiFillLock /> : ""}

                    </li>
                )
            })}

        </ul>
        {/* <AddButton loggedIn={props.loggedIn} /></div> */}


    </div>)
}

/* function AddButton(props) {
    return (<> {props.loggedIn && (
            <Link to={{
                pathname: "/new",
            }} style={{
                position: 'absolute',
                top: "50rem",
                left: "90rem"
            }}><Button>New Meme</Button>
            </Link>)} </>
        )
} */
export default MemeList;