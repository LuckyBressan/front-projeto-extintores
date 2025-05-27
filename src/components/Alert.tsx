import { CircleCheck, CircleX, HelpCircle, TriangleAlert } from "lucide-react";

import {
  Alert as AlertComponent,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import { AlertEnum } from "@/enums/AlertEnum";

const AlertVariants = {
  [AlertEnum.SUCCESS]: {
    icon: <CircleCheck className="h-4 w-4" />,
    cor: {
      background: "bg-green-50",
      border: "border-green-500",
      textPrimary: "text-green-500",
      textSecondary: "text-green-500",
    },
  },
  [AlertEnum.ERROR]: {
    icon: <CircleX className="h-4 w-4" />,
    cor: {
      background: "bg-red-50",
      border: "border-red-500",
      textPrimary: "text-red-500",
      textSecondary: "text-red-400",
    },
  },
  [AlertEnum.WARNING]: {
    icon: <TriangleAlert className="h-4 w-4" />,
    cor: {
      background: "bg-yellow-50",
      border: "border-yellow-500",
      textPrimary: "text-yellow-500",
      textSecondary: "text-yellow-500",
    },
  },
  [AlertEnum.INFO]: {
    icon: <HelpCircle className="h-4 w-4" />,
    cor: {
      background: "bg-blue-50",
      border: "border-blue-500",
      textPrimary: "text-blue-500",
      textSecondary: "text-blue-400",
    },
  },
};

export default function Alert({
  title,
  description,
  variant,
}: {
  title: string;
  description: string;
  variant: AlertEnum;
}) {
  const { icon, cor } = AlertVariants[variant];

  return (
    <AlertComponent className={`${cor.background} ${cor.border} ${cor.textPrimary}`}>
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className={cor.textSecondary}>
        {description}
      </AlertDescription>
    </AlertComponent>
  );
}
