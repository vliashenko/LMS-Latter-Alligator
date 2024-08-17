import Card from "./card";

import { cn } from "@/lib/utils";
import { challengeOptions, challenges } from "@/lib/db/schema";

type Props = {
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "completed" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

export default function Challenge({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: Props) {
  return (
    <div
      className={cn(
        "grid gap-3",
        type === "ASSIST" && "grid-cols-1",
        type === "SELECT" && "grid-cols-2"
      )}
    >
      {options.map((option, idx) => (
        <Card
          key={option.id}
          text={option.text}
          imageSrc={option.imageSrc}
          shortcut={`${idx + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          audioSrc={option.audioSrc}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  );
}
