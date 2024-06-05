import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoReorderThreeOutline, IoCloseOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { FaUser } from "react-icons/fa";


function Navbar() {
  const [showDiv, setShowDiv] = useState<boolean>(false);
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const navigateTo = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('quiz-token')
    if(!token) {
      navigateTo('/signup')
    }
    if (token) {
      setShowLogout(true)
    }
  }, [navigateTo])

  const linkDivClasses: string = "flex text-base justify-center hover:bg-zinc-100 transition duration-200 ease-in-out rounded-md px-3 py-1"

  return (
    <nav className="flex w-full sm:justify-center max-w-full border-b">
      <header className="font-inter flex sm:justify-center gap-3 sm:px-2 py-2 px-2 w-full ">
        <div className="hidden sm:flex justify-between px-5 py-2 w-full">
          <div className="">
            <Link to='/'>Yana</Link>
          </div>
          <div>
          <DropdownMenu>
            <DropdownMenuTrigger><FaUser className="text-2xl text-zinc-700"/></DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3 font-inter">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {showLogout ? (
                  <DropdownMenuItem>
                  <Link to='/'>
                    Logout
                  </Link>  
                  </DropdownMenuItem>
              ): <div>
              <DropdownMenuItem>Signup</DropdownMenuItem>
              <DropdownMenuItem>Login</DropdownMenuItem>
            </div>}
              <DropdownMenuItem>
                <Link to={'/host/vehicle'}>
                  Yana your Vehicle
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          {/* <ModeToggle /> */}
        </div>
        <div className="sm:hidden flex justify-end w-full items-center">
          <IoReorderThreeOutline className="text-5xl hover:cursor-pointer sm:hidden font-light" onClick={() => setShowDiv(prev => !prev)}/>
        </div>
      </header>
      {showDiv 
        && 
        <div className="fixed inset-0 font-inter bg-white flex flex-col z-50">
          <div className="flex justify-end p-2">
            <IoCloseOutline onClick={() => setShowDiv(false)} className="text-5xl hover:cursor-pointer"/>
          </div>
        <nav className="space-y-4 gap-6 text-2xl w-full flex flex-col justify-center items-center h-full">
          <div className={linkDivClasses}>
          <Link to='/' onClick={() => setShowDiv(false)}>Home</Link>
          </div>
          <div className={linkDivClasses}>
          <Link to={'/create-quiz'}  onClick={() => setShowDiv(false)}>Create Quiz</Link>
          </div>
          <div className={linkDivClasses}>
          <Link to={'/login'} onClick={() => setShowDiv(false)}>Login</Link>
          </div>
        </nav>
      </div>
      }
    </nav>
  )
}

export default Navbar;