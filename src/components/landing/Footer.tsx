import { ShieldCheck } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-serif-display text-headline-sm text-primary">{t.footer.title}</span>
            <p className="text-body-sm text-on-surface-variant max-w-xl">{t.footer.description}</p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-highest text-on-surface shrink-0">
            <ShieldCheck size={20} className="text-secondary" />
            <span className="text-label-sm">{t.footer.auditBadge}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 text-on-surface-variant text-body-sm border-t border-outline-variant/30">
          <span>
            © {new Date().getFullYear()} {t.footer.copyright}
          </span>
          <div className="flex items-center gap-6">
            <span>{t.footer.contracts}</span>
            <span>{t.footer.networkStatus}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
