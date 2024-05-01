import SubmitButtons from "@/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  // Sirve para que no se cachee la función, esto ya que se necesita que se ejecute en el servidor
  noStore();

  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      name: true,
      colorScheme: true,
    },
  });

  return data;
}

export default async function SettingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Get user data
  const data = await getData(user?.id as string);

  // Server action
  // This function will be called when the form is submitted
  // Por lo general, esto va en un archivo aparte, pero gracias a los server actions, podemos tenerlo en el mismo archivo
  // use server es una directiva que permite que la función se ejecute en el servidor
  async function postData(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const colorScheme = formData.get("color") as string;

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name: name ?? undefined,
        colorScheme: colorScheme ?? undefined,
      },
    });

    // Esto es para que la página se vuelva a cargar y se actualice el color
    // Revalidamos toda la web
    revalidatePath("/", "layout");
  }

  return (
    <div className="grid items-start gap-8 ">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>
          <p className="text-lg text-muted-foreground">Your Profile Settings</p>
        </div>
      </div>

      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>
              Please provide general information about yourself. Please dont
              forget to save
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Your Name</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  defaultValue={data?.name as string}
                />
              </div>
              <div className="space-y-1">
                <Label>Your Email</Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  disabled
                  defaultValue={data?.email as string}
                />
              </div>

              <div className="space-y-1">
                <Label>Color Scheme</Label>
                <Select name="color" defaultValue={data?.colorScheme as string}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      <SelectItem value="theme-green">
                        <div className="flex gap-2">
                          <div className="rounded-full w-5 h-5" style={{background: 'hsl(142.1 70.6% 45.3%)'}}></div>
                          Green
                        </div>
                      </SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-violet">Violet</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-rose">Rose</SelectItem>
                      <SelectItem value="theme-neutral">Neutral</SelectItem>
                      <SelectItem value="theme-gray">Gray</SelectItem>
                      <SelectItem value="theme-stone">Stone</SelectItem>
                      <SelectItem value="theme-slate">Slate</SelectItem>
                      <SelectItem value="theme-zinc">Zink</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <SubmitButtons />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
