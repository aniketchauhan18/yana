import { useState } from "react";
import { Link } from "react-router-dom";
import { IoReorderThreeOutline, IoCloseOutline } from "react-icons/io5";

function Navbar() {
  const [showDiv, setShowDiv] = useState<boolean>(false)

  const linkDivClasses: string = "flex text-lg justify-center hover:bg-zinc-100 transition duration-200 ease-in-out rounded-md px-3 py-1"

  return (
    <nav className="flex  w-full sm:justify-center max-w-full border-b">
      <header className=" font-inter flex sm:justify-center gap-3 sm:px-2 py-2 px-2 w-full ">
        <div className="hidden sm:flex  justify-between px-10 py-2 w-full">
          <div className="">
            <Link to='/' className={linkDivClasses}>Home</Link>
          </div>
          <div className="flex gap-5">
            <Link to={'/restaurants'} className={linkDivClasses}>Restaurants</Link>
            <Link to={'/login'} className="bg-orange-400 rounded flex px-3 py-1 text-white justify-center items-center">Login</Link>
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
          <Link to={'/restaurants'}  onClick={() => setShowDiv(false)}>Restaurants</Link>
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