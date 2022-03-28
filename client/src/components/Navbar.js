import React from "react";
import { useMemesContext } from "../context/memes_context";
import { useUserContext } from "../context/user_context";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { links } from "../utils/constants";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { openSidebar } = useMemesContext();
  const { myUser, handleLogout } = useUserContext();

  return (
    <NavContainer>
      <button type="button" className="nav-toggle" onClick={openSidebar}>
        <FaBars />
      </button>
      <div className="nav-header">
        <Link to="/">meme creator</Link>
      </div>
      <ul className="nav-links">
        {links.map((link) => {
          const { id, text, url } = link;
          return (
            <li key={id}>
              <Link to={url}> {text}</Link>
            </li>
          );
        })}
      </ul>
      <div className="nav-right">
        {myUser ? (
          <>
            <button
              type="button"
              className="btn auth-btn"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button type="button" className="btn">
              Login
            </button>
          </Link>
        )}
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--light-shadow);
  background-color: white;
  z-index: 99;

  .nav-header {
    margin-left: 2rem;
    font-weight: 800;
    font-size: 1.1rem;
    a {
      color: var(--clr-primary-5);
    }
  }

  .nav-links {
    margin-left: -3rem;
    display: flex;
    padding: 1rem 1rem;
    a {
      color: var(--clr-grey-3);
      font-size: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      padding: 1rem 1.5rem;
      &:hover {
        border-bottom: 2px solid var(--clr-primary-7);
      }
    }
  }
  .nav-right {
    margin-right: 2rem;
  }

  .nav-toggle {
    display: none;
  }

  .auth-btn {
  }
  .username {
    margin-right: 2rem;
    font-size: 0.88rem;
  }
  @media (max-width: 992px) {
    .nav-toggle {
      background: transparent;
      border: transparent;
      color: var(--clr-primary-5);
      cursor: pointer;
      display: block;
      svg {
        font-size: 2rem;
      }
      margin-left: 1rem;
    }
    .nav-header {
      margin-left: 0;
    }

    .nav-links {
      display: none;
    }
    .auth-btn {
      display: none;
    }
  }
`;

export default Navbar;
