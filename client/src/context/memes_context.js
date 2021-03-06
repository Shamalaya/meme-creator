import React, { useContext, useEffect, useReducer } from "react";

import reducer from "../reducers/memes_reducer";
import API from "../API";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_MEMES_BEGIN,
  GET_MEMES_SUCCESS,
  GET_MEMES_ERROR,
  GET_TEMPLATES_BEGIN,
  GET_TEMPLATES_SUCCESS,
  GET_TEMPLATES_ERROR,
  ADD_MEME_BEGIN,
  ADD_MEME_SUCCESS,
  ADD_MEME_ERROR,
  DELETE_MEME_BEGIN,
  DELETE_MEME_SUCCESS,
  DELETE_MEME_ERROR,
  SET_DIRTY,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  memes_loading: false,
  memes_error: false,
  templates_loading: false,
  templates_error: false,
  memes: [],
  templates: [],
  dirty: true,
};

const MemesContext = React.createContext();

export const MemesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  async function fetchMemes() {
    // call GET /api/memes
    dispatch({ type: GET_MEMES_BEGIN });

    API.getAllMemes()
      .then((memes) => {
        dispatch({ type: GET_MEMES_SUCCESS, payload: memes });
      })
      .catch((error) => {
        dispatch({ type: GET_MEMES_ERROR });
      });
  }

  async function fetchTemplates() {
    // call GET /api/templates
    dispatch({ type: GET_TEMPLATES_BEGIN });

    API.getAllTemplates()
      .then((templates) => {
        dispatch({ type: GET_TEMPLATES_SUCCESS, payload: templates });
      })
      .catch((error) => {
        dispatch({ type: GET_TEMPLATES_ERROR });
      });
  }

  const addMeme = (meme) => {
    dispatch({ type: ADD_MEME_BEGIN });

    API.addMeme(meme)
      .then(() => dispatch({ type: ADD_MEME_SUCCESS }))
      .catch((error) => {
        dispatch({ type: ADD_MEME_ERROR, payload: error.message });
      });
  };

  const deleteMeme = (memeId) => {
    dispatch({ type: DELETE_MEME_BEGIN });
    API.deleteMeme(memeId)
      .then(() => dispatch({ type: DELETE_MEME_SUCCESS }))
      .catch((error) =>
        dispatch({ type: DELETE_MEME_ERROR, payload: error.message })
      );
  };
  const setDirty = () => {
    dispatch({ type: SET_DIRTY });
  };
  useEffect(() => {
    if (state.dirty === true) {
      fetchMemes().then(() => fetchTemplates());
    }
  }, [state.dirty]);

  return (
    <MemesContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchMemes,
        addMeme,
        deleteMeme,
        setDirty,
      }}
    >
      {children}
    </MemesContext.Provider>
  );
};

export const useMemesContext = () => {
  return useContext(MemesContext);
};
