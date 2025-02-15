import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <VisuallyHidden>
          {" "}
          <SheetTitle>Mobile Navbar</SheetTitle>
        </VisuallyHidden>

        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Image src="/hh-short-logo.jpg" alt="logo" width={60} height={60} />
          <Separator className="border border-gray-50" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
