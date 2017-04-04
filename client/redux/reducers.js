export const userSessionReducer = (state ={}, action) => {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export const photosReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SET_ALL_PHOTOS':
      return {
        ...state,
        list: action.photos,
      };
    case 'ADD_PHOTO':
      return {
        ...state,
        list: [
          ...state.list,
          action.photo,
        ],
      };
    default:
      return state;
  }
};
