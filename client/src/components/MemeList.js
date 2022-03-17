import { Link } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";
import { useMemesContext } from "../context/memes_context";
import { useUserContext } from "../context/user_context";
import styled from "styled-components";
import Loading from "./Loading";
import Error from "./Error";
import { FaPlus } from "react-icons/fa";

function MemeList() {
  const {
    memes_loading: loading,
    memes_error: error,
    memes,
    deleteMeme,
  } = useMemesContext();
  const { isAuthenticated, myUser } = useUserContext();

  if (error) {
    return <Error />;
  }

  return (
    <Wrapper>
      {isAuthenticated && (
        <Link to="/new">
          <button className="btn btn-new">
            <FaPlus />
            New Meme
          </button>
        </Link>
      )}
      <div className="memelist">
        {memes
          ? memes.map((m) => {
              return (
                <p key={m.id} className={"align-items-center"}>
                  <Link
                    to={{ pathname: `/memes/${m.id}` }}
                    style={{ textDecoration: "none" }}
                  >
                    {m.title}
                  </Link>
                  {m.protected ? <AiFillLock /> : ""}
                  {isAuthenticated ? (
                    <span>
                      {m.user_id === myUser.id ? (
                        <button
                          onClick={() => deleteMeme(m.id)}
                          className="btn btn-delete"
                        >
                          Delete
                        </button>
                      ) : (
                        ""
                      )}

                      <Link to={"/copy/" + m.id}>
                        {" "}
                        <button className="btn btn-copy">Copy</button>
                      </Link>
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              );
            })
          : ""}
      </div>
    </Wrapper>
  );
}

export default MemeList;

const Wrapper = styled.div`
  text-align: center;
  position: relative;
  .memelist {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 7rem 20%;
  }
  svg {
    margin-left: 1rem;
  }
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px 1px 2px 1px;
    border: 2px solid transparent;

    &:hover {
      border-bottom: 2px solid var(--clr-primary-7);
    }
  }
  svg {
    margin-right: auto;
  }
  .btn-delete {
    background-color: var(--clr-red-dark);
  }

  .btn-new {
    font-size: 1.5rem;
    margin-top: 3rem;
  }
  .btn-copy {
    background-color: var(--clr-grey-4);
  }
  @media (max-width: 992px) {
  }
`;
