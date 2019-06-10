import React, { Component } from 'react';

class UploadForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input_file: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const file = document.getElementById("file_input").files[0];

    if(file === undefined) return;

    const formData = new FormData();
    formData.append('file', file);
    
    fetch(process.env.REACT_APP_API_URL + "/files/new", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      if(res.file) window.location.href = "/files/" + res.file;
    });
  }

  handleFileChange(e) {
    const file = e.target.files[0];
    if(file) {
      this.setState({input_file: e.target.files[0]});
    }
  }

  render() {
    const input_file = this.state.input_file;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="uploadform">
          <h1 className="text-center">Upload a file</h1>
          <p className="text-center">Drag and drop a file or click to select a file.</p>

          <div>
            <input type="file" id="file_input" multiple onChange={this.handleFileChange} />
          </div>
          
          {input_file && (
            <p className="top-buffer-lg text-center"><b>File:</b> {input_file.name}</p>
          )}
        </div>

        {input_file && (
          <div className="top-buffer">
            <input type="submit" value="Upload" className="button" />
          </div>
        )}
      </form>
    );
  }
}

export default UploadForm;