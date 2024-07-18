import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { CalendarCheckIcon, CarIcon, DollarSignIcon, MapPinIcon, ShieldCheckIcon } from "lucide-react";
import { Link } from "react-router-dom";


function Home(): JSX.Element {

  return (
    <main className="flex flex-col w-full font-poppins overflow-x-hidden p-4">
      <div className="flex flex-col h-44 justify-center items-center">
        <div className="flex flex-col items-center w-full h-auto">
          <BlurFade delay={0.25} inView>
            <span className="bg-gradient-to-r to-orange-500 from-orange-200 text-transparent bg-clip-text font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl sm:h-[3rem] xl:h-[4rem]">
              Discovering the rental
            </span>
          </BlurFade>
          <BlurFade delay={0.25} inView>
            <span className="bg-gradient-to-r to-orange-500 from-orange-200 text-transparent bg-clip-text  font-bold text-2xl sm:text-3xl lg:text-4xl sm:h-[3rem] xl:text-5xl xl:h-[4rem]">
              vehicles around you
            </span>
          </BlurFade>
        </div>
      </div>
      <BlurFade delay={0.35} inView>
        <div className="w-full flex  justify-center gap-3">
          <a target="_blank" href="https://www.linkedin.com/in/aniketchauhan18/">
            <Button variant="outline" className="gap-1 rounded-full">
            <LinkedInLogoIcon className="text-blue-800"/>
              LinkedIn
            </Button>
          </a>
          <a target="_blank" href="https://github.com/aniketchauhan18/yana">
            <Button variant="outline" className="gap-1 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white">
            <GitHubLogoIcon />
              Github
            </Button>
          </a>
        </div>
      </BlurFade>
      <div className="text-center mt-10">
        <Link to='/search'>
          <Button variant="outline">See Rental Vehicles</Button>
        </Link>
      </div>
      <div className="mt-10">
        <div className="w-full text-center mt-10 mb-10">
          <p className="text-xl font-bold">
            Why Choose Our Vehicle Rental App?
          </p>
        </div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 font-poppins mt-5">
          <div className="p-3 border rounded-md">
            <div className="flex gap-2">
              <div className="bg-orange-400 text-white max-w-10 rounded-md p-2">
                <CarIcon />
              </div>
              <p className="flex items-center font-semibold">
              Wide Selection
              </p>
            </div>
            <p className="text-zinc-500 pt-4 text-sm ">Choose from a wide range of vehicles, from compact cars to luxury SUVs, to fit your needs and budget.</p>
          </div>
          <div className="p-3 border rounded-md">
            <div className="flex gap-2">
              <div className="bg-green-400 text-white max-w-10 rounded-md p-2">
                <DollarSignIcon />
              </div>
              <p className="flex items-center font-semibold">
                Competitive Pricing
              </p>
            </div>
            <p className="text-zinc-500 pt-4 text-sm ">Enjoy competitive pricing and exclusive deals, making your rental experience more affordable.</p>
          </div>
          <div className="p-3 border rounded-md">
            <div className="flex gap-2">
              <div className="bg-red-400 text-white max-w-10 rounded-md p-2">
                <CalendarCheckIcon />
              </div>
              <p className="flex items-center font-semibold">
                Seamless Booking
              </p>
            </div>
            <p className="text-zinc-500 pt-4 text-sm ">Our user-friendly platform makes booking your rental car a breeze, with a simple and intuitive process.</p>
          </div>
          <div className="p-3 border rounded-md">
            <div className="flex gap-2">
              <div className="bg-blue-400 text-white max-w-10 rounded-md p-2">
                <ShieldCheckIcon />
              </div>
              <p className="flex items-center font-semibold">
                Trusted Brand
              </p>
            </div>
            <p className="text-zinc-500 pt-4 text-sm ">As a trusted brand in the industry, you can count on us to provide a reliable and hassle-free rental experience.</p>
          </div>
          <div className="p-3 border rounded-md">
            <div className="flex gap-2">
              <div className="bg-yellow-400 text-white max-w-10 rounded-md p-2">
                <MapPinIcon />
              </div>
              <p className="flex items-center font-semibold">
                Convenient Locations
              </p>
            </div>
            <p className="text-zinc-500 pt-4 text-sm ">Pick up and drop off your rental at our convenient locations across the city.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
