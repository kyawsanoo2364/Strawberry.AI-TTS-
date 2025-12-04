import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="w-full py-4 border-b">
      <div className="container mx-auto px-2 w-full flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="logo"
            width={200}
            height={200}
            className="object-cover h-12 md:h-20"
          />
        </Link>
        <SignedOut>
          <SignInButton>
            <Button
              size={"sm"}
              className="bg-pink-600 hover:bg-pink-700 cursor-pointer text-white"
            >
              Login
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
