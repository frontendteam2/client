import React from "react";
import { Form } from "react-bootstrap"
import axios from "axios";

export default function Upload({getImage}){
  const formData = new FormData();

  const FileUpload = (e) => {

    formData.append("file", e.target.files[0])

    // 선택된 파일을 서버로 전송
    axios
    .post('http://localhost:8000/imgupload', formData)
    .then((data) => {
      getImage(data.data);
    })
    .catch(err => console.log(err))
  }
  
  return(
    <>
      <Form.Control
        type='file'
        className="rounded-xl text-sm py-4 block flex-1 bg-stone-100 px-2 mt-5"
        accept='image/*'  
        onChange={(e) => { FileUpload(e) }}>
      </Form.Control>
    </>
  )
}