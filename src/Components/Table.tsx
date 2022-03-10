import React, { Component } from "react";

interface IProps {}
interface IState {
  data: ITableData[];
}

interface ITableData {
  id: string;
  name: string;
  age: number;
}

export default class Table extends Component<IProps, IState> {
  topRow: string[] = ["id", "Name", "Age"];

  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    let query: string = `/api/tableData`;
    fetch(query)
      .then((res) => res.json())
      .then((resFin) => this.setState({ data: resFin }));
  }

  render() {
    let topRow: JSX.Element | JSX.Element[] = [];
    let tableData: JSX.Element | JSX.Element[] = [];

    topRow = this.topRow.map((elem, i) => <th key={i}>{elem}</th>);
    tableData = this.state.data.map((elem, i) => (
      <tr key={i}>
        <td>{elem.id}</td>
        <td>{elem.name}</td>
        <td>{elem.age}</td>
      </tr>
    ));

    return (
      <div>
        <table>
          <thead>
            <tr>{topRow}</tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      </div>
    );
  }
}
