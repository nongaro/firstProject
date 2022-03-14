//import { format } from "date-fns";
import React, { Component } from "react";
import SendPage from "./SendPage";
import Table from "./Table";

interface IProps {}
interface IState {
  data: ITableData[];
}

export interface ITableData {
  id: string;
  name: string;
  age: number;
  date: Date;

  [key: string]: any;
}

export default class MainPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.showData = this.showData.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.postData = this.postData.bind(this);
    this.getDataFromForm = this.getDataFromForm.bind(this);

    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    let query: string = `/api/tableData`;
    fetch(query)
      .then((res) => res.json())
      .then((resFin) => {
        console.log(resFin);
        this.setState({ data: this.convertDate(resFin) });
      });

    //   let start = new Date(2022, 4, 1);
    //   let end = new Date(2022, 8, 1);
    //   let query2: string =
    //     `/api/tableData?fromDate=` +
    //     format(start, `yyyy-MM-dd`) +
    //     `&toDate=` +
    //     format(end, `yyyy-MM-dd`);
    //   fetch(query2)
    //     .then((res) => res.json())
    //     .then((resFin) => {
    //       //console.log(resFin);
    //       this.setState({ data: this.convertDate(resFin.data) });
    //     });
  }

  convertDate(datas: ITableData[]) {
    //console.log(datas);
    if (datas) {
      let convertedData: ITableData[] = datas.map((data: ITableData) => {
        return {
          id: data.id,
          name: data.name,
          age: data.age,
          date: new Date(data.date),
        };
      });

      //console.log(convertedData);

      return convertedData;
    } else {
      return [];
    }
  }

  showData(elem: ITableData) {
    console.log(elem);
  }

  async getDataFromForm(elem: ITableData) {
    console.log(elem);
    let result = await this.postData(elem);
    if (result) {
      this.setState({ data: result });
    }
  }

  async postData(elem: ITableData) {
    let data: ITableData[] = [];
    await fetch(`/api/tableData`, {
      method: "POST",
      body: JSON.stringify(elem),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res: ITableData[]) => (data = this.convertDate(res)));

    return new Promise<ITableData[]>((resolve) => {
      resolve(data);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Table data={this.state.data} showData={this.showData} />
          <SendPage saveData={this.getDataFromForm} />
        </div>
      </div>
    );
  }
}
