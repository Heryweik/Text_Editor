"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2, Trash } from "lucide-react";
import { toast } from "./ui/use-toast";

export default function SubmitButtons({handleSubmit}: {handleSubmit?: any}) {
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
        <Button
          type="submit"
          className="w-fit"
          onClick={() => {
            if (handleSubmit) {
              handleSubmit();
            } /* else {
              toast({
                variant: "default",
                title: "vaca",
                description: "Your note has been created successfully",
              });
            } */
          }}
        >
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

export function TrashDelete({deleteNote}: {deleteNote: any}) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full" variant={"destructive"}>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button variant={"destructive"} type="submit" className="w-full" onClick={() => deleteNote()}>
          Delete
        </Button>
      )}
    </>
  );
}
