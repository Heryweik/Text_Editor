import { Button } from "@/components/ui/button";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  // Redirect to dashboard if user is authenticated
  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }

  return (
    <section className="flex flex-col items-center justify-center bg-background h-svh relative isolate">
      {/* <div className="absolute inset-0 h-screen w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div> */}

      {/* Esto es el fondo */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Otro fondo */}
      {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div> */}

      <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12 ">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full bg-secondary">
              <span className="text-sm font-medium text-primary">
                Sort your notes easily
              </span>
            </span>

            {/* <span className="w-auto px-6 py-3 rounded-full bg-primary">
              <span className="text-sm font-medium text-secondary-foreground">
                Sort your notes easily
              </span>
            </span> */}

            <h1 className="mt-8 text-5xl font-extrabold tracking-tight lg:text-6xl">
              Create Notes with easy
            </h1>
            <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
              Create notes and keep them organized with our easy to use editor.
            </p>
          </div>

          <div className="flex justify-center max-w-xs mx-auto mt-10">
            <RegisterLink className="w-full">
              <Button size={"lg"} className="w-full">
                Sign Up for Free
              </Button>
            </RegisterLink>
          </div>
        </div>
      </div>

      <p className="absolute bottom-2 mx-auto text-muted-foreground">
        Created by{" "}
        <Link href={"https://portfolio-brown-omega-42.vercel.app/"}
        className="text-primary hover:underline"
        target="_blank">
          @Heryweik
        </Link>
      </p>
    </section>
  );
}
