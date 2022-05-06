import React,{useState, useRef} from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.main`
  width: 50vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  h1{
    font-size: 40px;
    font-weight: 600;
    color: #000;
    margin-bottom: 20px;

  }

  form{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 600;
    color: #000;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

    input{
      width: 100%;
      padding: 10px;
      border: 1px solid #e5e5e5;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 600;
      color: #000;
      background-color: #fff;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    button{
      width: 50%;
      padding: 10px;
      border: 1px solid #e5e5e5;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 600;
      color: #000;
      background-color: #fff;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      cursor: pointer;

      &:hover{
        background-color: #e5e5e5;
      }
    }
  }
`

const firebaseConfig = {
    apiKey: "AIzaSyCyQjvWG23TUPYvMcrHWw_8cCvnrVRVihY",
    authDomain: "videoapp-e35d8.firebaseapp.com",
    projectId: "videoapp-e35d8",
    storageBucket: "videoapp-e35d8.appspot.com",
    messagingSenderId: "537098423663",
    appId: "1:537098423663:web:6984d2d3dfa463636eac9a"
  };

  const app = initializeApp(firebaseConfig);

  const Login: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    //state for invalid input
    const [invalidInput, setInvalidInput] = useState(false);


    const navigate = useNavigate();

    const onClickHandler = ( e:React.MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();

        const email = emailRef.current!.value;
        const password = passwordRef.current!.value;

        console.log(email, password);

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigate("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setInvalidInput(true);
          });
    }

    return (
        <Container>
            <h1>Login</h1>
            {invalidInput && <p>Invalid email or password</p>}
        <form action="">
            <input ref={emailRef} type="text" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button onClick={onClickHandler} type="submit">Login</button>
        </form>
        </Container>
    );

  }

    export default Login;