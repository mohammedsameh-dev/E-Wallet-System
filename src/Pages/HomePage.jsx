import { useEffect, useRef, useState } from "react";
import MyHeader from "../Components/MyHeader";
import toast from "react-hot-toast";

export default function HomePage() {
  const userBalanceInput = useRef();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const currentId = +localStorage.getItem("currentUserId");
    const user = storedUsers.find((u) => u.id === currentId);

    setUsers(storedUsers);
    setCurrentUser(user);
  }, []);

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const deposit = () => {
    const amount = +userBalanceInput.current.value;
    if (isNaN(amount) || amount <= 0) return toast.error("Invalid amount");

    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance + amount,
      transactions: [
        ...currentUser.transactions,
        { type: "Deposit", amount, date: new Date().toLocaleString() },
      ],
    };
    updateUser(updatedUser);
    toast.success(`Deposited $${amount}`);
    userBalanceInput.current.value = "";
  };

  const withdraw = () => {
    const amount = parseFloat(userBalanceInput.current.value);
    if (isNaN(amount) || amount <= 0) return toast.error("Invalid amount");
    if (amount > currentUser.balance)
      return toast.error("Insufficient balance");

    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance - amount,
      transactions: [
        ...currentUser.transactions,
        { type: "Withdraw", amount, date: new Date().toLocaleString() },
      ],
    };
    updateUser(updatedUser);
    toast.success(`Withdrew $${amount}`);
    userBalanceInput.current.value = "";
  };

  if (!currentUser) {
    return <div className="p-4 text-center">No user logged in</div>;
  }

  return (
    <>
      <MyHeader />
      <div className="h-[90vh] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-6">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4 mt-10">
          <h1 className="text-4xl font-bold text-center text-emerald-600">
            Your Balance is: ${currentUser.balance}
          </h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl font-medium">
              Enter Amount:
            </label>
            <input
              ref={userBalanceInput}
              id="amount"
              type="number"
              placeholder="Enter the amount"
              className="input input-bordered w-full px-4 py-2 rounded-lg"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="btn bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-lg"
              onClick={deposit}
            >
              Deposit
            </button>
            <button
              className="btn bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-lg"
              onClick={withdraw}
            >
              Withdraw
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center mt-5">
          <table className="text-center table bg-emerald-900">
            <thead>
              <tr>
                <th>#</th>
                <th>Before Balance: </th>
                <th>After Balance: </th>
                <th>Amount: </th>
                <th>Type: </th>
              </tr>
            </thead>
            <tbody>
              {currentUser.transactions.map((tx, index) => {
                let balanceBefore = 0;
                for (let i = 0; i < index; i++) {
                  if (currentUser.transactions[i].type === "Deposit") {
                    balanceBefore += currentUser.transactions[i].amount;
                  } else {
                    balanceBefore -= currentUser.transactions[i].amount;
                  }
                }
                const balanceAfter =
                  tx.type === "Deposit"
                    ? balanceBefore + tx.amount
                    : balanceBefore - tx.amount;
                return (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">${balanceBefore}</td>
                    <td className="px-4 py-2">${balanceAfter}</td>
                    <td className="px-4 py-2">${tx.amount}</td>
                    <td className="px-4 py-2">{tx.type}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
