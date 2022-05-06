import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  margin: 0;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 600;
  color: #000;
  font-family: "Roboto", sans-serif;

  div{
    cursor: pointer;
    padding: 5px 10px;
  }

  .auth{
    display: flex;
    flex-direction: row;
    
    
  }
`;

const Nav: React.FC = () => {
const  navigate = useNavigate();

const logout = () => {
  const auth = getAuth();
signOut(auth).then(() => {
  console.log("logged out");
}).catch((error) => {
  // An error happened.
  console.log(error);
});
}

  return (
  <NavContainer >
      <div onClick={() => navigate('/')}>Home</div>
      <div className="auth">
      <div onClick={() => navigate('/login')}>Login</div>
      <div onClick={() => navigate('/register')}>Register</div>
      <div onClick={logout}>Logout</div>
      </div>

  </NavContainer>
  )
};

export default Nav;
