'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { site as defaultSite } from '@/config/site';

interface WhatsAppFloatingButtonProps {
  phone?: string;
}

export function WhatsAppFloatingButton({ phone }: WhatsAppFloatingButtonProps) {
  const targetPhone = phone || defaultSite.whatsapp || defaultSite.phone || '+61 424 136 433';
  const cleanPhone = targetPhone.replace(/\D/g, '');

  return (
    <aside aria-label="WhatsApp chat support">
      <a
        href={`https://wa.me/${cleanPhone}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp (+61 424 136 433)"
        className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.7)] active:scale-95 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      >
        {/* Red notification badge matching reference image */}
        <span className="absolute -right-1 -top-1 flex h-5 w-5 sm:h-6 sm:w-6">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white shadow-md sm:h-6 sm:w-6 sm:text-xs">
            1
          </span>
        </span>

        {/* WhatsApp Icon */}
        <FaWhatsapp className="h-7 w-7 transition-transform duration-300 group-hover:rotate-6 sm:h-8 sm:w-8" />

        {/* Hover Tooltip for desktop */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded bg-[#111315]/95 px-3 py-1.5 text-xs font-medium text-white shadow-xl border border-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block">
          Chat with us on WhatsApp
        </span>
      </a>
    </aside>
  );
}

