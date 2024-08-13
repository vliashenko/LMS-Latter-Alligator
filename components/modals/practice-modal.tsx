"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
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
import { usePracticeModal } from "@/store/use-practice-modal";

export default function PracticeModal() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/heart.svg" alt="Hearts" height={100} width={100} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Повторне заняття
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Пройди повторне заняття і отримай додаткові спроби та бали. Спроби
            та бали не втрачаються під час повторного заняття.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={() => {
                close();
              }}
            >
              Зрозуміло
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
