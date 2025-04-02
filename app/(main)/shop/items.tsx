"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};
export default function Items({
  hearts,
  points,
  hasActiveSubscription,
}: Props) {
  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src={"/heart.svg"} alt={"Heart"} width={60} height={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Поповнити спроби
          </p>
        </div>
        <Button disabled={hearts === 5}>
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
