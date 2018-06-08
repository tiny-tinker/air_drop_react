import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Terminals.css'
import { getTerminalData }from '../../modules/terminal/terminalAction';
import ListView from '../components/ListView/ListView';

class Terminals extends React.Component {
  constructor(props) {
    super(props);
    this.props.terminalActions.getTerminalData();
  }

  render() {
    return(
      <div className="terminals">
        <ListView/>
      </div>
    )
  }
}
export default connect(
  state => ({ listHeaders: state.customer.listHeaders, listData: state.customer.listData}),
  dispatch => ({
    terminalActions: bindActionCreators(
      {
        getTerminalData
      },
      dispatch
    )
  })
)(Terminals);