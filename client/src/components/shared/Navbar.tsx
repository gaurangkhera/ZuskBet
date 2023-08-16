import { Link, useNavigate } from 'react-router-dom'
import { Button, buttonVariants } from '../ui/button'
import { User } from '../../lib/types'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null);

    const logoutUser = async () => {
      await axios.post('/api/logout');
      setUser(null);
      navigate('/')
    };
  
    useEffect(() => {
      (async () => {
        try {
          const resp = await axios.get('/api/user')
          setUser(resp.data);
        } catch (error) {
          console.log("Not authenticated");
        }
      })();
    }, []);

  return (
    <div className='fixed backdrop-blur-sm z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between'>
      <div className='container max-w-7xl mx-auto w-full flex justify-between items-center'>
        <Link to='/'>
          <div className='font-black text-2xl'>ZuskBet</div>
        </Link>
        <div><Link to="/bet" className={buttonVariants({ variant:"link"})}><span className='text-lg'>Bet</span></Link></div>
        <div className='w-3/5'><Link to="/bet" className={buttonVariants({ variant:"link"})}><span className='text-lg'>Leaderboard</span></Link></div>
        <div className='hidden md:flex gap-4'>
          { !user ? <>
            <Link
            to='/signin'
            className={buttonVariants({ variant: 'ghost' })}>
            Sign in
          </Link><Link
                className={buttonVariants({ variant: 'default' })}
                to='/signup'>
                Sign up </Link>
                </>
 : <>
 <Link
            to='/wallet'
            className={buttonVariants({ variant: 'ghost' })}>
            Wallet
          </Link><Button onClick={logoutUser} variant={'default'}>Sign out</Button>
</>}
        </div>
      </div>
    </div>
  )
}

export default Navbar