import Contact from "@/components/app/Contact";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  CalendarCheckIcon,
  CarIcon,
  DollarSignIcon,
  ListChecks,
  MapPinIcon,
  ShieldCheckIcon,
} from "lucide-react";
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
          <Link to="/search">
            <Button variant="outline" className="gap-1 rounded-full">
              Explore Vehicles
            </Button>
          </Link>
          <a target="_blank" href="https://github.com/aniketchauhan18/yana">
            <Button
              variant="outline"
              className="gap-1 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white"
            >
              <GitHubLogoIcon />
              Github
            </Button>
          </a>
        </div>
      </BlurFade>
      <BlurFade delay={0.55} inView>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mt-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-700/90er sm:text-5xl">
              Explore Our Diverse Vehicle Categories
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-neutral-500">
              From compact sedans to spacious SUVs, we have the perfect vehicle
              for your every need.
            </p>
          </div>
        </div>
      </BlurFade>
      <div className="mx-auto  grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        <div className="h-auto w-[300px] bg-gray-50 rounded-lg border shadow-sm">
          <img
            src="https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg"
            className="[grid-area:stack] rounded-t-lg object-cover w-full aspect-[9/9]"
          />
          <div className="p-2 bg-zinc-100/60">
            <h3 className="font-semibold text-xl tracking-tight text-zinc-700/90">
              Luxury Cars
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Indulge in style and comfort with our premium vehicles.
            </p>
          </div>
        </div>
        <div className="h-auto w-[300px] bg-gray-50 rounded-lg border shadow-sm">
          <img
            src="https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg"
            className="[grid-area:stack] rounded-t-lg object-cover w-full aspect-[9/9]"
          />
          <div className="p-2 bg-zinc-100/60">
            <h3 className="font-semibold text-xl tracking-tight text-zinc-700/90">
              Trucks
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Rugged and powerful for your hauling needs.
            </p>
          </div>
        </div>
        <div className="h-auto w-[300px] bg-gray-50 rounded-lg border shadow-sm">
          <img
            src="https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg"
            className="[grid-area:stack] rounded-t-lg object-cover w-full aspect-[9/9]"
          />
          <div className="p-2 bg-zinc-100/60">
            <h3 className="font-semibold text-xl tracking-tight text-zinc-700/90">
              Sedans
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Comfortable and efficient for everyday driving.
            </p>
          </div>
        </div>
        <div className="h-auto w-[300px] bg-gray-50 rounded-lg border shadow-sm">
          <img
            src="https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg"
            className="[grid-area:stack] rounded-t-lg object-cover w-full aspect-[9/9]"
          />
          <div className="p-2 bg-zinc-100/60">
            <h3 className="font-semibold text-xl tracking-tight text-zinc-700/90">
              SUVs
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Spacious and versatile for your adventures
            </p>
          </div>
        </div>
      </div>
      {/* <div className="text-center mt-10">
        <Link to='/search'>
          <Button variant="outline">See Rental Vehicles</Button>
        </Link>
      </div> */}
      <div className="border-b" />
      <div>
        <div className="w-full text-center mt-10 mb-10">
          <p className="text-xl sm:text-2xl lg:text-4xl font-bold">
            Why Choose Our Vehicle Rental App?
          </p>
        </div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 font-poppins mt-5">
          <div className="p-3 border rounded-md">
            <div className="flex gap-2">
              <div className="bg-orange-400 text-white max-w-10 rounded-md p-2">
                <CarIcon />
              </div>
              <p className="flex items-center font-semibold">Wide Selection</p>
            </div>
            <p className="text-zinc-500 pt-4 text-sm ">
              Choose from a wide range of vehicles, from compact cars to luxury
              SUVs, to fit your needs and budget.
            </p>
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
            <p className="text-zinc-500 pt-4 text-sm ">
              Enjoy competitive pricing and exclusive deals, making your rental
              experience more affordable.
            </p>
          </div>
          <div className="p-3 border rounded-md">
            <div className="flex gap-2">
              <div className="bg-yellow-800 text-white max-w-10 rounded-md p-2">
                <ListChecks />
              </div>
              <p className="flex items-center font-semibold">
                List Your Vehicle with Ease
              </p>
            </div>
            <p className="text-zinc-500 pt-4 text-sm ">
              Whether you're looking to rent a car for your next adventure or
              earn extra income by listing your vehicle, we've got you covered.
            </p>
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
            <p className="text-zinc-500 pt-4 text-sm ">
              Our user-friendly platform makes booking your rental car a breeze,
              with a simple and intuitive process.
            </p>
          </div>
          <div className="p-3 border rounded-md">
            <div className="flex gap-2">
              <div className="bg-blue-400 text-white max-w-10 rounded-md p-2">
                <ShieldCheckIcon />
              </div>
              <p className="flex items-center font-semibold">Trusted Brand</p>
            </div>
            <p className="text-zinc-500 pt-4 text-sm ">
              As a trusted brand in the industry, you can count on us to provide
              a reliable and hassle-free rental experience.
            </p>
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
            <p className="text-zinc-500 pt-4 text-sm ">
              Pick up and drop off your rental at our convenient locations
              across the city.
            </p>
          </div>
        </div>
        <div>
          <Contact />
        </div>
      </div>
    </main>
  );
}

export default Home;
