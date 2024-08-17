"use client";
import { useTransition } from "react";
import Image from "next/image";

import { UserService } from "@/services/users";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  hearts: number;
  points: number;
};
export default function Items({
  hearts,
  points,
}: Props) {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < 50) {
      return;
    }

    startTransition(() => {
        UserService.refillHearts().catch(() => toast.error('Щось пішло не так'))
    })
  };
  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src={"/heart.svg"} alt={"Heart"} width={60} height={60} className={pending || hearts === 5 || points < 50 ? '' : 'animate-heart'} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Поповнити спроби
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < 50}
        >
          {hearts === 5 ? (
            "Максимум"
          ) : (
            <div className="flex items-center">
              <Image
                src={"/points.svg"}
                alt={"Points"}
                width={20}
                height={20}
              />
              <p>50</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  );
}
