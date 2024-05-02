"use client";

import Link from "next/link";
import { ThemeToggle } from "./Themetoggle";
import { Button } from "./ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./UserNav";
import prisma from "@/lib/db";
import { getUserLoginHandler } from "@/action/GetUserLogin";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {

  const pathname = usePathname();
  /* const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  // Obtenemos el nombre, de esta forma si se actualiza el nombre en setting se representa en el navbar
  const data = await prisma.user.findUnique({
    where: {
      id: user?.id as string,
    },
    select: {
      name: true,
    },
  }); */

  const [data, setData] = useState<{
    name: string;
    email: string;
    image: string;
    isAuthenticated: boolean;
  } | null>(null);

  // useEffect que se activa al cargar la pagina
  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserLoginHandler();
        /* localStorage.setItem("userName", userData.name || ""); */
        /* console.log(userData); */
        setData(userData);
      } catch (error) {
        console.error("Error fetching note data:", error);
      }
    }

    fetchData();
  }, []);

  // Si no hay datos y la ruta es diferente a "/", se muestra el navbar sin el usuario, deberia de ir un Skeleton
  if (!data && pathname !== "/") {
    return (
      <nav className="border-b bg-background h-[10vh] flex items-center fixed w-full">
        <div className=" w-full max-w-7xl px-2 md:px-6 py-1 md:py-3 flex items-center justify-between gap-x-2 mx-auto">
          <Link href="/">
            <h1 className="font-bold text-3xl hidden sm:block">
              Text<span className="text-primary">Editor</span>
            </h1>
            <h1 className="font-bold text-3xl block sm:hidden">
              T<span className="text-primary">E</span>
            </h1>
          </Link>

          <div className="flex items-center gap-x-2 md:gap-x-5">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className={cn(`border-b z-30  h-[10vh] flex items-center fixed w-full`,
      pathname === '/' ? 'bg-transparent' : 'bg-background'
  )}>
      <div className=" w-full max-w-7xl px-2 md:px-6 py-1 md:py-3 flex items-center justify-between gap-x-2 mx-auto">
        <Link href="/">
          {/* <Image src="/notes.svg" alt="icon" width={40} height={40} /> */}
          <h1 className="font-bold text-3xl hidden sm:block">
            Text<span className="text-primary">Editor</span>
          </h1>
          <h1 className="font-bold text-3xl block sm:hidden">
            T<span className="text-primary">E</span>
          </h1>
        </Link>

        <div className="flex items-center gap-x-2 md:gap-x-5">
          <ThemeToggle />

          {data?.isAuthenticated ? (
            <UserNav
              name={data?.name as string}
              email={data?.email as string}
              image={data?.image as string}
            />
          ) : (
            <div className="flex items-center gap-x-2 md:gap-x-5">
              <LoginLink>
                <Button>Sign In</Button>
              </LoginLink>

              <RegisterLink>
                <Button variant={"secondary"}>Sign Up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
