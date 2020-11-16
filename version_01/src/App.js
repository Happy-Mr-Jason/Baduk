import React from "react";
import "./App.css";
import Background from "./panel.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stones: Array(361).fill(null),
      nextStone: "blank",
      deadStoneBlack: 0,
      deadStoneWhite: 0,
    };
  }

  render() {
    return (
      <div>
        <h1>JS-Go</h1>
        <div className="panel-line">
          <div className="panel-pointer">
            <table
              className="pointer-table"
              style={{ backgroundImage: "url(" + Background + ")" }}
            >
              <tbody>
                <Table
                  onClick={(index) => this.changeStone(index)}
                  stones={this.state.stones}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  changeStone(index) {
    const stones = this.state.stones.concat();
    var stone = "blank";

    if (this.state.nextStone === "black" || this.state.nextStone === "blank") {
      stone = "black";
      this.setState({ nextStone: "white" });
    } else if (this.state.nextStone === "white") {
      stone = "white";
      this.setState({ nextStone: "black" });
    }

    stones[index] = stone;
    this.setState({ stones: stones });
  }
}

function Table(props) {
  const rows = [];
  for (let i = 0; i < 19; i++) {
    rows.push(
      <tr className="line" key={i}>
        <TableRows
          rowNum={i}
          stones={props.stones}
          onClick={(index) => props.onClick(index)}
        />
      </tr>
    );
  }
  return rows;
}

function TableRows(props) {
  const datas = [];
  for (let i = 0; i < 19; i++) {
    datas.push(
      <TablePointer
        rowNum={props.rowNum}
        colNum={i}
        key={i}
        onClick={(index) => props.onClick(index)}
        stones={props.stones}
      />
    );
  }

  return datas;
}

class TablePointer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stone: "blank",
    };
  }

  render() {
    var index = this.props.rowNum * 19 + this.props.colNum;
    return (
      <td
        className="pointer"
        data-rownum={this.props.rowNum}
        data-colnum={this.props.colNum}
        onClick={() => this.props.onClick(index)}
      >
        <Stone stone={this.props.stones[index]} />
      </td>
    );
  }
}

function Stone(props) {
  if (props.stone === "white") {
    return <div className="stone white"></div>;
  } else if (props.stone === "black") {
    return <div className="stone black"></div>;
  } else {
    return <div className="stone blank"></div>;
  }
}

export default App;
