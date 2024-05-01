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
import { toast } from "@/components/ui/use-toast";
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

                <p className="text-xs text-muted-foreground">
                The new name will appear when you reload the website
                </p>
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
                          <div
                            className="rounded-full w-5 h-5"
                            style={{ background: "hsl(142.1 70.6% 45.3%)" }}
                          ></div>
                          Green
                        </div>
                      </SelectItem>
                      <SelectItem value="theme-blue">
                        <div className="flex gap-2">
                          <div
                            className="rounded-full w-5 h-5"
                            style={{ background: "hsl(217.2 91.2% 59.8%)" }}
                          ></div>
                          Blue
                        </div>
                      </SelectItem>
                      <SelectItem value="theme-violet">
                        <div className="flex gap-2">
                          <div
                            className="rounded-full w-5 h-5"
                            style={{ background: "hsl(263.4 70% 50.4%)" }}
                          ></div>
                          Violet
                        </div>
                      </SelectItem>
                      <SelectItem value="theme-yellow">
                        <div className="flex gap-2">
                          <div
                            className="rounded-full w-5 h-5"
                            style={{ background: "hsl(47.9 95.8% 53.1%)" }}
                          ></div>
                          Yellow
                        </div>
                      </SelectItem>
                      <SelectItem value="theme-orange">
                        <div className="flex gap-2">
                          <div
                            className="rounded-full w-5 h-5"
                            style={{ background: "hsl(20.5 90.2% 48.2%)" }}
                          ></div>
                          Orange
                        </div>
                      </SelectItem>
                      <SelectItem value="theme-rose">
                        <div className="flex gap-2">
                          <div
                            className="rounded-full w-5 h-5"
                            style={{ background: "hsl(346.8 77.2% 49.8%)" }}
                          ></div>
                          Rose
                        </div>
                      </SelectItem>
                      <SelectItem value="theme-red">
                        <div className="flex gap-2">
                          <div
                            className="rounded-full w-5 h-5"
                            style={{ background: "hsl(0 72.2% 50.6%)" }}
                          ></div>
                          Red
                        </div>
                      </SelectItem>
                      <SelectItem value="theme-gray">
                        <div className="flex gap-2">
                          <div
                            className="rounded-full w-5 h-5"
                            style={{ background: "hsl(220.9 39.3% 11%)" }}
                          ></div>
                          Gray
                        </div>
                      </SelectItem>
                      <SelectItem value="theme-slate">
                        <div className="flex gap-2">
                          <div
                            className="rounded-full w-5 h-5"
                            style={{ background: "hsl(222.2 47.4% 11.2%)" }}
                          ></div>
                          Slate
                        </div>
                      </SelectItem>
                      <SelectItem value="theme-stone">
                        <div className="flex gap-2">
                          <div
                            className="rounded-full w-5 h-5"
                            style={{ background: "hsl(24 9.8% 10%)" }}
                          ></div>
                          Stone
                        </div>
                      </SelectItem>
                      <SelectItem value="theme-neutral">
                        <div className="flex gap-2">
                          <div
                            className="rounded-full w-5 h-5"
                            style={{ background: "hsl(0 0% 9%)" }}
                          ></div>
                          Neutral
                        </div>
                      </SelectItem>
                      <SelectItem value="theme-zinc">
                        <div className="flex gap-2">
                          <div
                            className="rounded-full w-5 h-5"
                            style={{ background: "hsl(240 5.9% 10%)" }}
                          ></div>
                          Zinc
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <SubmitButtons/>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
