import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Customers.css'
import {
  getCustomerData,
  changeViewOption,
  addSavedViewOption,
  getSavedViewOptions,
  removeSavedViewOption
}from '../../modules/customer/customerAction';
import ListView from '../components/ListView/ListView';

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.props.customerActions.getCustomerData();
    this.props.customerActions.getSavedViewOptions();
  }
  render() {
    const {
      listViewHeaders,
      listViewRawData,
      savedViewOptions,
      chosenViewOption
    } = this.props;
    return(
      <div className="customers">
        <ListView
          handleViewSelectChange={(optionName) => { this.props.customerActions.changeViewOption(optionName); }}
          handleSaveViewClick={(viewOption) => { this.props.customerActions.addSavedViewOption(viewOption); }}
          handleRemoveSavedViewOption={(optionName) => {this.props.customerActions.removeSavedViewOption(optionName); }}
          listViewHeaders = {listViewHeaders}
          listViewRowData = {listViewRawData}
          savedViewOptions={savedViewOptions}
          chosenViewOption={chosenViewOption}
        />
      </div>
    )
  }
}


export default connect(
  state => ({
    listViewHeaders: state.customer.customerHeaders,
    listViewRawData: state.customer.customers,
    savedViewOptions: state.customer.savedViewOptions,
    chosenViewOption: state.customer.chosenViewOption
  }),
  dispatch => ({
    customerActions: bindActionCreators({
        getCustomerData,
        changeViewOption,
        addSavedViewOption,
        getSavedViewOptions,
        removeSavedViewOption
      },
      dispatch
    )
  })
)(Customers);
