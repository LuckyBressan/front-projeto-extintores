import { cloneElement, isValidElement, useRef, useState } from "react";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";

import type React from "react"


export default function DialogForm({
    trigger = {},
    dialog,
    submit,
    form = [],
} : {
    trigger: {
      info?: {
        title: string;
        icon : React.ReactNode;
      };
      obj?: React.ReactNode;
    };
    dialog: {
        title: string;
        description: string;
    };
    submit: {
        title: string;
        action: (data: Record<string, any>) => void;
    };
    form?: {
        label: React.ReactNode;
        input: React.ReactNode;
    }[];
}) {

  const [open, setOpen] = useState(false)

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleSubmit = async (e: Event) => {
    e.preventDefault()

    //Se não tiver formulário, apenas executa a função submit
    if(!form.length) {
      await submit.action({})

      setOpen(false)
      return
    }

    // Mapeia os valores para enviar
    const data = Object.fromEntries(
      Object.entries(inputRefs.current).map(([key, input]) => [key, input?.value])
    );
    await submit.action(data);

    setOpen(false);
  };

  const enhancedForm = form.map(({ label, input }) => {
    if (isValidElement(input) && input?.props?.id) {
      return {
        label,
        input: cloneElement(input, {
          ref: (el: HTMLInputElement) => {
            inputRefs.current[input?.props?.id] = el;
          },
        }),
      };
    }
    return { label, input };
  });

  const dialogTrigger =
  trigger?.obj
    ? cloneElement(trigger.obj as React.ReactElement, {
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        },
      })
    : (
        <Button variant="default" onClick={() => setOpen(true)}>
          {trigger?.info?.icon}
          {trigger?.info?.title}
        </Button>
      );


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {dialogTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action="" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{dialog.title}</DialogTitle>
            <DialogDescription>
              {dialog.description}
            </DialogDescription>
          </DialogHeader>
            <div className="grid gap-4 py-4">
                {enhancedForm.map(({ input, label }, index) => (
                    <div key={index} className="grid grid-cols-4 items-center gap-4">
                        {label}
                        {input}
                    </div>
                ))}
            </div>
          <DialogFooter>
              <Button type="submit">{submit.title ?? 'Salvar'}</Button>
              <DialogClose asChild>
                  <Button variant="secondary">Cancelar</Button>
              </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
