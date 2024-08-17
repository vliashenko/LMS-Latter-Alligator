import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

type Props = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: number;
};

const completedPhrases = [
  "Чудова робота!",
  "Ти молодець!",
  "У тебе все вийшло!",
  "Так тримати!",
];
const wrongPhrases = [
  "Спробуй ще.",
  "У тебе все вийде!",
  "Хм, спробуй ще раз.",
  "Треба ще раз спробувати.",
];

export const getRandomPhrase = (phrases: string[]): string => {
  if (phrases.length === 0) throw new Error("Array of phrases is empty");
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
};

export default function Footer({ onCheck, status, disabled, lessonId }: Props) {
  useKey("Enter", onCheck, {}, [onCheck]);
  const completedRandomPhrase = useMemo(
    () => getRandomPhrase(completedPhrases),
    []
  );
  const wrongRandomPhrase = useMemo(() => getRandomPhrase(wrongPhrases), []);
  const isMobile = useMedia("(max-width: 1024px");

  return (
    <footer
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="h-6 w-6 lg:w-10 lg:h-10 mr-4" />
            {completedRandomPhrase}
          </div>
        )}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="h-6 w-6 lg:w-10 lg:h-10 mr-4" />
            {wrongRandomPhrase}
          </div>
        )}
        {status === "completed" && (
          <Button
            variant="default"
            size={isMobile ? "sm" : "lg"}
            onClick={() => (window.location.href = `/lesson/${lessonId}`)}
          >
            Повторити заняття
          </Button>
        )}
        <Button
          variant={status === "wrong" ? "danger" : "secondary"}
          disabled={disabled}
          onClick={onCheck}
          className="ml-auto"
          size={isMobile ? "sm" : "lg"}
        >
          {status === "none" && "Перевірити"}
          {status === "correct" && "Далі"}
          {status === "wrong" && "Повторити"}
          {status === "completed" && "Продовжити"}
        </Button>
      </div>
    </footer>
  );
}
