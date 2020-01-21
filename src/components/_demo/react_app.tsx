import React from "react";

class App extends React.Component<{}, {}> {
  constructor(props: {}) {super(props);}

  componentDidMount() {
    console.log("hello react.")
  }

  handleUserInfo() {
    console.log("调用HandleUserInfo");
  }

  render() {
    return (
      <div>
        my react app.
        <button onClick={this.handleUserInfo}> 点击我 </button>
      </div>
    );
  }
}

export default App;