"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFeedbackModal } from "@/store/use-feedback-modal";
import { Label } from "../ui/label";
import { Textarea } from "../ui/text-area";
import { ButtonGroup } from "../ui/button-group";

export default function FeedbackModal() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setType] = useState<"general" | "bug" | "idea">("general");
  const [message, setMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useFeedbackModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  const buttons = [
    { label: "Загальне", onClick: () => setType("general") },
    { label: "Ідея", onClick: () => setType("idea") },
    { label: "Баг", onClick: () => setType("bug") },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/moose.png" alt="Moose" height={120} width={120} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Залишіть свій відгук
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Нам дуже важливо почути вашу думку! Ваші відгуки допомагають нам
            покращувати наші послуги та робити ваш досвід ще кращим.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Тип звернення
            </Label>
            <div className="w-full mx-auto">
              <ButtonGroup
                buttons={buttons}
                orientation="horizontal"
                size="lg"
                variant="secondary"
                isToggle
              />
            </div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Повідомлення
            </Label>
            <Textarea
              id="name"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ваше повідомлення"
              className="col-span-3 min-h-[180px] max-h-[180px]"
            />
          </div>
        </div>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={() => {}}
            >
              Надіслати відгук
            </Button>
            <Button
              variant="primaryOutline"
              className="w-full"
              size="lg"
              onClick={() => {
                close();
              }}
            >
              Ні, дякую
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
