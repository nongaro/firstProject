import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ITableData } from "./MainPage";

interface IProps {
  saveData: Function;
}
interface IState {
  data: ITableData;
  isEmpty: boolean;
}

export default class SendPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.sendData = this.sendData.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.checkEmptyFields = this.checkEmptyFields.bind(this);

    this.state = {
      data: { id: "", name: "", age: 0, date: new Date() },
      isEmpty: true,
    };
  }

  onChangeData<T>(key: string, value: T | number) {
    let tableData = {
      ...this.state.data,
    };

    tableData[key] = value;

    this.setState({
      data: tableData,
      isEmpty: this.checkEmptyFields(tableData),
    });
  }

  checkEmptyFields(req: ITableData) {
    let isEmpty = false;
    if (req.id != null) {
      if (this.isNullOrWhiteSpace(req.id)) isEmpty = true;
      if (this.isNullOrWhiteSpace(req.name)) isEmpty = true;
      if (!req.age) isEmpty = true;

      if (isEmpty) return isEmpty;
    }

    return isEmpty;
  }

  isNullOrWhiteSpace(str: string) {
    return str === undefined || str === null || str.trim() === "";
  }

  sendData() {
    this.props.saveData(this.state.data);
    this.setState({
      data: { id: "", name: "", age: 0, date: new Date() },
      isEmpty: true,
    });
  }

  render() {
    return (
      <div>
        <section className="item-off-canvas-component">
          <label>
            ID:
            <input
              type="text"
              value={this.state.data.id}
              onChange={(e) => this.onChangeData("id", e.target.value)}
            />
          </label>
        </section>
        <section className="item-off-canvas-component">
          <label>
            NAME:
            <input
              type="text"
              value={this.state.data.name}
              onChange={(e) => this.onChangeData("name", e.target.value)}
            />
          </label>
        </section>
        <section className="item-off-canvas-component">
          <label>
            AGE:
            <input
              type="number"
              value={this.state.data.age}
              onChange={(e) => this.onChangeData("age", e.target.value)}
            />
          </label>
        </section>
        <button
          type="button"
          className="btn btn-outline-dark"
          disabled={this.state.isEmpty}
          onClick={this.sendData}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Data
        </button>
      </div>
    );
  }
}
