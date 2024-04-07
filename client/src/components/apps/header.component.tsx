import { FC } from "react";
import { Button } from "../ui";
import { PlusIcon } from "lucide-react";

export const Header: FC = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold md:text-2xl">Apps</h1>
      <Button variant="outline" className="flex items-center gap-2">
        <PlusIcon className="size-4" />
        Add
      </Button>
    </div>
  );
};
