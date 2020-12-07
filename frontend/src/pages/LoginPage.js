import React, { useState } from "react";
import { loginUser } from "../actions/auth.actions";
import {connect} from "react-redux";



const LoginPage = ({ loginUser, error }) => {
    
    
    const [userData, setUserData] = useState({
        email: "",
        password: "",
      });


      const { email, password } = userData;

      const onChange = (e) =>
      setUserData({ ...userData, [e.target.name]: e.target.value });

    return (
        <div>

        <br/>
        <div>
        <label>Email</label>
        <input  type="text" name="email" value={email} onChange={(e) => onChange(e)} />        
        </div>

        <br/>
        <div>
        <label>Password</label>
        <input  type="text" name="password" value={password} onChange={(e) => onChange(e)} />        
        </div>

        <br/>
        <button onClick={() => loginUser(userData)}>
            Login in
        </button>

    </div>
    )
}

export default connect(null, { loginUser })(LoginPage);
