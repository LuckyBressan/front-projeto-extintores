import {
  Card as CardBase,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import type { ReactNode } from "react";

export default function Card ({
  value,
  description,
  footer,
  icon
 } : {
  value      : string|number;
  description: string;
  footer    ?: string;
  icon       : ReactNode
 }) {
  return (
    <CardBase className="@container/card">
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value || "-"}
        </CardTitle>
        <CardAction className="text-xl">
          { icon }
        </CardAction>
        { footer && <CardFooter>{ footer }</CardFooter> }
      </CardHeader>
    </CardBase>
  );
}
