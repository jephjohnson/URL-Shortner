import * as React from "react";
import { render } from "react-dom";
import { BitlyClient } from "bitly";
import "./styles.css";

const bitly = new BitlyClient("b1933e4c095feeb35496d0e4c69513380de262fc", {});
let result;

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      message: "",
      myresult: ""
    };
  }

  handleForm = async e => {
    try {
      result = await bitly.shorten(this.state.message);
      this.setState({
        myresult: result.url
      });
    } catch (e) {
      throw e;
    }
    return result;
  };

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter some text!"
          value={this.state.message}
          onChange={this.handleChange.bind(this)}
        />
        <input
          type="button"
          value="submit"
          onClick={this.handleForm.bind(this)}
        />
        <h3>
          <a href={this.state.myresult} target="_blank">
            {this.state.myresult}
          </a>
        </h3>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
