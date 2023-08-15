import { Link, useNavigate } from 'react-router-dom'
import { Button, buttonVariants } from '../components/ui/button'

const Home = () => {
    return (
      <div className="mt-24 max-w-7xl mx-auto w-full flex justify-between px-8">
        <div className="flex flex-col w-1/2">
          <h1 className="text-4xl font-extrabold mb-10">Lorem, ipsum dolor.</h1>
          <p className='mb-8'>Become a part of the fight of the century. Place your bet now! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quisquam eos repellendus accusantium impedit quidem vero cum dignissimos recusandae cupiditate!</p>
          <div className='2/5'><Link to="/bet" className={buttonVariants({ variant:"default"})}><span className='text-lg'>Place your bet now!</span></Link></div>
        </div>
        <div className='w-1/2'>
          <img src="/graphic.png" alt=""/>
        </div>
      </div>
    )
  }
  
  export default Home