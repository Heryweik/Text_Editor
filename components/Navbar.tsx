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

export default async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="border-b bg-background h-[10vh] flex items-center">
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

          {(await isAuthenticated()) ? (
            <UserNav
              name={user?.given_name as string}
              email={user?.email as string}
              image={user?.picture as string}
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
