/* import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();

  // Esta condición es porque en un principio no hay un usuario logueado, por lo tanto no se podra asignar un colorScheme, por ello hay que hacer la validación y dejar un valor por defecto
  if (userId) {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        colorScheme: true,
      },
    });

    return data;
  }
} */

export default function SVG() {
  /* const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string); */

  return (
    <div className={`theme-violet`}>
      <svg
        id="logo-72"
        width="100%"
        height="100%"
        viewBox="0 0 53 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
          className="ccustom"
          fill="var(--secondary)"
        ></path>
      </svg>
    </div>
  );
}
