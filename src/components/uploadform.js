import React, { Component } from 'react';
const utils = require("../util");

const ProgressBar = ({completed, total}) => {
  let percentDone = (completed / total * 100);
  if(isNaN(percentDone)) return "";
  
  let progressStyle = {
    width: percentDone + '%'
  };

  return (
    <div className="progress-bar">
      <div style={progressStyle}>
      </div>
    </div>
  );
}

class UploadForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input_file: null,
      error: null
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
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", process.env.REACT_APP_API_URL + "/files/new", true);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        this.setState({upload_total: e.total});
        this.setState({upload_completed: e.loaded});
      }
    }
    xhr.upload.onloadstart = (e) => {
      this.setState({upload_completed: 0});
    }

    xhr.upload.onloadend = (e) => {
      this.setState({upload_completed: e.loaded});
    }

    xhr.onload = () => {
      let res = JSON.parse(xhr.responseText);
      if(xhr.status === 200 && res.file) {
        window.location.href = "/files/" + res.file;
      } else if(res.error && res.error.max_file_size) {
        let max_size = utils.prettySize(res.error.max_file_size);
        let message = res.error.message + ". Maximum file size is " + max_size + ".";
        this.setState({error: message});
      }
    }

    xhr.send(formData);
  }

  handleFileChange(e) {
    const file = e.target.files[0];
    if(file) {
      this.setState({input_file: e.target.files[0]});
    }
  }

  render() {
    const input_file = this.state.input_file;
    const error = this.state.error;
    const completed = this.state.upload_completed;
    const total = this.state.upload_total;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="uploadform">
          <h1 className="text-center">Upload a file</h1>
          <p className="text-center">Drag and drop a file or click to select a file.</p>

          <div>
            <input type="file" id="file_input" multiple onChange={this.handleFileChange} />
          </div>
          
          {input_file && (
            <p className="top-buffer-lg text-center"><b>Chosen File:</b> {input_file.name}</p>
          )}
          
          {error && (
            <div className="error text-center">
              {error}
            </div>
          )}
        </div>

        {!error && 
          <div className="top-buffer">
            <ProgressBar completed={completed} total={total} />
          </div>
        }
        
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