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

interface DialogFormProps {
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
  onOpenChange?: (open: boolean) => void;
  form?: {
      label: React.ReactNode;
      input: React.ReactNode;
  }[];
}

export default function DialogForm({
    trigger = {},
    dialog,
    submit,
    onOpenChange,
    form = [],
} : DialogFormProps) {

  const [open, setOpen] = useState(false);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
const selectValues = useRef<Record<string, string>>({}); // Adicionado para armazenar valores de Select

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!form.length) {
      await submit.action({});
      setOpen(false);
      return;
    }

    // Mapeia os valores para enviar
    const data = Object.fromEntries([
      ...Object.entries(inputRefs.current).map(([key, input]) => [key, input?.value]),
      ...Object.entries(selectValues.current), // Inclui valores de Select
    ]);

    await submit.action(data);
    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange?.(open);
    setOpen(open);
  };

  const enhancedForm = form.map(({ label, input }) => {
    if (isValidElement(input) && input?.props?.name) {
      if (input.type?.name === "Select") { // Verifica se é um Select
        return {
          label,
          input: cloneElement(input, {
            onValueChange: (value: string) => {
              selectValues.current[input?.props?.name] = value; // Atualiza o valor do Select
            },
          }),
        };
      }

      return {
        label,
        input: cloneElement(input, {
          ref: (el: HTMLInputElement) => {
            inputRefs.current[input?.props?.name] = el; // Armazena a referência do input
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
  );
}
