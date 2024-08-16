"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useFeedbackModal } from "@/store/use-feedback-modal";

export default function Promo() {
  const { open } = useFeedbackModal();
  return (
    <div className="border-2 rounded-xl p-4 space-y-4 ">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/zebra.png" alt="hearts" width={46} height={46} />
          <div className="relative py-2 px-4 border-2 rounded-xl font-bold text-lg">
            Вітаємо у Latter, Alligator!
            <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90"></div>
          </div>
        </div>
        <p className="text-muted-foreground mt-5 text-center">
          Залиште відгук або повідомте нам що щось не так.
        </p>
      </div>
      <Button
        variant="super"
        className="w-full"
        size="lg"
        onClick={open}
      >
        Залишити відгук
      </Button>
    </div>
  );
}
