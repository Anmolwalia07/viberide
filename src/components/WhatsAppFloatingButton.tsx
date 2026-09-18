'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MessageSquare, Phone, X } from 'lucide-react';
import { site as defaultSite } from '@/config/site';

interface WhatsAppFloatingButtonProps {
  phone?: string;
}

export function WhatsAppFloatingButton({ phone }: WhatsAppFloatingButtonProps) {
  const targetPhone = phone || defaultSite.whatsapp || defaultSite.phone || '+61 424 136 433';
  const cleanPhone = targetPhone.replace(/\D/g, '');
  const [isOpen, setIsOpen] = useState(false);
  const [showMessageIcon, setShowMessageIcon] = useState(false);

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const iconInterval = window.setInterval(() => {
      setShowMessageIcon((current) => !current);
    }, 2400);

    return () => window.clearInterval(iconInterval);
  }, [isOpen]);

  return (
    <aside aria-label="Contact options" className="fixed bottom-5 right-5 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
      <div
        id="contact-options"
        className={`mb-3 flex flex-col items-end gap-3 transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <a
          href={`tel:${cleanPhone}`}
          aria-label={`Call us on ${targetPhone}`}
          tabIndex={isOpen ? 0 : -1}
          className="group flex items-center gap-3"
        >
          <span className="rounded bg-[#111315]/95 px-3 py-1.5 text-xs font-medium text-white shadow-xl">
            Call
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f2937] text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
            <Phone className="h-5 w-5" aria-hidden="true" />
          </span>
        </a>

        <a
          href={`https://wa.me/${cleanPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with us on WhatsApp at ${targetPhone}`}
          tabIndex={isOpen ? 0 : -1}
          className="group flex items-center gap-3"
        >
          <span className="rounded bg-[#111315]/95 px-3 py-1.5 text-xs font-medium text-white shadow-xl">
            WhatsApp
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
            <FaWhatsapp className="h-6 w-6" aria-hidden="true" />
          </span>
        </a>

        <a
          href={`sms:${cleanPhone}`}
          aria-label={`Send us a text message at ${targetPhone}`}
          tabIndex={isOpen ? 0 : -1}
          className="group flex items-center gap-3"
        >
          <span className="rounded bg-[#111315]/95 px-3 py-1.5 text-xs font-medium text-white shadow-xl">
            Text message
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
            <MessageSquare className="h-5 w-5" aria-hidden="true" />
          </span>
        </a>
      </div>

      <a
        href="#contact-options"
        onClick={(event) => {
          event.preventDefault();
          setIsOpen((current) => !current);
        }}
        aria-expanded={isOpen}
        aria-controls="contact-options"
        aria-label={isOpen ? 'Close contact options' : 'Open contact options'}
        className="group self-end flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#111315] shadow-[0_4px_20px_rgba(17,19,21,0.25)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_28px_rgba(17,19,21,0.4)] active:scale-95 sm:h-16 sm:w-16"
      >
        {isOpen ? (
          <X className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90 sm:h-8 sm:w-8" aria-hidden="true" />
        ) : showMessageIcon ? (
          <MessageSquare className="h-7 w-7 transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8" aria-hidden="true" />
        ) : (
          <Phone className="h-7 w-7 transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8" aria-hidden="true" />
        )}
      </a>
    </aside>
  );
}
