import React, { useState } from 'react';
import { FAQS, FAQItem } from '../data';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQProps {
  onOpenContact: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenContact }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Collaboration', 'Delivery', 'Technical', 'Engagement'];

  const filteredFaqs =
    selectedCategory === 'All'
      ? FAQS
      : FAQS.filter((faq) => faq.category.toLowerCase() === selectedCategory.toLowerCase());

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-[#8B5CF6] text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase mb-3 flex items-center justify-center gap-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TRANSPARENT ANSWERS</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
            FREQUENTLY ASKED
            <br />
            <span className="text-[#8B5CF6]">QUESTIONS.</span>
          </h2>
          <p className="mt-4 text-base text-white/60 max-w-xl mx-auto font-light">
            Everything you need to know about partnering directly with the three founders of AMIGOWORKS.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-sm text-xs font-mono-code font-bold uppercase tracking-wider transition-all border ${
                selectedCategory === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-[#141414] text-white/60 border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq: FAQItem) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-[#0E0E0E] border border-white/10 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono-code text-[#8B5CF6] uppercase px-2 py-0.5 rounded-sm bg-white/5 border border-white/5">
                      {faq.category}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-white">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-sm flex items-center justify-center bg-white/5 border border-white/5 text-white/70 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#8B5CF6]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-white/60 font-light leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Have more questions CTA banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0E0E0E] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-bold text-white text-sm uppercase">
              Have a unique question about your project?
            </div>
            <div className="text-xs text-white/50 font-light mt-0.5">
              We respond directly to all technical inquiries in under 24 hours.
            </div>
          </div>
          <button
            onClick={onOpenContact}
            className="px-6 py-3 rounded-sm bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[#E5E5E5] transition-all flex items-center gap-2 shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>ASK US DIRECTLY</span>
          </button>
        </div>
      </div>
    </section>
  );
};
