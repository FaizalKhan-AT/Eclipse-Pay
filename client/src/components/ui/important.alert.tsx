import { FC, ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

export const ImportantAlert: FC<{ desc: string | ReactNode[] }> = ({
  desc,
}) => {
  return (
    <Alert>
      <CircleAlert className="size-4" />
      <AlertTitle>Attention !</AlertTitle>
      <AlertDescription>{desc}</AlertDescription>
    </Alert>
  );
};
