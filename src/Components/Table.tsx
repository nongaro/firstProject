import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ITableData } from "./MainPage";

interface IProps {
  data: ITableData[];
  showData: Function;
}
interface IState {
  //data: ITableData[];
}

export default class Table extends Component<IProps, IState> {
  topRow: string[] = ["Id", "Name", "Age", "Date", ""];

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    let topRow: JSX.Element | JSX.Element[] = [];
    let tableData: JSX.Element | JSX.Element[] = [];

    topRow = this.topRow.map((elem, i) => <th key={i}>{elem}</th>);
    tableData = this.props.data.map((elem, i) => (
      <tr key={i}>
        <td>{elem.id}</td>
        <td>{elem.name}</td>
        <td>{elem.age}</td>
        <td>{elem.date.toLocaleDateString()}</td>
        <td>
          <button
            className="btn btn-outline-dark"
            style={{
              borderRadius: "100%",
              border: "none",
              outline: "none !important",
              boxShadow: "none",
            }}
            onClick={() => this.props.showData(elem)}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <table className="table">
          <thead>
            <tr>{topRow}</tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      </div>
    );
  }
}
