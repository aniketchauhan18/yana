import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { MailIcon, PhoneIcon } from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Footer() {
  const logoClasses: string = "h-5 w-5 hover:cursor-pointer"
  return (
    <footer className="bg-gray-100/60 mt-12">
      <div className="px-4 py-6 ">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="grid gap-4">
            <Link to="/">
              <span className="font-bold text-neutral-800 text-xl">Yana</span>
            </Link>
            <p className="text-neutral-600 text-sm">
              Discover the freedom of mobility with Yana, your trusted vehicle rental partner.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/aniketchauhan18" target="_blank">
                <LinkedInLogoIcon className={logoClasses}/>
              </a>
              <a href="https://twitter.com/aniket_chn18" target="_blank">
                <RiTwitterXFill className={logoClasses}/>
              </a>
              <a href="https://www.instagram.com/aniket.chauhan.18" target="_blank">
                <InstagramLogoIcon className={logoClasses}/>
              </a>
              <a href="https://github.com/aniketchauhan18" target="_blank">
                <GitHubLogoIcon className={logoClasses}/>
              </a>
            </div>
          </div>
          <div className="grid gap-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="grid gap-2 text-sm text-neutral-600">
              <a>Home</a>
              <a>About Us</a>
              <a>Services</a>
              <a>Contact</a>
            </div>
          </div>
          <div className="grid gap-4">
            <h3 className="font-semibold">Resources</h3>
            <div className="grid gap-2 text-sm text-neutral-600">
              <a>FAQs</a>
              <a>Terms of Service</a>
              <a>Services</a>
            </div>
          </div>
          <div className="grid gap-4">
            <h3 className="font-semibold">Contact Us</h3>
            <div className="grid gap-2 text-sm  text-neutral-600">
              <div className="flex gap-2 items-center">
                <PhoneIcon className="h-4 w-4"/>
                <p>+91 8580496476</p>
              </div>
              <div className="flex gap-2 items-center">
                <MailIcon className="h-4 w-4" />
                <a href="mailto:workwithaniket18@gmail.com">workwithaniket18@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" border-t py-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2024 Yana. All rights reserved.</p>
      </div>
    </footer>
  )
}