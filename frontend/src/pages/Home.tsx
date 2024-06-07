import { CiSearch } from "react-icons/ci";

function Home(): JSX.Element {
  return (
    <main className="flex flex-col w-full p-2 font-poppins">
      <div className="flex flex-col h-52 justify-center items-center">
        <div className="text-3xl sm:text-6xl flex sm:gap-3 flex-col justify-center items-center font-bold hero-text-gradient h-full">
          <p>Your Trusted Vehicle</p>
          <p>Rental Platform</p>
        </div>
      </div>
      <form className="flex w-full justify-center font-inter">
        <div className="border pl-3  items-center rounded-full flex gap-3">
          <div className=" ">
            <input
              type="text"
              className="focus:outline-none"
              placeholder="Location"
            />
          </div>
          <div className="flex justify-center items-center text-2xl text-white">
            <button className="rounded-full p-2 bg-red-500">
              <CiSearch />
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Home;
