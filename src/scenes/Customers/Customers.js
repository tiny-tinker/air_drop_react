import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Customers.css'
import {
  getCustomerData,
  changeViewOption,
  addSavedViewOption,
  getSavedViewOptions,
  removeSavedViewOption,
  addSavedFilterOption,
  getSavedFilterOptions,
  changeFilterOption,
  removeSavedFilterOption
} from '../../modules/customer/customerAction';
import ListView from '../components/ListView/ListView';

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.props.customerActions.getCustomerData();
    this.props.customerActions.getSavedViewOptions();
    this.props.customerActions.getSavedFilterOptions();
  }
  render() {
    const {
      listViewHeaders,
      listViewRowData,
      savedViewOptions,
      chosenViewOption,
      savedFilterOptions,
      chosenFilterOption
    } = this.props;
    return(
      <div className="customers">
        <ListView
          handleViewSelectChange={(optionName) => { this.props.customerActions.changeViewOption(optionName); }}
          handleSaveViewClick={(viewOption) => { this.props.customerActions.addSavedViewOption(viewOption); }}
          handleRemoveSavedViewOption={(optionName) => {this.props.customerActions.removeSavedViewOption(optionName); }}
          handleFilterSelectChange={(optionName) => {this.props.customerActions.changeFilterOption(optionName); }}
          handleSaveFilterClick={(filterOption) =>{ this.props.customerActions.addSavedFilterOption(filterOption); }}
          handleRemoveSavedFilterOption={(optionName) => {this.props.customerActions.removeSavedFilterOption(optionName); }}
          listViewHeaders = {listViewHeaders}
          listViewRowData = {listViewRowData}
          savedViewOptions={savedViewOptions}
          chosenViewOption={chosenViewOption}
          savedFilterOptions={savedFilterOptions}
          chosenFilterOption={chosenFilterOption}
        />
      </div>
    )
  }
}


export default connect(
  state => ({
    listViewHeaders: state.customer.customerHeaders,
    listViewRowData: state.customer.customers,
    savedViewOptions: state.customer.savedViewOptions,
    chosenViewOption: state.customer.chosenViewOption,
    savedFilterOptions: state.customer.savedFilterOptions,
    chosenFilterOption: state.customer.chosenFilterOption
  }),
  dispatch => ({
    customerActions: bindActionCreators({
        getCustomerData,
        changeViewOption,
        addSavedViewOption,
        getSavedViewOptions,
        removeSavedViewOption,
        addSavedFilterOption,
        getSavedFilterOptions,
        changeFilterOption,
        removeSavedFilterOption
      },
      dispatch
    )
  })
)(Customers);
