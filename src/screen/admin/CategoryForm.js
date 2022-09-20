import React, { useRef, useState } from 'react'
const axios = require('axios')
export default function () {
    const categoryName = useRef()
    const [loading,setLoading] = useState(false)
  return (
    <div
      style={{ width: "50%", marginLeft: "auto", border: "2px solid black", borderRadius:'10px' , minWidth:'400px' }}
      className="container mt-5 py-4 px-4 "
    >
      <h1 className='mt-3'>Add Category</h1>

      <div className="mb-3 mt-4">
        <label htmlFor="Categoryname" className="form-label">
        Category name
        </label>
        <input ref={categoryName} type="text" className="form-control" id="Categoryname" />
      </div>
      {loading?<span>loading ...</span>:""}
      <button className='mb-4'
        onClick={async () => {
          setLoading(true)
         try {
     
          const data =  {
            categoryName: categoryName.current.value,
          
          };
          const config ={
            headers: { 'Authorisation':`Bearer ${sessionStorage.getItem('token')}` },
            
          }
          console.log(config)
          let res = await axios.post("/category/add",data,config)
          setLoading(false)
          if( res.data.success){
            console.log("here you go with the data" )
            console.log(res.data)
             alert('Category added')
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
  )
}
