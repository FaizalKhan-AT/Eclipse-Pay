import { FC, ReactNode } from "react";
import { Alert, AlertTitle } from "@/components/ui";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface Props {
  children: ReactNode;
  title?: string;
}

export const AlertDestructive: FC<Props> = ({ children, title }) => {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>{title ? title : "Error"}</AlertTitle>
      {children}
    </Alert>
  );
};
