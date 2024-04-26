import { Button } from "@/components/ui/button";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";


import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const {isAuthenticated} = getKindeServerSession();

  // Redirect to dashboard if user is authenticated
  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }

  return (
    <section className="flex items-center justify-center bg-background h-[90vh]">
      <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
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

            <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
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
    </section>
  );
}
