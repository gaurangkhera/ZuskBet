import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'

const Navbar = () => {

  return (
    <div className='fixed backdrop-blur-sm bg-black/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between'>
      <div className='container max-w-7xl mx-auto w-full flex justify-between items-center'>
        <Link to='/' className={buttonVariants({ variant: 'link' })}>
          <div className='font-black text-2xl'>BetX</div>
        </Link>

        <div className='hidden md:flex gap-4'>
          <Link
            to='/bet'
            className={buttonVariants({ variant: 'ghost' })}>
            Bet
          </Link>
          <Link
                className={buttonVariants({ variant: 'default' })}
                to='/signin'>
                Sign in
              </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar