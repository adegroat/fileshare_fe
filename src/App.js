import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Files from './components/files';
import File from './components/file';
import UploadForm from './components/uploadform';

const dotenv = require("dotenv");
dotenv.config();

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container">
        <Route path="/" exact component={UploadForm} />
        <Route path="/files" exact component={Files} />
        <Route path="/files/:id" component={File} />
      </div>
    </Router>
  )
}

const Header = () => {
  return (
    <header>
      <div className="content">
        <img src="/logo.png" alt="" />
        <div className="title">File Sharing App</div>
        <div className="links">
          <Link to="/">Upload</Link>
          <Link to="/files">Files</Link>
        </div>
      </div>
    </header>
  );
}

export default App;
