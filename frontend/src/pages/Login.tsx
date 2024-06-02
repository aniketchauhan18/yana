import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { z } from 'zod'
import { Link } from 'react-router-dom'

function Login(): JSX.Element {
  const validationSchema = z.object({
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(6, 'Enter a valid password')
  })

  type FormSchema = z.infer<typeof validationSchema>

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const formObj: FormSchema = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }
    console.log(formObj)
    const { success, data, error } = validationSchema.safeParse(formObj);
    if(!success){
      console.error(error.errors[0].message)
      return
    }

    const validatedData: FormSchema = data;
    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(validatedData)
      })
      const resData = await response.json()
      console.log(resData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen px-1'>
      <form className='flex flex-col border p-4 rounded w-72 max-w-96 bg-white/30' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3'>
          <h1 className='font-semibold text-2xl'>Login</h1>
          <Input type="email" placeholder="Email" name='email'/>
          <Input type="password" placeholder="Password" name='password'/>
          <Button type="submit" className='bg-orange-500 hover:bg-orange-600'>Login</Button>
          <p className='text-center text-sm font-inter'>New User ? <Link to='/signup' className='text-orange-600'>Signup</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Login