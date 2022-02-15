import React, { useContext, useEffect, useReducer }
  from 'react'
import reducer from '../reducers/memes_reducer'

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_MEMES_BEGIN,
  GET_MEMES_SUCCESS,
  GET_MEMES_ERROR,
  GET_TEMPLATES_BEGIN,
  GET_TEMPLATES_SUCCESS,
  GET_TEMPLATES_ERROR
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  memes_loading: false,
  memes_error: false,
  templates_loading: false,
  templates_error: false,
  memes: [],
  templates: [],
}

const MemesContext = React.createContext()

export const MemesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  async function fetchMemes() {
    // call GET /api/memes
    dispatch({ type: GET_MEMES_BEGIN })

    try {
      const response = await fetch('/api/memes');
      const memesJson = await response.json();

      if (response.ok) {
        let memes = memesJson.map(meme => Object.assign({}, meme));
        dispatch({ type: GET_MEMES_SUCCESS, payload: memes });
      }
      else
        throw memesJson;
    } catch (error) {
      dispatch({ type: GET_MEMES_ERROR })

    };
  }

  async function fetchTemplates() {
    // call GET /api/templates
    dispatch({ type: GET_TEMPLATES_BEGIN })

    try {
      const response = await fetch('/api/templates');
      const templatesJson = await response.json();

      if (response.ok) {
        let templates = templatesJson.map(template => Object.assign({}, template));
        dispatch({ type: GET_TEMPLATES_SUCCESS, payload: templates });
      }
      else
        throw templatesJson;
    } catch (error) {
      dispatch({ type: GET_TEMPLATES_ERROR })

    };
  }

  useEffect(() => {
    fetchMemes();

  }, [])

  useEffect(() => {
    fetchTemplates();

  }, [])


  return (
    <MemesContext.Provider value={{ ...state, openSidebar, closeSidebar, fetchMemes }}>
      {children}
    </MemesContext.Provider>
  )
}

export const useMemesContext = () => {
  return useContext(MemesContext)
}