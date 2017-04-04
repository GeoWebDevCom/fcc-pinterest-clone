// userSession actions

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user,
  };
};

// photos actions

export const setAllPhotos = (photos) => {
  return {
    type: 'SET_ALL_PHOTOS',
    photos,
  };
};

export const addPhoto = (photo) => {
  return {
    type: 'ADD_PHOTO',
    photo,
  };
};
