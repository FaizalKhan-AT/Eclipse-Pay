import { FC, useContext, useEffect, useState } from "react";
import { UserAuth, UserType } from "@/context/AuthContext";
import { ITransaction } from "@/lib/interfaces/common.interface";
import { Spinner, useToast } from "../ui";
import { API_ENDPOINTS } from "@/lib/Json";
import axios from "@/axios.config";
import { getToastData } from "@/lib/helpers/toast.helper";
import { TransactionEmptyState } from "../ui/empty";
import TransactionTable from "../tables/TransactionTable.component";

const Transaction: FC = () => {
  const [transactions, setTransactions] = useState<Array<ITransaction>>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { authState } = useContext<UserType>(UserAuth);
  const { toast } = useToast();

  useEffect(() => {
    fetchtransactions();
  }, []);

  async function fetchtransactions() {
    setLoading(true);
    try {
      let res = await axios.get(API_ENDPOINTS.TRANSACTION, {
        headers: {
          id: authState.user?.id,
        },
      });
      let data = res.data.data;
      if (data.length > 0) {
        setIsEmpty(false);
        setTransactions(data);
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      openToaster(err.response.data);
    }
  }

  function openToaster(data: any) {
    let toastData: any = getToastData(data);
    toast(toastData);
  }
  return (
    <>
      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner size="size-10" />
        </div>
      ) : isEmpty ? (
        <TransactionEmptyState />
      ) : (
        <div className="w-fill">
          <h1 className="text-3xl font-bold">Transactions</h1>
          <br />
          <TransactionTable transactions={transactions} />
        </div>
      )}
    </>
  );
};

export default Transaction;
