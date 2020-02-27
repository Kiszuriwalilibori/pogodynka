import * as actions from './actions';

const initialState = {
  isLoading: false,
  items: [],
  isError: false,
  columnSortBy: null,
  isSortDescending: false,
  isHiddenInputForm: true,
  isHiddenAddUserButton: false,
  isHiddenAddedUserMsg: true,
  isNotLimitReached: true,
  nonSortableColumns: new Set([0]),
  attemptDuplicate: false,
  limit: 5,

  currentCity:'',
  currentCityData:{},
  Forecast:[],
  errorCity:'',
  errorMessage:'',
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case actions.GET_DATA_REQUESTED:
      return {
        ...state, isLoading: true,
      };
    
    case actions.GET_DATA_DONE:
      return {
        ...state, isLoading: false, items: action.payload,
      };
      
    case actions.GET_CITY_DATA_RECEIVED:
        return {
          ...state, isLoading: false, currentCityData: action.payload.currentCityData, currentCity: action.payload.currentCity,
        } 
    case actions.GET_CITY_FORECAST_RECEIVED:
      
        return {
          ...state, isLoading: false, Forecast: action.payload,
        } 
    case actions.GET_GROUP_RECEIVED:
  
      return {
        ...state, isLoading: false, Group: action.payload,
      } 


    case actions.GET_CITIES_DATA_RECEIVED:
      
      return {
        ...state, isLoading: false, citiesData: action.payload,
      } 
  
      
    case actions.GET_CITY_DATA_FAILED:
      
        return {
         ...state, isLoading: false, errorMessage: action.payload, isError: true,
        } 

    case actions.GET_DATA_FAILED:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default reducer;
