export const setCheckBox = baniTitle => dispatch => {
  dispatch({
    type: 'SET_CHECKBOX',
    theBani: baniTitle,
  });
};
export const setTheState = state => dispatch => {
  dispatch({
    type: 'SET_THE_STATE',
    state,
  });
};
export const setAngNum = (bani, angNum) => dispatch => {
  dispatch({
    type: 'SET_ANG_NUM',
    bani,
    angNum,
  });
};
export const setDarkMode = mode => dispatch => {
  dispatch({
    type: 'SET_DARK_MODE',
    mode,
  });
};
export const setAddedPDFs = (folderTitle, item) => dispatch => {
  dispatch({
    type: 'SET_ADDED_PDFS',
    item,
    folderTitle,
  });
};
export const deleteAddedItem = title => dispatch => {
  dispatch({
    type: 'DELETE_ADDED_ITEM',
    title,
  });
};
export const addNdeletePdf = (title, item, toAdd) => dispatch => {
  dispatch({
    type: 'ADD_OR_DELETE_PDF',
    title,
    item,
    add: toAdd, //boolean
  });
};
// export const setTheState = state => {
//   return {
//     type: 'SET_THE_STATE',
//     state,
//   };
// };
// export const setCheckBox = baniTitle => {
//   return {
//     type: 'SET_CHECKBOX',
//     theBani: baniTitle,
//   };
// };
