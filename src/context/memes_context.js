import React, { useContext, useEffect, useReducer }
  from 'react'
import { useUserContext } from '../context/user_context'

import reducer from '../reducers/memes_reducer'
import API from '../API'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_MEMES_BEGIN,
  GET_MEMES_SUCCESS,
  GET_MEMES_ERROR,
  GET_TEMPLATES_BEGIN,
  GET_TEMPLATES_SUCCESS,
  GET_TEMPLATES_ERROR,

} from '../actions'

const initialState = {
  isSidebarOpen: false,
  memes_loading: false,
  memes_error: false,
  templates_loading: false,
  templates_error: false,
  memes: [],
  templates: [],
  dirty: false,
}


const MemesContext = React.createContext()

export const MemesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isAuthenticated } = useUserContext();
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  async function fetchMemes() {
    // call GET /api/memes
    dispatch({ type: GET_MEMES_BEGIN })

    API.getAllMemes()
      .then(memes => {
        dispatch({ type: GET_MEMES_SUCCESS, payload: memes })
      })
      .catch(error => {
        console.log(error.message);
        dispatch({ type: GET_MEMES_ERROR })
      })


  }

  async function fetchTemplates() {
    // call GET /api/templates
    dispatch({ type: GET_TEMPLATES_BEGIN })

    API.getAllTemplates()
      .then(templates => {
        dispatch({ type: GET_TEMPLATES_SUCCESS, payload: templates })
      })
      .catch(error => {
        console.log(error.message);
        dispatch({ type: GET_TEMPLATES_ERROR })
      })


  }

  const addMeme = (meme) => {
    API.addMeme(meme)
      .catch(error => { console.log(error.message) })
  }

  const deleteMeme = (memeId) => {
    API.deleteMeme(memeId)
      .catch(e => console.log(e))
  }

  useEffect(() => {
    console.log("sto qua")

    fetchMemes().then(() => fetchTemplates())


  }, [])




  return (
    <MemesContext.Provider value={{ ...state, openSidebar, closeSidebar, fetchMemes, addMeme, deleteMeme }}>
      {children}
    </MemesContext.Provider>
  )
}

export const useMemesContext = () => {
  return useContext(MemesContext)
}