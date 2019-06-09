module.exports = {
  prettySize: (size) => {
    let numDigits = 2;
    if(size >= 1024*1024*1024) return (size/(1024*1024*1024)).toFixed(numDigits) + " GB";
    else if(size >= 1024*1024) return (size/(1024*1024)).toFixed(numDigits) + " MB";  
    else if(size >= 1024) return (size/1024).toFixed(numDigits) + " KB";
    else return size + " bytes";  
  }
};