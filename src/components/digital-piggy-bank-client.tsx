"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Target,
  TrendingUp,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  description: string;
  date: Date;
}

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: Date;
}

export default function DigitalPiggyBankClient() {
  const [balance, setBalance] = useState(75.5);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "t1",
      type: "deposit",
      amount: 20,
      description: "Birthday money",
      date: new Date(2023, 5, 15),
    },
    {
      id: "t2",
      type: "deposit",
      amount: 10,
      description: "Allowance",
      date: new Date(2023, 5, 10),
    },
    {
      id: "t3",
      type: "withdrawal",
      amount: 5,
      description: "Ice cream",
      date: new Date(2023, 5, 5),
    },
    {
      id: "t4",
      type: "deposit",
      amount: 50.5,
      description: "Lemonade stand earnings",
      date: new Date(2023, 4, 28),
    },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "g1",
      name: "New Bike",
      targetAmount: 120,
      currentAmount: 45,
    },
    {
      id: "g2",
      name: "Art Supplies",
      targetAmount: 50,
      currentAmount: 30,
    },
  ]);

  const handleDeposit = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    const newAmount = parseFloat(amount);
    setBalance(balance + newAmount);

    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      type: "deposit",
      amount: newAmount,
      description: description || "Deposit",
      date: new Date(),
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount("");
    setDescription("");
  };

  const handleWithdrawal = () => {
    if (!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance)
      return;

    const newAmount = parseFloat(amount);
    setBalance(balance - newAmount);

    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      type: "withdrawal",
      amount: newAmount,
      description: description || "Withdrawal",
      date: new Date(),
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount("");
    setDescription("");
  };

  const addGoal = () => {
    if (!goalName || !goalAmount || parseFloat(goalAmount) <= 0) return;

    const newGoal: Goal = {
      id: `g${Date.now()}`,
      name: goalName,
      targetAmount: parseFloat(goalAmount),
      currentAmount: 0,
    };

    setGoals([...goals, newGoal]);
    setGoalName("");
    setGoalAmount("");
  };

  const contributeToGoal = (goalId: string, amount: number) => {
    if (amount > balance) return;

    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            currentAmount: goal.currentAmount + amount,
          };
        }
        return goal;
      }),
    );

    setBalance(balance - amount);

    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      type: "withdrawal",
      amount: amount,
      description: `Contribution to ${goals.find((g) => g.id === goalId)?.name}`,
      date: new Date(),
    };

    setTransactions([newTransaction, ...transactions]);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">My Digital Piggy Bank</CardTitle>
              <CardDescription className="text-yellow-100">
                Track your savings and set goals
              </CardDescription>
            </div>
            <PiggyBank className="h-12 w-12 text-yellow-100" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2">
            {formatCurrency(balance)}
          </div>
          <p className="text-yellow-100">Current Balance</p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            variant="secondary"
            className="flex-1 bg-white/20 hover:bg-white/30 text-white"
            onClick={() => setActiveTab("deposit")}
          >
            <ArrowUpRight className="mr-2 h-4 w-4" /> Deposit
          </Button>
          <Button
            variant="secondary"
            className="flex-1 bg-white/20 hover:bg-white/30 text-white"
            onClick={() => setActiveTab("withdraw")}
          >
            <ArrowDownRight className="mr-2 h-4 w-4" /> Withdraw
          </Button>
        </CardFooter>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-yellow-600" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <div className="font-medium">
                          {transaction.description}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(transaction.date)}
                        </div>
                      </div>
                      <div
                        className={`font-medium ${transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "deposit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No transactions yet
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Target className="h-5 w-5 mr-2 text-yellow-600" />
                Savings Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              {goals.length > 0 ? (
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{goal.name}</div>
                        <div className="text-sm">
                          {formatCurrency(goal.currentAmount)} /{" "}
                          {formatCurrency(goal.targetAmount)}
                        </div>
                      </div>
                      <Progress
                        value={(goal.currentAmount / goal.targetAmount) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No goals set yet
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deposit" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Make a Deposit</CardTitle>
              <CardDescription>Add money to your piggy bank</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Description (optional)
                </label>
                <Input
                  placeholder="What's this money for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-yellow-600 hover:bg-yellow-700"
                onClick={handleDeposit}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Add Money
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Make a Withdrawal</CardTitle>
              <CardDescription>Take money from your piggy bank</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    max={balance}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Available balance: {formatCurrency(balance)}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Description (optional)
                </label>
                <Input
                  placeholder="What are you using this money for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-yellow-600 hover:bg-yellow-700"
                onClick={handleWithdrawal}
                disabled={
                  !amount ||
                  parseFloat(amount) <= 0 ||
                  parseFloat(amount) > balance
                }
              >
                <ArrowDownRight className="mr-2 h-4 w-4" />
                Withdraw Money
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Savings Goals</CardTitle>
              <CardDescription>
                Set targets for things you want to buy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.length > 0 && (
                <div className="space-y-6 mb-6">
                  {goals.map((goal) => (
                    <div key={goal.id} className="space-y-2 border-b pb-4">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{goal.name}</div>
                        <div className="text-sm font-medium">
                          {formatCurrency(goal.currentAmount)} /{" "}
                          {formatCurrency(goal.targetAmount)}
                        </div>
                      </div>
                      <Progress
                        value={(goal.currentAmount / goal.targetAmount) * 100}
                        className="h-2"
                      />

                      <div className="flex justify-between items-center pt-2">
                        <div className="text-sm text-gray-500">
                          {formatCurrency(
                            goal.targetAmount - goal.currentAmount,
                          )}{" "}
                          more needed
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const amount = Math.min(10, balance);
                            if (amount > 0) contributeToGoal(goal.id, amount);
                          }}
                          disabled={balance <= 0}
                        >
                          Add $10
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Create New Goal</h3>
                <div className="space-y-3">
                  <Input
                    placeholder="Goal name"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                  />
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      type="number"
                      placeholder="Target amount"
                      className="pl-10"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                    onClick={addGoal}
                    disabled={
                      !goalName || !goalAmount || parseFloat(goalAmount) <= 0
                    }
                  >
                    Add New Goal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
