import { FC } from "react";
import Pic from "@/assets/images/trans.svg";
export const TransactionEmptyState: FC = () => {
  return (
    <div className="flex flex-1 items-center flex-col justify-center">
      <img className="size-[300px]" src={Pic} alt="no transactions" />
      <h3 className="text-lg text-muted-foreground">
        You don't have any transactions so far.
      </h3>
    </div>
  );
};
