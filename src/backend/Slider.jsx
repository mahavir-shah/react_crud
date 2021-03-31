import React, { useState,useEffect } from "react";
import Cropper from "react-cropper";
import { toast } from 'react-toast-notification';
import axios from 'axios';
import "cropperjs/dist/cropper.css";
import "./../assets/slider.css";
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid } from '@material-ui/data-grid';

const Slider = () => {    

  const columns = [
    { field: 'id', headerName: 'ID',  type: 'number', width: 70 },
    { field: 'imagename', headerName: 'Image', width: 430 },
    { field: 'action', headerName: 'Action', width: 430 },
  ];
  //<DeleteIcon/>
  useEffect(()=>{
    getImageList();
  },[]);

  const [Image, setImage] = useState("");
  const [ImageErr, SetImageErr] = useState("");
  const [ImageList,SetImageList] = useState([]);

  const getImageList = () => {
    axios.get('http://localhost:5000/api/getSliderImage').then(function(response){
          console.log(response);
          SetImageList(response.data); 
      }).catch(function(error){
          // handle error
          console.log(error);
      }).then(function(){
          // always executed
      });
  }

  const onChange = (e) => { 
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  }; 

  const UploadImage = () =>{
    console.log("Image :"+Image);
    if(Image == ""){
      SetImageErr("Please select image.");
      return;
    }  
    SetImageErr(""); 
    axios.post('http://localhost:5000/api/upload/image',{
        image: Image
      }).then(function(response){
          console.log(response);
          toast('Image Uploaded Successfully!', {
              status: 'Success', 
              type: 'success',
              autoHide: false,
              delay: '7000'
          })
      }).catch(function(error){
          // handle error
          console.log(error);
      }).then(function(){
          // always executed
      });
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-12 form-group">
          <div className="card">
            <div className="card-header"><h4>Slider</h4></div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 form-group">
                  <label className="control-label">Select Image:</label>
                </div>
                <div className="col-md-6 form-group">
                  <input type="file" onChange={onChange} className="form-control" />
                  <span className="text text-danger">{ImageErr}</span>
                </div>
              </div> 
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-12 form-group">
                  <button type="button" className="btn btn-primary" onClick={UploadImage}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div> 

        <div className="col-md-12 form-group">
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={ImageList} columns={columns} pageSize={5} checkboxSelection />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slider;