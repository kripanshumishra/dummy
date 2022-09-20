import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function ProductUpload() {
  const [upladingImg, setUploadingImg] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const name = useRef();
  const description = useRef();
  const richDescription = useRef();
  const price = useRef();
  const countInStock = useRef();
  const countryOfOrigin = useRef()
  const categoryRef  = useRef()
  const details = useRef()
  const [loading, setLoading] = useState(false)
  const [ category, setCategory ] = useState([{_id:false, name : "please wait"}])
  

  useEffect(() => {
    axios.get("/getcategory")
    .then(res=>{
      if(res.status==200){
        setCategory(res.data.response)
        console.log(res.data.response)
      }
    })
  }, [])
  

 
  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb");
    } else {
      setThumbnail(file);
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", thumbnail);

    //data.append("upload_preset", "your-preset-here"); // this tell api actually its you
    data.append("upload_preset", "e-commerce");
    try {
      setUploadingImg(true);
      let res = await fetch(
        // "https://api.cloudinary.com/v1_1/your-username-here/image/upload",
        // You can get your user name from Dashbord --> account Detail --> Cloud Name == your user name
        "https://api.cloudinary.com/v1_1/db0vkpdye/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      console.log(urlData);
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }
  return (
    <div
      style={{ width: "80%", marginLeft: "auto", border: "2px solid black" }}
      className="container mt-4"
    >
      <h1>Add Product</h1>

      <div className="mb-3">
        <label htmlFor="Productname" className="form-label">
          product name
        </label>
        <input ref={name} type="text" className="form-control" id="Productname" />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          description
        </label>
        <input
          ref={description}
          type="text"
          className="form-control"
          id="description"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="richDescription" className="form-label">
          richDescription
        </label>
        <input
          ref={richDescription}
          type="text"
          className="form-control"
          id="richDescription"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          price
        </label>
        <input
          ref={price}
          type="text"
          className="form-control"
          id="richDescription"
        />
      </div>
      <div className="mb-3">
      <label htmlFor="category" className="form-label">Select category</label>
      <select id="category" className="form-select" ref={ categoryRef }>
        {category.map((x,i)=><option key={i} value={x._id}>{x.name}</option>)}\
      </select>
    </div>
      <div className="mb-3">
        <label htmlFor="countInStock" className="form-label">
          countInStock
        </label>
        <input
          ref={countInStock}
          type="text"
          className="form-control"
          id="countInStock"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="countryOfOrigin" className="form-label">
          Country Of Origin
        </label>
        <input
          ref={countryOfOrigin}
          type="text"
          className="form-control"
          id="countryOfOrigin"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="details" className="form-label">
          Details
        </label>
        <input
          ref={details}
          type="text"
          className="form-control"
          id="details"
        />
        <p className="mt-3">write technical details like brand , manufacturur, model name , number or other important thing regarding product</p>
        
        <p> seprate every feature by using= ; Don't use ; anywhere else apart from seprating two details </p>
        <p>for eg = Brand: Asus ; model number: 2k33 ; Ram : 8gb ; model year : 2069 ; Batteries : Lion 1 (included) ; operating system : windows 11 ; camera : 2mp full hd rear camera ; </p>
      </div>



      <div className="mt-4">
      <label htmlFor="image-upload" className="image-upload-label">
        please upload image
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/png, image/jpeg"
        onChange={validateImg}
      />
      </div>
      <div className="mt-4" >
      {loading?<span>loading ...</span>:""}
      <button
        onClick={async () => {
          console.log(categoryRef.current.value)
          setLoading(true)
         try {
          if (!thumbnail) return alert("Please image");
          const thumbnailUrl = await uploadImage(thumbnail);
          console.log(thumbnailUrl);

          const data =  {
            name: name.current.value,
            description: description.current.value,
            richDescription: richDescription.current.value,
            countInStock: countInStock.current.value,
            image: thumbnailUrl,
            price: price.current.value,
            Details:details.current.value,
            countryOfOrigin:countryOfOrigin.current.value,
            category:categoryRef.current.value
          };
          const config ={
            headers: { 'Authorisation':`Bearer ${sessionStorage.getItem('token')}` },
            
          }
          console.log(config)
          let res = await axios.post("/product/add",data,config)
          setLoading(false)
          if( res.data.success){
            console.log("here you go with the data" )
            console.log(res.data)
             alert('product added')
             window.location.reload()
          }
          
         } catch (error) {
          console.log(error)
          setLoading(false)
         }
          
        }}
      >
        submit
      </button>
      </div>
    </div>
  );
}
