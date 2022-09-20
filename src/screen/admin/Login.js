import React, { useRef, useState } from "react";
import axios from "axios";
import { useLocation,Navigate } from 'react-router-dom';
export default function Login() {
  const [islogin,setIslogin] = useState(()=>{if(sessionStorage.getItem('token')){
    return true
  }
return false})
  const emailRef = useRef();
  const passRef = useRef();
  const location = useLocation();
  const from = location?.state?.from || '/';
  console.log(from);
  if( islogin )
    return <Navigate to={from} />

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex flex-column align-item-center justify-content-center"
    >
      <div
        style={{
          width: "25rem",
          height: "22rem",
          border: "2px solid black",
          borderRadius: "0.5em",
          boxShadow: "5px 5px 5px #aaaaaa",
        }}
        className="container pt-5"
      >
        <form className="container">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              ref={emailRef}
              type="email"
              className="form-control"
              id="email"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              ref={passRef}
              type="password"
              className="form-control"
              id="password"
            />
          </div>

          <button
            type="submit"
            onClick={async(e) => {
              e.preventDefault();
              const email = emailRef.current.value
              const password = passRef.current.value;
              if(emailRef.current.value && passRef.current.value){
                const res = await axios.post("/admin/login",{email,password});
                if( res.status>=200 && res.data.login && res.status<250 ){
                  sessionStorage.setItem("user",res.data.user)
                sessionStorage.setItem("token",res.data.token)
                setIslogin(true)
                }
              }
            }}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );


}
