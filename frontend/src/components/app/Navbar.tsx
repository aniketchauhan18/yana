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
} from "../ui/dropdown-menu";
import { FaUser } from "react-icons/fa";

function Navbar() {
  const [showDiv, setShowDiv] = useState<boolean>(false);
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const navigateTo = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("yana-token");
    if (!token) {
      navigateTo("/signup");
    }
    if (token) {
      setShowLogout(true);
    }
  }, [navigateTo]);

  const linkDivClasses: string =
    "flex text-base justify-center hover:bg-zinc-100 transition duration-200 ease-in-out rounded-md px-3 py-1";

  return (
    <nav className="flex w-full sm:justify-center max-w-full border-b">
      <header className="font-inter flex sm:justify-center gap-3 sm:px-2 py-2 px-2 w-full ">
        <div className="hidden sm:flex justify-between px-5 py-2 w-full">
          <div className="font-poppins text-xl font-semibold text-zinc-700">
            <Link to="/">Yana</Link>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FaUser className="text-2xl text-zinc-600" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-3 font-poppins">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {showLogout ? (
                  <div>
                    <DropdownMenuItem>
                      <Link
                        to={`/profile/${localStorage.getItem("yana-user")}`}
                      >
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to="/"
                        onClick={() => {
                          setShowLogout(false);
                          localStorage.removeItem("yana-token");
                        }}
                      >
                        Logout
                      </Link>
                    </DropdownMenuItem>
                  </div>
                ) : (
                  <div>
                    <DropdownMenuItem>
                      <Link to="/signup">Signup</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/login">Login</Link>
                    </DropdownMenuItem>
                  </div>
                )}
                <DropdownMenuItem>
                  <Link to={"/become-host/vehicle"}>Yana your Vehicle</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to={`/user/${localStorage.getItem("yana-user")}/rented-vehicles`}
                  >
                    Rented vehicles
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* <ModeToggle /> */}
        </div>
        <div className="sm:hidden flex justify-end w-full items-center">
          <IoReorderThreeOutline
            className="text-5xl hover:cursor-pointer sm:hidden font-light"
            onClick={() => setShowDiv((prev) => !prev)}
          />
        </div>
      </header>
      {showDiv && (
        <div className="fixed inset-0 font-inter bg-white flex flex-col z-50">
          <div className="flex justify-end p-2">
            <IoCloseOutline
              onClick={() => setShowDiv(false)}
              className="text-5xl hover:cursor-pointer"
            />
          </div>
          <nav className=" gap-6 text-2xl w-full flex flex-col justify-center items-center h-full">
            <div className={linkDivClasses}>
              <Link to="/" onClick={() => setShowDiv(false)}>
                Yana
              </Link>
            </div>
            {showLogout ? (
              <div className="flex flex-col gap-8">
                <div className={linkDivClasses}>
                  <Link
                    to="/"
                    onClick={() => {
                      localStorage.removeItem("yana-token");
                      setShowLogout(false);
                      setShowDiv(false);
                    }}
                  >
                    Logout
                  </Link>
                </div>
                <div className={linkDivClasses}>
                  <Link
                    to={`/profile/${localStorage.getItem("yana-user")}`}
                    className={linkDivClasses}
                    onClick={() => setShowDiv(false)}
                  >
                    Profile
                  </Link>
                </div>
              </div>
            ) : (
              <div className={`flex flex-col gap-8`}>
                <Link
                  className={linkDivClasses}
                  to={"/login"}
                  onClick={() => setShowDiv(false)}
                >
                  Login
                </Link>
                <Link
                  className={linkDivClasses}
                  to={"/signup"}
                  onClick={() => setShowDiv(false)}
                >
                  Signup
                </Link>
              </div>
            )}
            <div className={` flex flex-col gap-8 items-center`}>
              <Link
                to={"/become-host/vehicle"}
                className={linkDivClasses}
                onClick={() => setShowDiv(false)}
              >
                Yana Your Vehicle
              </Link>
              <Link
                to={`/user/${localStorage.getItem("yana-user")}/rented-vehicles`}
                onClick={() => setShowDiv(false)}
                className={linkDivClasses}
              >
                Rented vehicles
              </Link>
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
