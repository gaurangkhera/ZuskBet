import { Link, useNavigate } from 'react-router-dom'
import { Button, buttonVariants } from '../components/ui/button'

const Home = () => {
    return (
      <div className="mt-24 max-w-7xl mx-auto w-full flex justify-between px-8">
        <div className="flex flex-col w-full">
          <h1 className="text-8xl text-center font-extrabold mb-10">Think. Decide. Bet.</h1>
          <div className="max-w-3xl mx-auto flex content-center"><p className='mb-8 text-center'>Become a part of the fight of the century. Place your bet now! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quisquam eos repellendus accusantium impedit quidem vero cum dignissimos recusandae cupiditate!</p></div>
          <div className='flex justify-center'><Link to="/bet" className={buttonVariants({ variant:"default"})}><span className='text-lg'>Pick your side!</span></Link></div>
        </div>
      </div>
    )
  }
  
  export default Home