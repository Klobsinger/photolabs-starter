import { useReducer } from 'react';

// 1. Initial State
const initialState = {
  isModalOpen: false,
  selectedPhoto: null,
  favoritedPhotoIds: [],
};

// 2. Actions
export const ACTIONS = {
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  SET_PHOTO: 'SET_PHOTO',
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
};

// 3. Reducer
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_MODAL:
      return { ...state, isModalOpen: !state.isModalOpen };
    case ACTIONS.SET_PHOTO:
      return { ...state, selectedPhoto: action.payload };
    case ACTIONS.ADD_TO_FAVORITES:
      return { ...state, favoritedPhotoIds: [...state.favoritedPhotoIds, action.payload] };
    case ACTIONS.REMOVE_FROM_FAVORITES:
      return { ...state, favoritedPhotoIds: state.favoritedPhotoIds.filter(id => id !== action.payload) };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

// 4. Custom Hook
function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateToFavPhotoIds = (photoId) => {
    if (state.favoritedPhotoIds.includes(photoId)) {
      dispatch({ type: ACTIONS.REMOVE_FROM_FAVORITES, payload: photoId });
    } else {
      dispatch({ type: ACTIONS.ADD_TO_FAVORITES, payload: photoId });
    }
  };

  const setPhotoSelected = (photoData = null) => {
    dispatch({ type: ACTIONS.TOGGLE_MODAL });
    dispatch({ type: ACTIONS.SET_PHOTO, payload: photoData });
  };

  const onClosePhotoDetailsModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_MODAL });
    dispatch({ type: ACTIONS.SET_PHOTO, payload: null });
  };

  return {
    state,
    updateToFavPhotoIds,
    setPhotoSelected,
    onClosePhotoDetailsModal
  };
}

export default useApplicationData;