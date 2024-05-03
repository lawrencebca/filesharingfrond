import { useRef, useState, useEffect } from 'react';
import './App.css';
import { uploadFile } from './services/api';

import fileSharePic from "./fileSharing.webp"

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [load, setLoader] = useState(false);


  const fileInputRef = useRef();

  // const logo = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setLoader(true);
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        if (response.path) {
          setLoader(false);
          setResult(response.path);
        }

      }
    }
    getImage();
  }, [file])

  // const onUploadClick = () => {
  //   // fileInputRef.current.click();
  // }

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("URL copied to clipboard!");
  }


  return (
    <div className='container mt-5'>
      <div className='wrapper'>
        {/* <button onClick={() => onUploadClick()}>Upload</button> */}
        <h1>File sharing app</h1>
        <div class="input-group mb-3 mt3" style={{ width: "80%" }}>
          <label class="input-group-text bg-primary text-light" for="inputGroupFile01">Upload</label>
          <input type="file" ref={fileInputRef}
            // style={{display: 'none'}}
            onChange={(e) => setFile(e.target.files[0])} class="form-control" id="inputGroupFile01" />
        </div>
        {/* <input
          type="file"
          ref={fileInputRef}
          // style={{display: 'none'}}
          onChange={(e) => setFile(e.target.files[0])}
        /> */}
        {
          load ? (<div class="spinner-grow bg-primary" style={{ width: "3rem", height: "3rem" }} role="status">
            <span class="visually-hidden">Loading...</span>
          </div>) : (
            <a href={result} target="_blank">{result}</a>
          )
        }
        <button className='btn-primary pb-2' onClick={() => copyUrlToClipboard()}>copy</button>
      </div>
    </div>
  );
}

export default App;
