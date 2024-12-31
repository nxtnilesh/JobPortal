import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const Navbar = () => {
  const {user} = useSelector(store=>store.auth)

  return (
    <div className="bg-white shadow-md text-lg font-semibold">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-red-600">Portal</span>
          </h1>
        </div>
        <div>
          <ul className="flex items-center space-x-4">
            <li>Home</li>
            <li>
              <Link to={"job"}>Jobs</Link>
            </li>
            <li>Home</li>
            {!user ? (
              <div>
                <Button>
                  <Link to={"/signup"}>Register / Login</Link>
                </Button>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 shadow-md">
                  <div className="flex items-center space-x-4 p-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h4>Lorem ipsum dolor sit amet.</h4>
                  </div>
                  <div className="flex items-center justify-between p-2 space-x-4">
                    <Button className="w-full" variant="link">
                      <User2 />
                      Profile
                    </Button>
                    <Button className="w-full" variant="link">
                      <LogOut />
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
