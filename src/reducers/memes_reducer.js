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

const memes_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === GET_MEMES_BEGIN) {
    return { ...state, memes_loading: true };
  }
  if (action.type === GET_MEMES_SUCCESS) {
    return {
      ...state,
      memes_loading: false,
      memes: action.payload,
      dirty: false,
    };
  }
  if (action.type === GET_MEMES_ERROR) {
    return { ...state, memes_loading: false, memes_error: true, dirty: false };
  }

  if (action.type === GET_TEMPLATES_BEGIN) {
    return { ...state, templates_loading: true };
  }
  if (action.type === GET_TEMPLATES_SUCCESS) {
    return {
      ...state,
      templates_loading: false,
      templates: action.payload,
      dirty: false,
    };
  }
  if (action.type === GET_TEMPLATES_ERROR) {
    return {
      ...state,
      templates_loading: false,
      templates_error: true,
      dirty: false,
    };
  }

  if (action.type === ADD_MEME_BEGIN) {
    return { ...state, add_meme_loading: true };
  }
  if (action.type === ADD_MEME_SUCCESS) {
    return { ...state, add_meme_loading: false, dirty: true };
  }
  if (action.type === ADD_MEME_ERROR) {
    return { ...state, add_meme_loading: false, add_meme_error: true };
  }
  if (action.type === DELETE_MEME_BEGIN) {
    return { ...state, delete_meme_loading: true };
  }
  if (action.type === DELETE_MEME_SUCCESS) {
    return { ...state, delete_meme_loading: false, dirty: true };
  }
  if (action.type === DELETE_MEME_ERROR) {
    return { ...state, delete_meme_loading: false, delete_meme_error: true };
  }
  if (action.type === SET_DIRTY) {
    return { ...state, dirty: true };
  }
};

export default memes_reducer;
