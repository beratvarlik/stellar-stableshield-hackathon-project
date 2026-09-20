import { Navigate } from "react-router-dom";
import { useWallet } from "../hooks/useWallet";
import { useLanguage } from "../hooks/useLanguage";
import { TopBar } from "../components/dashboard/TopBar";
import { BalanceCard } from "../components/dashboard/BalanceCard";
import { TransactionsList } from "../components/dashboard/TransactionsList";

export function Dashboard() {
  const { connected } = useWallet();
  const { t } = useLanguage();

  if (!connected) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-6 px-4 sm:px-6 bg-surface">
      <div className="w-full max-w-3xl space-y-5">
        <TopBar />
        <BalanceCard />
        <TransactionsList />
        <footer className="text-center py-2">
          <p className="text-[12px] text-on-surface-variant/70 font-medium">{t.dashboard.footerNote}</p>
        </footer>
      </div>
    </div>
  );
}
