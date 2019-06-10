import React, { Component } from 'react'
const util = require("../util");

class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      loading: true
    }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + "/files/" + this.props.match.params.id)
    .then(res => res.json())
    .then(res => {
      this.setState({file: res, loading: false});
    })
  }

  render() {
    if(this.state.loading) {
      return (<h1>Loading...</h1>);
    } else {
      const file = this.state.file;
      return (
        <div>
          <h2>{file.filename}</h2>
          <p><b>Size:</b> {util.prettySize(file.size)}</p>
          <p><b>Uploaded:</b> {new Date(file.upload_time).toGMTString()}</p>
          <a
            href={process.env.REACT_APP_API_URL + "/files/" + file._id + "?dl=1"}
            target="_blank" rel="noopener noreferrer"
            className="button button-large">
          Download
          </a>
        </div>
      );
    }
  }
}

export default File