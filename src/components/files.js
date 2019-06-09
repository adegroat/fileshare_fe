import React, { Component } from 'react';

const File = ({file}) => {
  return (
    <div className="file">
      <span className="title">
        <a href={"files/" + file._id}>{file.filename}</a>
      </span>
    </div>
  );
};

class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      files: [],
      loading: true
    }
  }

  componentDidMount() {
    fetch("http://localhost:9000/files")
    .then((res) => {
      if(res.status !== 200) {
        this.setState({error: "Unauthorized!"})
      }
      return res.json()
    })
    .then((data) => {
      this.setState({files: data, loading: false})
    })
    .catch(console.log);
  }


  render() {
    const files = this.state.files;

    if(this.state.loading) return (<h3>Loading...</h3>);
    else if(files.length === 0) return (<h3>No Files.</h3>)
    else return (
      <div className="files">
        <h2>{files.length} Files</h2>
        {files.map((file) => (
          <File key={file._id} file={file} />
        ))}
      </div>
    );
  }
}

export default Files