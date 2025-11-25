import { useNavigate } from 'react-router-dom';
import BorderAnimatedContainer from '../../components/BorderAnimatedContainer/BorderAnimatedContainer'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUserStore } from '../../store/useUserStore';

const Home = () => {
  const user = useUserStore((state) => state.user);

    const navigate=useNavigate()
    useEffect(() => {
      console.log(user,"user");
      
     if (!user) {
      navigate("/login");   
    } 
  }, [user]);
  return (
    <BorderAnimatedContainer>


      <div className='text-2xl'>Home</div>
    </BorderAnimatedContainer>
  )
}

export default Home