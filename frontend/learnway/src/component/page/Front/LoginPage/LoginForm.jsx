// import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import InputBox from '../Input';


export default function LoginForm () {

  const userRef = useRef();
  // const errRef = useRef();

  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus(); 
  // }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pw])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pw)
    setUser("");
    setPw("");
    setSuccess(true);
  }

  return (
      <>
        {success ? (
          <section>
            <h1>You are logged in!</h1>
            <br />
            {/* <p>
              <a href="#">Go to Home</a>
            </p> */}
          </section>
        ):(
          <section>
            <form onSubmit={handleSubmit}>
              <InputBox 
                id="id"
                type="text"
                title="E-mail"
                placeholder="abcdef@dfd.com"
                onChange={(e) => {setUser(e.target.value)}}
                value={user}
                ref={userRef}
                // onKeyUp={changeButton}
              ></InputBox>
              <InputBox              
                id="password"
                type="password"
                title="Password"
                placeholder="********"
                onChange={(e) => {setPw(e.target.value)}}
                value={pw}
                // onKeyUp={changeButton}
              ></InputBox>
              <button>Sign In</button>
            </form>
          </section>
        )}
    </>
  )
}
