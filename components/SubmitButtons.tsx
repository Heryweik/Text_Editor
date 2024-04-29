"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2, Trash } from "lucide-react";

export default function SubmitButtons() {
  // Get the status of the form
  // Por ejemplo, si el formulario está en estado de carga, se puede mostrar un botón de "Por favor espere"
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button type="submit" className="w-fit">
          Save Now
        </Button>
      )}
    </>
  );
}

export function StripeSubscriptionCreationButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Create Subscription
        </Button>
      )}
    </>
  );
}

export function StripePortal() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button type="submit" className="w-fit">
          View payment details
        </Button>
      )}
    </>
  );
}

export function TrashDelete() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant={"destructive"} size={"icon"}>
          <Loader2 className=" w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button variant={"destructive"} size={"icon"} type="submit">
          <Trash className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}
