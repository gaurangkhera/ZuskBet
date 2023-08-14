import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axios from "axios"

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/login', {
                email: email,
                password: password
            });
            
            // Handle the response as needed
            console.log(response.data); // For example, log the response data
        } catch (error) {
            console.error('Error during registration:', error);
            // Handle the error, show an error message, etc.
        }
    }
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 mt-24">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Sign in</h1>
        <p className="mt-4 text-gray-500">Sign in with your BetX account.</p>
      </div>
      <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit}>
        <div>
          <div className="relative">
            <Input type='text' placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
          <div className="relative mt-2">
            <Input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 w-3/4">By signing in or creating an account, you agree to BetX's terms & conditions.</p>
          <Button onClick={handleSubmit}>Sign in</Button>
        </div>
      </form>

    </div>
  )
}

export default Signin