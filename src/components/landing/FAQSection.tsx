import { useState } from "react";
import { ChevronDown, CircleHelp } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

export function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="sss" className="w-full bg-surface-container-low py-10 lg:py-16 relative scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-8 flex flex-col gap-1">
          <div className="inline-flex items-center gap-2 text-secondary text-label-sm uppercase tracking-wider">
            <CircleHelp size={18} />
            <span>{t.faq.eyebrow}</span>
          </div>
          <h2 className="font-serif-display text-headline-lg text-primary tracking-tight">{t.faq.title}</h2>
          <p className="text-body-lg text-on-surface-variant">{t.faq.subtitle}</p>
        </div>

        <div className="flex flex-col gap-3">
          {t.faq.items.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 cursor-pointer"
                >
                  <span className="text-title-md text-primary">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-secondary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div className="px-5 pb-4 text-body-md text-on-surface-variant leading-relaxed animate-fade-in-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
