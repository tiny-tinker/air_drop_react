import { handleActions } from 'redux-actions';
import CustomerStorage from './customerStorage'
import {
  getCustomerData,
  addSavedViewOption,
  getSavedViewOptions,
  changeViewOption,
  removeSavedViewOption,
  addSavedFilterOption,
  getSavedFilterOptions,
  changeFilterOption,
  removeSavedFilterOption
} from './customerAction';

const defaultState = {
  loading: true,
  error: null,
  customers: [],
  customerHeaders:[],
  savedViewOptions: [],
  chosenViewOption: null,
  savedFilterOptions: [],
  chosenFilterOption: {
    filterName:'',
    filterData: {
      ands:[],
      elements:[],
      selected:[],
      values:[],
      conditions:[]
    }
  }
};

const reducer = handleActions(
  {
    [getCustomerData](state) {
      // noinspection JSAnnotator
      return {
        ...state,
        loading: true,
        error: null
      };
    },
    GET_CUSTOMER_DATA_SUCCEEDED: (state, { customers, customerHeaders }) => ({
      ...state,
      loading: false,
      error: null,
      customers,
      customerHeaders
    }),
    GET_CUSTOMER_DATA_FAILED: (state, { error }) => ({
      ...state,
      loading: false,
      error
    }),
    [addSavedViewOption](state, {payload: {viewOption} }) {
      console.log(viewOption);
      let savedViewOptions = state.savedViewOptions;
      savedViewOptions.push(viewOption);
      CustomerStorage.updateSavedViewOptions(savedViewOptions);
      return {
        ...state,
        savedViewOptions: savedViewOptions,
        chosenViewOption: viewOption
      }
    },
    [getSavedViewOptions](state) {
      let savedViewOptions = CustomerStorage.getSavedViewOptions();
      let chosenViewOption = null;
      if (state.chosenViewOption == null) {
        if (savedViewOptions.length > 0) {
          chosenViewOption = savedViewOptions[0];
        }
      }

      return {
        ...state,
        savedViewOptions: savedViewOptions,
        chosenViewOption: chosenViewOption
      };
    },
    [changeViewOption](state, {payload: {optionName}}) {
      let chosenViewOption = state.savedViewOptions.filter(view => view.viewName === optionName)[0];
      return {
        ...state,
        chosenViewOption: chosenViewOption
      };
    },
    [removeSavedViewOption](state, {payload: {optionName}}) {
      let savedViewOptions = state.savedViewOptions;
      let chosenViewOption = savedViewOptions.filter(view => view.viewName === optionName)[0];
      const indexOfChosen = savedViewOptions.indexOf(chosenViewOption);
      if (indexOfChosen > -1) {
        savedViewOptions.splice(indexOfChosen, 1);
      }

      CustomerStorage.updateSavedViewOptions(savedViewOptions);
      return {
        ...state,
        savedViewOptions: savedViewOptions,
        chosenViewOption: null
      };
    },
    [addSavedFilterOption](state, {payload: {filterOption}}) {
      console.log(filterOption);
      let savedFilterOptions = state.savedFilterOptions;
      if (savedFilterOptions == null)
        savedFilterOptions = [];
      savedFilterOptions.push(filterOption);
      CustomerStorage.updateSavedFilterOptions(savedFilterOptions);
      return {
        ...state,
        savedFilterOptions: savedFilterOptions,
        chosenFilterOption: filterOption
      }
    },
    [getSavedFilterOptions](state) {
      let savedFilterOptions = CustomerStorage.getSavedFilterOptions();
      /*let chosenFilterOption = null;
      if (state.chosenFilterOption == null && savedFilterOptions != null) {
        if (savedFilterOptions.length > 0) {
          chosenFilterOption = savedFilterOptions[0];
        }
      }
*/
      return {
        ...state,
        savedFilterOptions: savedFilterOptions,
        //chosenFilterOption: chosenFilterOption
      };
    },
    [changeFilterOption](state, {payload: {optionName}}) {
      let chosenFilterOption = state.savedFilterOptions.filter(option => option.filterName === optionName)[0];
      return {
        ...state,
        chosenFilterOption: chosenFilterOption
      };
    },
    [removeSavedFilterOption](state, {payload: {optionName}}) {
      let savedFilterOptions = state.savedFilterOptions;
      let chosenFilterOption = savedFilterOptions.filter(option => option.filterName === optionName)[0];
      const indexOfChosen = savedFilterOptions.indexOf(chosenFilterOption);
      if (indexOfChosen > -1) {
        savedFilterOptions.splice(indexOfChosen, 1);
      }

      CustomerStorage.updateSavedFilterOptions(savedFilterOptions);
      return {
        ...state,
        savedFilterOptions: savedFilterOptions,
        chosenFilterOption: null
      };
    }
  },
  defaultState
);

export default reducer;
