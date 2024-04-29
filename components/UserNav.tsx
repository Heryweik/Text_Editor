"use client";

import { CreditCard, DoorClosed, Home, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const navItems = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
];

export default function UserNav({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) {

  // Obtenemos la primera letra del nombre para mostrarla en el avatar si no hay imagen o no la ha cargado
  const fisrtLetter = name.charAt(0).toUpperCase();

  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={image} alt="@shadcn" />
            <AvatarFallback>{fisrtLetter}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            {/* leading-none sirve para que el texto no tenga espacio entre lineas */}
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-sm text-muted-foreground leading-none">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup  className='grid items-start gap-2'>
          {navItems.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <Link
                href={item.href}
                className={cn(
                  "group w-full flex flex-row justify-between items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  // los && son para aplicar una clase si se cumple la condición
                  pathname === item.href && "bg-accent text-accent-foreground"
              )}
              >
                {item.name}
                <span>
                  <item.icon className="w-4 h-4" />
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="w-full flex justify-between items-center"
          asChild
        >
          <LogoutLink>
            Logout
            <span>
              <DoorClosed className="w-4 h-4" />
            </span>
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
