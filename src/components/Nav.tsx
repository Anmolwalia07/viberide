'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { site as defaultSite } from '@/config/site';
import {
  areaNavigation,
  fleetNavigation,
  primaryNavigation,
  serviceNavigation,
} from '@/config/navigation';

export function Nav({
  site = defaultSite,
}: {
  site?: typeof defaultSite;
}) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [fleetOpen, setFleetOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const fleetRef = useRef<HTMLDivElement>(null);
  const areasRef = useRef<HTMLDivElement>(null);

  /* =========================
     ACTIVE PAGE
  ========================== */

  const isActive = (href: string) => {
    if (!href) return false;

    const cleanHref = href.split('#')[0];

    // Home only active on homepage
    if (cleanHref === '/') {
      return pathname === '/';
    }

    // Exact page
    if (pathname === cleanHref) {
      return true;
    }

    // Child pages
    return pathname.startsWith(`${cleanHref}/`);
  };

  /* =========================
     SECTION ACTIVE STATES
  ========================== */

  const servicesActive =
    isActive('/services') ||
    serviceNavigation.some((link) => isActive(link.href));

  const fleetActive =
    isActive('/fleet') ||
    fleetNavigation.some((link) => isActive(link.href));

  const areasActive =
    isActive('/service-areas') ||
    areaNavigation.some((link) => isActive(link.href));

  /* =========================
     CLOSE ALL MENUS
  ========================== */

  const closeAllMenus = () => {
    setMobileOpen(false);
    setServicesOpen(false);
    setFleetOpen(false);
    setAreasOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setServicesOpen(false);
    setFleetOpen(false);
    setAreasOpen(false);
  };

  /* =========================
     CLICK OUTSIDE
  ========================== */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        servicesRef.current &&
        !servicesRef.current.contains(target)
      ) {
        setServicesOpen(false);
      }

      if (
        fleetRef.current &&
        !fleetRef.current.contains(target)
      ) {
        setFleetOpen(false);
      }

      if (
        areasRef.current &&
        !areasRef.current.contains(target)
      ) {
        setAreasOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /* =========================
     ESCAPE KEY
  ========================== */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllMenus();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  /* =========================
     LOCK BODY SCROLL
  ========================== */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {/* =========================
          HEADER
      ========================== */}

      <div className="container mx-auto flex h-20 items-center justify-between px-5 sm:px-6 md:h-24">

        {/* =========================
            LOGO
        ========================== */}

        <Link
          href="/"
          onClick={closeAllMenus}
          className="relative z-[60] text-sm uppercase tracking-[.25em] text-white"
          aria-label={`${site.name} home`}
        >
          {site.name}
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {/* =========================
              HOME
          ========================== */}

          <Link
            href="/"
            onClick={closeAllMenus}
            className={`font-sans text-[11px] font-normal uppercase tracking-[.15em] transition-colors ${
              isActive('/')
                ? 'text-[#b9a47a]'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <span className={`relative ${isActive('/') ? 'text-[#b9a47a]' : ''}`}>
              Home
              {isActive('/') && (
                <span
                  className="absolute -bottom-2 left-0 right-0 h-px bg-[#b9a47a]"
                  aria-hidden="true"
                />
              )}
            </span>
          </Link>

          {/* =========================
              SERVICES
          ========================== */}

          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => {
              setServicesOpen(true);
              setFleetOpen(false);
              setAreasOpen(false);
            }}
            onMouseLeave={() => {
              setServicesOpen(false);
            }}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-current={servicesActive ? 'page' : undefined}
              onClick={() => {
                setServicesOpen((value) => !value);
                setFleetOpen(false);
                setAreasOpen(false);
              }}
              className={`inline-flex appearance-none items-center gap-1 border-0 bg-transparent p-0 font-sans text-[11px] font-normal uppercase leading-normal tracking-[.15em] transition-colors ${
                servicesActive
                  ? 'text-[#b9a47a]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <span className={`relative text-[11px] leading-normal ${servicesActive ? 'text-[#b9a47a]' : ''}`}>
                Services
                {servicesActive && (
                  <span
                    className="absolute -bottom-2 left-0 right-0 h-px bg-[#b9a47a]"
                    aria-hidden="true"
                  />
                )}
              </span>

              <ChevronDown
                size={13}
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  servicesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* SERVICES DROPDOWN */}

            <div
              className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4 transition-all duration-200 ${
                servicesOpen
                  ? 'visible translate-y-0 opacity-100'
                  : 'invisible translate-y-2 opacity-0'
              }`}
            >
              <div className="border border-white/10 bg-[#0b0c0d] p-2 shadow-2xl">
                {serviceNavigation.map((link) => {
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeAllMenus}
                      className={`block px-4 py-3 font-sans text-[10px] font-normal uppercase tracking-[.12em] transition-colors ${
                        active
                          ? 'bg-white/5 text-[#b9a47a]'
                          : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {link.label}

                        {active && (
                          <span
                            className="ml-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9a47a]"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =========================
              FLEET
          ========================== */}

          <div
            ref={fleetRef}
            className="relative"
            onMouseEnter={() => {
              setFleetOpen(true);
              setServicesOpen(false);
              setAreasOpen(false);
            }}
            onMouseLeave={() => {
              setFleetOpen(false);
            }}
          >
            <button
              type="button"
              aria-expanded={fleetOpen}
              aria-haspopup="true"
              aria-current={fleetActive ? 'page' : undefined}
              onClick={() => {
                setFleetOpen((value) => !value);
                setServicesOpen(false);
                setAreasOpen(false);
              }}
              className={`inline-flex appearance-none items-center gap-1 border-0 bg-transparent p-0 font-sans text-[11px] font-normal uppercase leading-normal tracking-[.15em] transition-colors ${
                fleetActive
                  ? 'text-[#b9a47a]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <span className={`relative text-[11px] leading-normal ${fleetActive ? 'text-[#b9a47a]' : ''}`}>
                Fleet
                {fleetActive && (
                  <span
                    className="absolute -bottom-2 left-0 right-0 h-px bg-[#b9a47a]"
                    aria-hidden="true"
                  />
                )}
              </span>

              <ChevronDown
                size={13}
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  fleetOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* FLEET DROPDOWN */}

            <div
              className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4 transition-all duration-200 ${
                fleetOpen
                  ? 'visible translate-y-0 opacity-100'
                  : 'invisible translate-y-2 opacity-0'
              }`}
            >
              <div className="border border-white/10 bg-[#0b0c0d] p-2 shadow-2xl">
                {fleetNavigation.map((link) => {
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeAllMenus}
                      className={`block px-4 py-3 font-sans text-[10px] font-normal uppercase tracking-[.12em] transition-colors ${
                        active
                          ? 'bg-white/5 text-[#b9a47a]'
                          : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {link.label}

                        {active && (
                          <span
                            className="ml-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9a47a]"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =========================
              SERVICE AREAS
          ========================== */}

          <div
            ref={areasRef}
            className="relative"
            onMouseEnter={() => {
              setAreasOpen(true);
              setServicesOpen(false);
            }}
            onMouseLeave={() => {
              setAreasOpen(false);
            }}
          >
            <button
              type="button"
              aria-expanded={areasOpen}
              aria-haspopup="true"
              aria-current={areasActive ? 'page' : undefined}
              onClick={() => {
                setAreasOpen((value) => !value);
                setServicesOpen(false);
              }}
              className={`inline-flex appearance-none items-center gap-1 border-0 bg-transparent p-0 font-sans text-[11px] font-normal uppercase leading-normal tracking-[.15em] transition-colors ${
                areasActive
                  ? 'text-[#b9a47a]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <span className={`relative text-[11px] leading-normal ${areasActive ? 'text-[#b9a47a]' : ''}`}>
                Service Areas
                {areasActive && (
                  <span
                    className="absolute -bottom-2 left-0 right-0 h-px bg-[#b9a47a]"
                    aria-hidden="true"
                  />
                )}
              </span>

              <ChevronDown
                size={13}
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  areasOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* SERVICE AREAS DROPDOWN */}

            <div
              className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4 transition-all duration-200 ${
                areasOpen
                  ? 'visible translate-y-0 opacity-100'
                  : 'invisible translate-y-2 opacity-0'
              }`}
            >
              <div className="border border-white/10 bg-[#0b0c0d] p-2 shadow-2xl">
                {areaNavigation.map((link) => {
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeAllMenus}
                      className={`block px-4 py-3 font-sans text-[10px] font-normal uppercase tracking-[.12em] transition-colors ${
                        active
                          ? 'bg-white/5 text-[#b9a47a]'
                          : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {link.label}

                        {active && (
                          <span
                            className="ml-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9a47a]"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =========================
              PRIMARY NAVIGATION
              HOME FILTERED OUT
          ========================== */}

          {primaryNavigation
            .filter((link) => link.href !== '/' && link.href !== '/fleet')
            .map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAllMenus}
                  className={`font-sans text-[11px] font-normal uppercase tracking-[.15em] transition-colors ${
                    active
                      ? 'text-[#b9a47a]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span className={`relative ${active ? 'text-[#b9a47a]' : ''}`}>
                    {link.label}
                    {active && (
                      <span
                        className="absolute -bottom-2 left-0 right-0 h-px bg-[#b9a47a]"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </Link>
              );
            })}
        </nav>

        {/* =========================
            DESKTOP CTA
        ========================== */}

        <div className="hidden items-center gap-6 md:flex">
          {isConfigured(site.phone) && (
            <a
              href={`tel:${site.phone.replace(/\s+/g, '')}`}
              className="phone-blink flex items-center gap-2.5 whitespace-nowrap border-2 border-white/40 p-2 text-[15px] font-bold tracking-wide text-white transition-colors hover:border-[#b9a47a] hover:text-[#b9a47a] lg:text-[17px]"
              aria-label={`Call us at ${site.phone}`}
            >
              <Phone
                size={27}
                className="shrink-0 text-[#b9a47a]"
                aria-hidden="true"
              />
            </a>
          )}

          <Link
            href="/#quote-form"
            onClick={closeAllMenus}
            className="btn"
          >
            GET A QUOTE
          </Link>
        </div>

        {/* =========================
            MOBILE HEADER ACTIONS
        ========================== */}

        <div className="flex items-center gap-1 md:hidden">
          {isConfigured(site.phone) && (
            <a
              href={`tel:${site.phone.replace(/\s+/g, '')}`}
              aria-label={`Call us at ${site.phone}`}
              className="phone-blink relative z-[60] flex h-11 w-11 items-center justify-center text-[#b9a47a] transition hover:text-white"
            >
              <Phone
                size={20}
                aria-hidden="true"
              />
            </a>
          )}

          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMobileOpen((value) => !value);
              setServicesOpen(false);
              setFleetOpen(false);
              setAreasOpen(false);
            }}
            className="relative z-[60] flex h-11 w-11 items-center justify-center text-white"
          >
            {mobileOpen ? (
              <X
                size={24}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            ) : (
              <Menu
                size={24}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>

      {/* =========================
          MOBILE NAVIGATION
      ========================== */}

      <div
        id="mobile-navigation"
        className={`fixed inset-x-0 top-20 z-50 border-t border-white/10 bg-[#0b0c0d] shadow-2xl transition-all duration-200 md:hidden ${
          mobileOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <nav
          className="max-h-[calc(100vh-5rem)] overflow-y-auto px-5 py-6 sm:px-6"
          aria-label="Mobile navigation"
        >
          <div className="grid gap-1">

            {/* HOME */}

            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`block py-3 font-sans text-sm font-normal uppercase tracking-[.15em] transition-colors ${
                isActive('/')
                  ? 'text-[#b9a47a]'
                  : 'text-neutral-200 hover:text-white'
              }`}
            >
              <span className={`relative ${isActive('/') ? 'text-[#b9a47a]' : ''}`}>
                Home
                {isActive('/') && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#b9a47a]"
                    aria-hidden="true"
                  />
                )}
              </span>
            </Link>

            {/* SERVICES */}

            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-current={servicesActive ? 'page' : undefined}
              onClick={() => {
                setServicesOpen((value) => !value);
                setFleetOpen(false);
                setAreasOpen(false);
              }}
              className={`flex w-full items-center justify-between py-3 text-left font-sans text-sm font-normal uppercase tracking-[.15em] transition-colors ${
                servicesActive
                  ? 'text-[#b9a47a]'
                  : 'text-neutral-200 hover:text-white'
              }`}
            >
              <span className={servicesActive ? 'text-[#b9a47a]' : ''}>Services</span>

              <ChevronDown
                size={17}
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  servicesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* SERVICES CHILDREN */}

            <div
              className={`ml-4 grid overflow-hidden border-l border-white/10 pl-4 transition-all duration-200 ${
                servicesOpen
                  ? 'mb-2 max-h-[500px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {serviceNavigation.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between py-2 font-sans text-xs font-normal uppercase tracking-[.12em] transition-colors ${
                      active
                        ? 'text-[#b9a47a]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>

                    {active && (
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9a47a]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* SERVICE AREAS */}

            <button
              type="button"
              aria-expanded={areasOpen}
              aria-current={areasActive ? 'page' : undefined}
              onClick={() => {
                setAreasOpen((value) => !value);
                setServicesOpen(false);
                setFleetOpen(false);
              }}
              className={`flex w-full items-center justify-between py-3 text-left font-sans text-sm font-normal uppercase tracking-[.15em] transition-colors ${
                areasActive
                  ? 'text-[#b9a47a]'
                  : 'text-neutral-200 hover:text-white'
              }`}
            >
              <span className={areasActive ? 'text-[#b9a47a]' : ''}>Service Areas</span>

              <ChevronDown
                size={17}
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  areasOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* FLEET */}

            <button
              type="button"
              aria-expanded={fleetOpen}
              aria-current={fleetActive ? 'page' : undefined}
              onClick={() => {
                setFleetOpen((value) => !value);
                setServicesOpen(false);
                setAreasOpen(false);
              }}
              className={`flex w-full items-center justify-between py-3 text-left font-sans text-sm font-normal uppercase tracking-[.15em] transition-colors ${
                fleetActive
                  ? 'text-[#b9a47a]'
                  : 'text-neutral-200 hover:text-white'
              }`}
            >
              <span className={fleetActive ? 'text-[#b9a47a]' : ''}>Fleet</span>

              <ChevronDown
                size={17}
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  fleetOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* FLEET CHILDREN */}

            <div
              className={`ml-4 grid overflow-hidden border-l border-white/10 pl-4 transition-all duration-200 ${
                fleetOpen
                  ? 'mb-2 max-h-[500px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {fleetNavigation.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between py-2 font-sans text-xs font-normal uppercase tracking-[.12em] transition-colors ${
                      active
                        ? 'text-[#b9a47a]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>

                    {active && (
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9a47a]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* SERVICE AREA CHILDREN */}

            <div
              className={`ml-4 grid overflow-hidden border-l border-white/10 pl-4 transition-all duration-200 ${
                areasOpen
                  ? 'mb-2 max-h-[500px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {areaNavigation.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between py-2 font-sans text-xs font-normal uppercase tracking-[.12em] transition-colors ${
                      active
                        ? 'text-[#b9a47a]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>

                    {active && (
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9a47a]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* PRIMARY NAVIGATION */}

            {primaryNavigation
              .filter((link) => link.href !== '/' && link.href !== '/fleet')
              .map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`block py-3 font-sans text-sm font-normal uppercase tracking-[.15em] transition-colors ${
                      active
                        ? 'text-[#b9a47a]'
                        : 'text-neutral-200 hover:text-white'
                    }`}
                  >
                    <span className={`relative ${active ? 'text-[#b9a47a]' : ''}`}>
                      {link.label}
                      {active && (
                        <span
                          className="absolute -bottom-1 left-0 right-0 h-px bg-[#b9a47a]"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </Link>
                );
              })}
          </div>

          {/* MOBILE CTA */}

          <div className="mt-5 grid gap-3 border-t border-white/10 pt-5">

            {/* CALL */}

            {isConfigured(site.phone) && (
              <a
                href={`tel:${site.phone.replace(/\s+/g, '')}`}
                onClick={closeMobileMenu}
                className="btn secondary phone-blink flex min-h-12 items-center justify-center gap-2 text-sm font-bold tracking-wide"
              >
                <Phone
                  size={17}
                  className="text-[#b9a47a]"
                  aria-hidden="true"
                />

                <span>Call {site.phone}</span>
              </a>
            )}

            {/* GET A QUOTE */}

            <Link
              href="/#quote-form"
              onClick={closeMobileMenu}
              className="btn flex min-h-12 items-center justify-center"
            >
              GET A QUOTE
            </Link>
          </div>
        </nav>
      </div>

      {/* =========================
          MOBILE BACKDROP
      ========================== */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}
    </header>
  );
}

/* =========================
   PHONE CONFIGURATION
========================= */

function isConfigured(value: string) {
  return Boolean(value && !value.startsWith('['));
}