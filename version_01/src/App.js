import React from "react";
import "./App.css";
import Background from "./panel.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stones: Array(361).fill(null),
      counters: Array(361).fill(null),
      nextStone: "blank",
      counter: 0,
      cntVisible: "invisible",
      deadStoneBlack: 0,
      deadStoneWhite: 0,
    };
  }

  render() {
    return (
      <div>
        <div className="panel-line">
          <h1>JS-Go</h1>
          <div className="panel-pointer">
            <table
              className="pointer-table"
              style={{ backgroundImage: "url(" + Background + ")" }}
            >
              <tbody>
                <Table
                  onClick={(index) => this.changeStone(index)}
                  stones={this.state.stones}
                  counters={this.state.counters}
                  cntVisible={this.state.cntVisible}
                />
              </tbody>
            </table>
          </div>
          <div className="panel-control">
            <ControlCard title="Next Stone" body={this.displayNext()} />
            <ControlCard
              title="Counter"
              body={
                <button
                  className={"btn " + this.state.cntVisible}
                  onClick={() => this.counterView()}
                >
                  {this.state.cntVisible.toUpperCase()}
                </button>
              }
            />
            <ControlCard
              title="Reset"
              body={
                <button className="btn" onClick={() => this.resetApp()}>
                  Reset
                </button>
              }
            />
            <ControlCard
              title="Save"
              body={<button className="btn">Save</button>}
            />
          </div>
        </div>
      </div>
    );
  }

  resetApp() {
    this.setState({
      stones: Array(361).fill(null),
      counters: Array(361).fill(null),
      nextStone: "blank",
      counter: 0,
      cntVisible: "invisible",
      deadStoneBlack: 0,
      deadStoneWhite: 0,
    });
  }

  counterView() {
    if (this.state.cntVisible === "visible") {
      this.setState({
        cntVisible: "invisible",
      });
    } else {
      this.setState({
        cntVisible: "visible",
      });
    }
  }

  displayNext() {
    if (this.state.nextStone === "black" || this.state.nextStone === "blank") {
      return <button className="btn stone-next black">B</button>;
    } else {
      return <button className="btn stone-next white">W</button>;
    }
  }

  changeStone(index) {
    const stones = this.state.stones.concat();
    const counters = this.state.counters.concat();
    var stone = "blank";
    var counter = this.state.counter + 1;
    if (this.state.nextStone === "black" || this.state.nextStone === "blank") {
      stone = "black";
      this.setState({ nextStone: "white" });
    } else if (this.state.nextStone === "white") {
      stone = "white";
      this.setState({ nextStone: "black" });
    }

    stones[index] = stone;
    counters[index] = counter;

    this.setState({
      stones: stones,
      counters: counters,
      counter: counter,
    });
  }
}

function ControlCard(props) {
  return (
    <div className="control-card">
      <div className="card-title">
        <label>{props.title}</label>
      </div>
      <div className="card-body">{props.body}</div>
    </div>
  );
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
          counters={props.counters}
          cntVisible={props.cntVisible}
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
        key={props.rowNum * 19 + i}
        onClick={(index) => props.onClick(index)}
        stones={props.stones}
        counters={props.counters}
        cntVisible={props.cntVisible}
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
      counter: 0,
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
        <Stone
          stone={this.props.stones[index]}
          counter={this.props.counters[index]}
          cntVisible={this.props.cntVisible}
        />
      </td>
    );
  }
}

function Stone(props) {
  if (props.stone === "white") {
    if (props.cntVisible === "visible") {
      return <div className="stone white">{props.counter}</div>;
    } else {
      return <div className="stone white"></div>;
    }
  } else if (props.stone === "black") {
    if (props.cntVisible === "visible") {
      return <div className="stone black">{props.counter}</div>;
    } else {
      return <div className="stone black"></div>;
    }
  } else {
    return <div className="stone blank"></div>;
  }
}

export default App;
