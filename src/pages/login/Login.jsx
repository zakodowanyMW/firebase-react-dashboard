import { useContext, useState } from "react"
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContex";

const Login = () => {

  const [error, setError]  = useState(false);
  const [emial, setEmail]  = useState("");
  const [password, setPassword]  = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const navigate = useNavigate();

  const {dispatch}  = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, emial, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      dispatch({type:"LOGIN", payload:user})
      navigate("/");
    })
    .catch((error) => {
      setError(true); 
    });
  } 

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="email" onChange={handleEmail} />
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
        {error && <span>Wrong email or password!</span>}
        {emial} -- {password}
      </form>
    </div>
  )
}

export default Login