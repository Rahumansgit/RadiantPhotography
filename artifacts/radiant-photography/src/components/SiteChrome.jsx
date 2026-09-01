import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navItems } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

export function usePageTitle(title, description) {
  useEffect(() => {
    document.title = `${title} — Radiant Photography`;
    const meta = document.querySelector('meta[name="description"]') || document.createElement('meta');
    meta.name = 'description';
    meta.content = description;
    document.head.appendChild(meta);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title, description]);
}

export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current, { opacity: 0, y: 22 }, {
        opacity: 1, y: 0, duration: .85, delay: delay / 1000, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    });
    return () => media.revert();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function Header({ dark = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 72);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  return (
    <header className={`site-header ${dark ? 'site-header-dark' : ''} ${scrolled ? 'site-header-scrolled' : ''}`}>
      <div className="header-inner container-editorial">
        <Link href="/" className="wordmark" aria-label="Radiant Photography home">
          <span>Radiant</span><small>Photography</small>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={`line-link ${location === item.href ? 'active' : ''}`} aria-current={location === item.href ? 'page' : undefined}>{item.label}</Link>)}
          <Link href="/book" className="header-cta">Enquire <ArrowUpRight size={15} strokeWidth={1.5} /></Link>
        </nav>
        <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={23} strokeWidth={1.4} /> : <Menu size={23} strokeWidth={1.4} />}
        </button>
      </div>
      <AnimatePresence>
        {open && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .28 }}>
          <p className="eyebrow">A little more Radiant</p>
          <nav aria-label="Mobile navigation">
            {navItems.map((item, index) => <motion.div key={item.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .06 }}><Link href={item.href}>{item.label}</Link></motion.div>)}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}><Link href="/book" className="mobile-enquire">Start a conversation <ArrowUpRight size={16} /></Link></motion.div>
          </nav>
          <div className="mobile-menu-foot"><span>70, Kalasth Nagar, 4th Cross Street · Fairlands, Salem</span></div>
        </motion.div>}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return <footer className="footer">
    <div className="container-editorial footer-grid">
      <div><p className="eyebrow">Radiant Photography</p><h2 className="display">The good stuff,<br /><i>honestly seen.</i></h2></div>
      <div className="footer-link-col"><span className="eyebrow">Explore</span><Link href="/portfolio">Portfolio</Link><Link href="/services">Services</Link><Link href="/about">About the studio</Link><Link href="/book">Make an enquiry</Link></div>
      <div className="footer-link-col"><span className="eyebrow">Find us</span><span>70, Kalasth Nagar, 4th Cross Street<br />Fairlands, Salem - 16</span><a href="mailto:hello@radiantphoto.studio">hello@radiantphoto.studio</a><a href="https://www.instagram.com/radiant_photography__/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a></div>
    </div>
    <div className="container-editorial footer-bottom"><span>© 2026 Radiant Photography</span><span>Bringing Colours to Life</span><span>Made for the in-between</span></div>
  </footer>;
}

export function PageLayout({ children, darkHeader = false, className = '' }) {
  return <div className={`site-shell grain page-enter ${className}`}><Header dark={darkHeader} />{children}<Footer /></div>;
}
