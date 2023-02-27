import { Component } from "react";

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: true,
      value: "This is read-only textbox",
    };
  }
  render() {
    return (
      <div>
        <br></br>
        <hr></hr>
        <div className="form-group">
          <div className="col-md-4">
            <label className="text-info m-1">PanCard</label>
            <div className="col-md-4">
            <input
              type="text"
              readOnly={this.state.readOnly}
              value={this.state.value}
            />{" "}
            <br></br>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="form-group">
          <div className="col-md-4">
            <label className="text-info m-1">Name</label>
            <input type="text" form-control />
          </div>
        </div>
      </div>
    );
  }
}

export default MyComponent;
