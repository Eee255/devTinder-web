import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Utils/UserSlice';
import Footer from './Footer';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.User);

  const cookies = document.cookie.split("; ").find(row => row.startsWith('token='));
  const token = cookies ? cookies.split("=")[1] : null;
  
  const fetchUser = async (token) => {
    if(userData && !token) return;
    try {

      const res = await axios.get(BASE_URL+"/profile/view", {withCredentials: true});
      
      dispatch(addUser(res.data));
    } catch {
      navigate('/login');
    }
  }
  useEffect(()=>{
    fetchUser(token);
  },[]);
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body