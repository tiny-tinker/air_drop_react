import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Jumbotron, Container } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import FaFilter from 'react-icons/lib/fa/filter';
import { Collapse } from 'react-collapse';
import { AgGridReact } from 'ag-grid-react';
import "../../../../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../../../../node_modules/ag-grid/dist/styles/theme-fresh.css";
import Dialog from 'material-ui/Dialog';
import './ListView.css';

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFilter: false,
      isShowViewAddButton: false,
      isShowFilterAddButton: false,
      isShowAddViewModal: false
    };
    this.refViewSelect = null;
    this.refViewAddButton = null;
    this.refFilterSelect = null;
    this.refFilterAddButton = null;

    this.toggleFilter = this.toggleFilter.bind(this);

    // View Select Event Listeners
    this.handleViewSelectChange = this.handleViewSelectChange.bind(this);
    this.handleViewSelectOpen = this.handleViewSelectOpen.bind(this);
    this.handleViewSelectClose = this.handleViewSelectClose.bind(this);
    this.handleViewSelectAddButtonClick = this.handleViewSelectAddButtonClick.bind(this);

    // Filter Select Event Listeners
    this.handleFilterSelectChange = this.handleFilterSelectChange.bind(this);
    this.handleFilterSelectOpen = this.handleFilterSelectOpen.bind(this);
    this.handleFilterSelectClose = this.handleFilterSelectClose.bind(this);
    this.handleFilterSelectAddButtonClick = this.handleFilterSelectAddButtonClick.bind(this);

    // Add View Modal Event Listeners
    this.handleViewAddModalClose = this.handleViewAddModalClose.bind(this);
    this.handleSaveView = this.handleSaveView.bind(this);

    this.handleAddCriteria = this.handleAddCriteria.bind(this);

    // AG GRID EVENT Listeners
    this.onGridReady = this.onGridReady.bind(this);
    this.onGridFilterChanged = this.onGridFilterChanged.bind(this);
  }

  //------------------ Event Listeners ------------------
  toggleFilter() {
    this.setState({isShowFilter: !this.state.isShowFilter});
  }

  handleViewSelectChange(event) {
    if (event != null) {
      this.props.handleViewSelectChange(event.value);
    } else {
      this.props.handleRemoveSavedViewOption(this.props.chosenViewOption.viewName);
    }
  }

  handleViewSelectOpen() {
    this.setState({isShowViewAddButton: true});
    const selectOptionDivIndex = this.refViewSelect.control.parentElement.childNodes.length;
    const height = this.refViewSelect.control.scrollHeight + this.refViewSelect.control.parentElement.childNodes[selectOptionDivIndex - 1].scrollHeight;
    this.refViewAddButton.style.position = 'absolute';
    this.refViewAddButton.style.top = height + 'px';
    this.refViewAddButton.style.left = '0';
    this.refViewAddButton.style.width = '100%';
  }
  handleViewSelectClose() {
    let setStateDelay = ()=>{ this.setState({ isShowViewAddButton: false }); };
    setStateDelay = setStateDelay.bind(this);
    setTimeout( setStateDelay, 150);
  }

  handleViewSelectAddButtonClick() {
    this.setState({ isShowAddViewModal: true });
  }

  handleFilterSelectChange() {

  }

  handleFilterSelectOpen() {
    this.setState({isShowFilterAddButton: true});
    const selectOptionDivIndex = this.refFilterSelect.control.parentElement.childNodes.length;
    const height = this.refFilterSelect.control.scrollHeight + this.refFilterSelect.control.parentElement.childNodes[selectOptionDivIndex - 1].scrollHeight;
    this.refFilterAddButton.style.position = 'absolute';
    this.refFilterAddButton.style.top = height + 'px';
    this.refFilterAddButton.style.left = '0';
    this.refFilterAddButton.style.width = '100%';
  }

  handleFilterSelectClose() {
    let setStateDelay = ()=>{ this.setState({ isShowFilterAddButton: false }); };
    setStateDelay = setStateDelay.bind(this);
    setTimeout( setStateDelay, 150);
  }

  handleFilterSelectAddButtonClick() {
    console.log('Filter Add button clicked');
  }

  handleAddCriteria() {

  }

  handleFilter() {

  }

  //--- Add View Modal Events---
  handleViewAddModalClose() {
    this.setState({ isShowAddViewModal: false });
  }
  handleSaveView() {
    if (this.viewModalInput.value) {
      const viewName = this.viewModalInput.value;
      let chosenColumns = [];
      this.columnApi.getColumnState().forEach(function(column) {
        chosenColumns.push(column);
      });
      let viewOption = {
        viewName,
        chosenColumns
      };
      this.props.handleSaveViewClick(viewOption);
    }
    // Close Modal
    this.handleViewAddModalClose();
  }
  //------ AG GRID EVENT LISTENRES
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    if (this.props.chosenViewOption != null)
      this.columnApi.setColumnState(this.props.chosenViewOption.chosenColumns);
  }
  onGridFilterChanged() {

  }
  //================================================

  renderFilterWidget() {

  }

  render() {

    const {
      savedViewOptions,
      savedFilterOptions,
      chosenViewOption,
      chosenFilterOption,
      listViewHeaders,
      listViewRowData
    } = this.props;

    //----- Make the options of saved view selects
    let viewSelectOptions = [];
    let chosenViewSelectOption = '';
    if (chosenViewOption != null)
      chosenViewSelectOption = chosenViewOption.viewName;

    savedViewOptions.map(
      (view) => viewSelectOptions.push({
        value:view.viewName,
        label:view.viewName
      })
    );
    //---------

    // Set the Column view options
    if (this.columnApi != null){
      if (chosenViewOption != null) {
        this.columnApi.setColumnState(chosenViewOption.chosenColumns);
      }
    }

    if (this.gridApi != null)
      this.gridApi.sizeColumnsToFit();
    return(
      <div className="listView">
        <Row className="listView-header">
          <Col xs="2" className="listView-filterContainer">
            <a href="#">
              <FaFilter
                className="listView-filterIcon"
                color={!this.state.isShowFilter?'Grey':'Green'}
                size="50"
                onClick={this.toggleFilter}
              />
            </a>
          </Col>
          <Col xs="6" className="listView-title text-center">
            <h2>Terminals</h2>
          </Col>
          <Col xs="2" className="text-left p-0">
            <Select
              name="chooseView"
              options={viewSelectOptions}
              onChange={this.handleViewSelectChange}
              onOpen={this.handleViewSelectOpen}
              onClose={this.handleViewSelectClose}
              value={chosenViewSelectOption}
              placeholder="Choose View"
              autosize={true}
              ref={(ref) => this.refViewSelect = ref}
            />
            <button
              ref={(ref) => this.refViewAddButton = ref}
              className="btn-success btn-add"
              onClick={this.handleViewSelectAddButtonClick}
              hidden={this.state.isShowViewAddButton?'':'hidden'}
            >
              +Add
            </button>
          </Col>
          <Col xs="2" className="text-left p-0">
            <Select
              name="hidcols"
              options={savedFilterOptions}
              value={chosenFilterOption}
              onChange={this.handleFilterSelectChange}
              onOpen={this.handleFilterSelectOpen}
              onClose={this.handleFilterSelectClose}
              placeholder="Choose Filter"
              autosize={true}
              ref={(ref) => this.refFilterSelect = ref}
            />
            <button
              ref={(ref) => this.refFilterAddButton = ref}
              className="btn-success btn-add"
              onClick={this.handleFilterSelectAddButtonClick}
              hidden={this.state.isShowFilterAddButton?'':'hidden'}
            >
              +Add
            </button>
          </Col>
        </Row>
        <Collapse isOpened={this.state.isShowFilter}>
          <Row>
            <Col xs="12" className="text-left">
              <Button className="mr-5" color="success" onClick={this.handleAddCriteria}>New Criteria</Button>
              <Button color="success" onClick={this.handleFilter}>Filter</Button>
            </Col>
          </Row>
          <Jumbotron className="pt-4 pb-4">
            <Container>

            </Container>
          </Jumbotron>
        </Collapse>
        <div className="ag-fresh listView-container">
          <AgGridReact
            columnDefs={listViewHeaders}
            rowData={listViewRowData}
            enableFilter={true}
            enableColResize={true}
            enableSorting={true}
            floatingFilter={true}
            showToolPanel={true}
            onGridReady={this.onGridReady}
            onGridSizeChanged={this.onGridReady}
            onColumnVisible={this.onGridFilterChanged}
          >
          </AgGridReact>
        </div>
        <div className="listView-modal-container">
          <Dialog
            title={
              <div>
                Add View
                <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' className="close-img" onClick={this.handleViewAddModalClose}/>
              </div>
            }
            modal={false}
            open={this.state.isShowAddViewModal}
            onRequestClose={this.handleViewAddModalClose}
          >
            <label>View Name:<input type="text" name="viewname"  ref={input => {
              this.viewModalInput= input;
            }}/></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button color="success" onClick={this.handleSaveView}>Save</Button>{' '}
          </Dialog>
        </div>
      </div>
    )
  }
}

ListView.propTypes = {
  handleViewSelectChange: PropTypes.func,
  handleSaveViewClick: PropTypes.func,
  handleRemoveSavedViewOption: PropTypes.func
};

export default ListView;