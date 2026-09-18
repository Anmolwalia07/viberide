'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { site as defaultSite } from '@/config/site';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/melbourne-airport-transfers', label: 'Airport Transfers' },
  { href: '/corporate-chauffeur-melbourne', label: 'Corporate' },
  { href: '/private-chauffeur-melbourne', label: 'Private Chauffeur' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export function Nav({ site = defaultSite }: { site?: typeof defaultSite }) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {/* Header */}
      <div className="container mx-auto flex h-20 items-center justify-between px-5 sm:px-6 md:h-24">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="relative z-50 text-sm uppercase tracking-[.25em]"
        >
          {site.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[.15em] text-neutral-300 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-6 md:flex">
          {/* WhatsApp */}
          {isConfigured(site.whatsapp) && <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className="flex h-10 w-10 items-center justify-center border border-green-500/40 text-green-400 transition hover:border-green-400 hover:bg-green-400/10"><FaWhatsapp size={21} className="text-green-500" /></a>}

          {/* Contact Number */}
          {isConfigured(site.phone) && (
            <a
              href={`tel:${site.phone.replace(/\s+/g, '')}`}
              className="phone-blink p-2   border-white/40 border-2 flex items-center gap-2.5 text-[15px] lg:text-[17px] font-bold tracking-wide text-white transition-colors hover:text-[#b9a47a] whitespace-nowrap"
              aria-label={`Call us at ${site.phone}`}
            >
              <Phone size={18} className="text-[#b9a47a] shrink-0" />
              <span>{site.phone}</span>
            </a>
          )}

          {/* Booking
          <Link
            href="/#quote-form"
            className="btn"
          >
            GET A QUOTE
          </Link> */}
        </div>

        {/* Mobile Header Actions */}
        <div className="flex items-center gap-1 md:hidden">
          {isConfigured(site.phone) && (
            <a
              href={`tel:${site.phone.replace(/\s+/g, '')}`}
              aria-label={`Call us at ${site.phone}`}
              className="phone-blink relative z-50 flex h-11 w-11 items-center justify-center text-[#b9a47a] transition hover:text-white"
            >
              <Phone size={20} />
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="relative z-50 flex h-11 w-11 items-center justify-center"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X
                size={24}
                strokeWidth={1.5}
              />
            ) : (
              <Menu
                size={24}
                strokeWidth={1.5}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`absolute inset-x-0 top-20 border-t border-white/10 bg-[#0b0c0d] shadow-2xl transition-all duration-200 md:hidden ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <nav className="px-5 py-6 sm:px-6">
          {/* Links */}
          <div className="grid gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block py-3 text-sm uppercase tracking-[.15em] text-neutral-200 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-5 grid gap-3 border-t border-white/10 pt-5">
            {/* WhatsApp */}
            {isConfigured(site.whatsapp) && <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" onClick={closeMenu} className="flex min-h-12 items-center justify-center gap-2 border border-green-500/30 text-green-400 transition hover:border-green-400 hover:bg-green-400/10"><FaWhatsapp size={20} /><span>WhatsApp</span></a>}

            {/* Call */}
            {isConfigured(site.phone) && (
              <a
                href={`tel:${site.phone.replace(/\s+/g, '')}`}
                onClick={closeMenu}
                className="btn secondary phone-blink flex min-h-12 items-center justify-center gap-2 text-sm font-bold tracking-wide"
              >
                <Phone size={17} className="text-[#b9a47a]" />
                <span>Call {site.phone}</span>
              </a>
            )}

            {/* Booking */}
            <Link
              href="/#quote-form"
              onClick={closeMenu}
              className="btn flex min-h-12 items-center justify-center"
            >
              GET A QUOTE
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className="fixed inset-0 -z-10 bg-black/50 md:hidden"
        />
      )}
    </header>
  );
}

function isConfigured(value: string) {
  return Boolean(value && !value.startsWith('['));
}
 