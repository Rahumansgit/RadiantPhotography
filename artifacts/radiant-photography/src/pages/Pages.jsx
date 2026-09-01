import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'wouter';
import { portfolio, services, testimonials } from '../data/site';
import { PageLayout, Reveal, usePageTitle } from '../components/SiteChrome';

gsap.registerPlugin(ScrollTrigger);

function CinematicImage({ item, className = '', eager = false }) {
  return <div className={`photo-frame ${className}`}><img src={item.image} alt={item.alt} loading={eager ? 'eager' : 'lazy'} /></div>;
}

export function Home() {
  usePageTitle('Bringing Colours to Life', 'Radiant Photography creates honest, artful photographs for weddings, families, maternity and fashion.');
  const heroRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-image img', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } });
    }, heroRef);
    return () => ctx.revert();
  }, []);
  return <PageLayout darkHeader className="home-page">
    <section className="hero" ref={heroRef}>
      <div className="hero-image"><img src={portfolio[0].image} alt={portfolio[0].alt} /></div>
      <div className="hero-shade" />
      <div className="hero-copy container-editorial">
        <p className="eyebrow">Wedding · Maternity · Kids · Models</p>
        <h1 className="display">Bringing<br /><i>Colours</i> to Life</h1>
        <Link href="/portfolio" className="hero-link">Enter the stories <ArrowDown size={17} strokeWidth={1.2} /></Link>
      </div>
      <div className="hero-side-label">Radiant Photography <span>—</span> NSW / AU</div>
      <div className="scroll-cue"><span>Scroll to explore</span><i /></div>
    </section>
    <section className="intro-section container-editorial">
      <Reveal className="intro-kicker"><span className="eyebrow">01 / The feeling</span><span className="intro-rule" /></Reveal>
      <Reveal className="intro-copy" delay={100}><p className="display">Photographs for the<br /><i>parts you almost miss.</i></p><p className="body-copy">Radiant is a photography studio for the beautifully ordinary and the once-in-a-lifetime. We work with warmth, patience and a little bit of instinct — making images that feel like you, only more so.</p></Reveal>
    </section>
    <section className="home-feature">
      <Reveal className="feature-image-wrap"><CinematicImage item={portfolio[4]} /></Reveal>
      <Reveal className="feature-note" delay={120}><span className="eyebrow">A wedding in Mudgee</span><h2 className="display">Before<br /><i>the music</i></h2><Link href="/portfolio" className="line-link">View the portfolio <ArrowUpRight size={14} /></Link></Reveal>
    </section>
    <section className="home-services container-editorial">
      <Reveal className="section-heading"><span className="eyebrow">02 / What we do</span><h2 className="display">Room for every<br /><i>kind of story.</i></h2><Link href="/services" className="line-link">Explore services <ArrowUpRight size={14} /></Link></Reveal>
      <div className="service-list">{services.map((service, index) => <Reveal key={service.name} delay={index * 80}><Link href="/services" className="service-row"><span className="service-number">{service.number}</span><span className="service-name display">{service.name}</span><span className="service-short">{service.short}</span><ArrowUpRight size={18} strokeWidth={1.1} /></Link></Reveal>)}</div>
    </section>
    <section className="home-testimonial">
      <Reveal><span className="eyebrow">03 / Kind words</span><blockquote className="display">“{testimonials[0].quote}”</blockquote><p>{testimonials[0].name} <span>— {testimonials[0].detail}</span></p></Reveal>
    </section>
    <section className="home-closing container-editorial"><Reveal><div className="closing-image"><CinematicImage item={portfolio[11]} /></div><div className="closing-copy"><span className="eyebrow">Let’s make something real</span><h2 className="display">Your story<br /><i>starts here.</i></h2><Link href="/book" className="dark-link">Make an enquiry <ArrowUpRight size={16} /></Link></div></Reveal></section>
  </PageLayout>;
}

function Lightbox({ items, active, onClose, onChange }) {
  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onChange((active + 1) % items.length);
      if (event.key === 'ArrowLeft') onChange((active - 1 + items.length) % items.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [active, items.length, onChange, onClose]);
  if (active === null) return null;
  const item = items[active];
  return <AnimatePresence><motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={`${item.title} photograph`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <button className="lightbox-close" onClick={onClose} aria-label="Close photograph"><X size={24} /></button>
    <button className="lightbox-arrow lightbox-prev" onClick={(event) => { event.stopPropagation(); onChange((active - 1 + items.length) % items.length); }} aria-label="Previous photograph"><ArrowLeft /></button>
    <figure onClick={(event) => event.stopPropagation()}><img src={item.image} alt={item.alt} /><figcaption><span>{item.category} / {item.location}</span><strong>{item.title}</strong></figcaption></figure>
    <button className="lightbox-arrow lightbox-next" onClick={(event) => { event.stopPropagation(); onChange((active + 1) % items.length); }} aria-label="Next photograph"><ArrowRight /></button>
  </motion.div></AnimatePresence>;
}

export function Portfolio() {
  usePageTitle('Portfolio', 'Explore wedding, maternity, kids and fashion photographs by Radiant Photography.');
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);
  const categories = ['All', 'Wedding', 'Maternity', 'Kids', 'Models'];
  const filtered = useMemo(() => filter === 'All' ? portfolio : portfolio.filter((item) => item.category === filter), [filter]);
  return <PageLayout><main className="inner-page portfolio-page"><section className="page-intro container-editorial"><Reveal><span className="eyebrow">The archive / 2020—24</span><h1 className="display">A life in<br /><i>good light.</i></h1><p>Selected work across weddings, growing families, and the people who make things interesting.</p></Reveal></section>
    <section className="portfolio-controls container-editorial"><div className="filter-list" role="tablist" aria-label="Filter portfolio">{categories.map((category) => <button key={category} role="tab" aria-selected={filter === category} className={filter === category ? 'selected' : ''} onClick={() => setFilter(category)}>{category}</button>)}</div><span className="archive-count">{filtered.length.toString().padStart(2, '0')} photographs</span></section>
    <motion.section layout className="portfolio-grid container-editorial">{filtered.map((item, index) => <motion.button layout key={item.id} className={`portfolio-item portfolio-item-${index % 5}`} onClick={() => setActive(index)} aria-label={`Open ${item.title}`}><CinematicImage item={item} /><span className="portfolio-caption"><span>{item.category}</span><strong>{item.title}</strong></span></motion.button>)}</motion.section>
    <Lightbox items={filtered} active={active} onClose={() => setActive(null)} onChange={setActive} />
    </main></PageLayout>;
}

export function Services() {
  usePageTitle('Services', 'Thoughtful photography services for weddings, maternity, kids and models by Radiant Photography.');
  return <PageLayout><main className="inner-page services-page"><section className="page-intro container-editorial"><Reveal><span className="eyebrow">Ways to work together</span><h1 className="display">Made around<br /><i>your people.</i></h1><p>Every session begins with a conversation, not a package. Here are the places we tend to make our best work.</p></Reveal></section>
    <section className="service-stories">{services.map((service, index) => <article className={`service-story ${index % 2 ? 'story-reverse' : ''}`} key={service.name}><div className="story-image"><CinematicImage item={service} /></div><Reveal className="story-content"><span className="eyebrow">{service.number} / {service.name}</span><h2 className="display">{service.short}</h2><p>{service.description}</p><ul>{service.details.map((detail) => <li key={detail}><Check size={15} strokeWidth={1.3} />{detail}</li>)}</ul><Link href="/book" className="line-link">Talk about {service.name.toLowerCase()} <ArrowUpRight size={14} /></Link></Reveal></article>)}</section>
    <section className="service-note"><Reveal><p className="display">No two stories<br /><i>look the same.</i></p><Link href="/book" className="dark-link">Tell us yours <ArrowUpRight size={16} /></Link></Reveal></section>
  </main></PageLayout>;
}

export function About() {
  usePageTitle('About the Studio', 'Meet the person and the point of view behind Radiant Photography.');
  return <PageLayout><main className="inner-page about-page"><section className="page-intro container-editorial"><Reveal><span className="eyebrow">A note from Radiant</span><h1 className="display">Photographs with<br /><i>somewhere to go.</i></h1></Reveal></section>
    <section className="about-manifesto container-editorial"><Reveal><div className="manifesto-image"><CinematicImage item={{ image: portfolio[7].image, alt: 'A fashion portrait in warm natural light' }} /></div></Reveal><Reveal className="manifesto-copy" delay={120}><span className="eyebrow">The studio</span><p className="display">We are drawn to<br /><i>the in-between.</i></p><p>That second before a laugh. The quiet after the ceremony. A child mid-story, hands moving faster than words. These are the frames we keep coming back to.</p><p>Radiant Photography is a small, independent studio based between the coast and the country in New South Wales. We photograph weddings, families, growing bodies and creative people with a soft eye and a clear point of view.</p></Reveal></section>
    <section className="about-values"><Reveal><span className="eyebrow">What matters here</span><div className="values-list"><div><strong>01</strong><p className="display">Presence<br /><i>over perfection.</i></p></div><div><strong>02</strong><p className="display">Light that<br /><i>feels like you.</i></p></div><div><strong>03</strong><p className="display">A calm room<br /><i>to be yourself.</i></p></div></div></Reveal></section>
    <section className="photographer container-editorial"><Reveal className="photographer-copy"><span className="eyebrow">Behind the camera</span><h2 className="display">Hi, I’m<br /><i>Rae.</i></h2><p>I started Radiant because I wanted to make photographs that felt less like proof and more like memory. The kind you find years later and can still feel in your chest.</p><p>When I am not photographing people, I am usually somewhere near water, looking for the best bakery in town, or making a very strong case for taking the long way home.</p><Link href="/book" className="line-link">Come say hello <ArrowUpRight size={14} /></Link></Reveal><Reveal className="photographer-image" delay={150}><CinematicImage item={{ image: portfolio[10].image, alt: 'Rae, founder and photographer of Radiant Photography' }} /></Reveal></section>
    <section className="about-quote"><Reveal><blockquote className="display">“The most beautiful thing in a photograph is the person you recognise in it.”</blockquote></Reveal></section>
  </main></PageLayout>;
}

const initialForm = { name: '', phone: '', email: '', type: '', date: '', location: '', people: '', shootType: '', weddingDate: '', venue: '', eventType: '', functions: '', message: '', newsletter: false };
export function Book() {
  usePageTitle('Make an Enquiry', 'Start a conversation about your wedding, maternity, kids or model photography with Radiant.');
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const update = (event) => { const { name, value, type, checked } = event.target; setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value })); setErrors((current) => ({ ...current, [name]: '' })); };
  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!form.phone.trim()) next.phone = 'Please share a phone or WhatsApp number.';
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please check your email address.';
    if (!form.type) next.type = 'Please choose a session type.';
    if (!form.date) next.date = 'A preferred date helps us check our diary.';
    setErrors(next);
    if (!Object.keys(next).length) setSent(true);
  };
  return <PageLayout><main className="inner-page book-page"><section className="book-heading container-editorial"><Reveal><span className="eyebrow">Start a conversation</span><h1 className="display">Let’s make<br /><i>something real.</i></h1><p>Tell us a little about what you are planning. We will read every word and be in touch personally within a few days.</p></Reveal></section>
    <section className="booking-area container-editorial"><AnimatePresence mode="wait">{sent ? <motion.div className="success-state" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><span className="success-mark"><Check /></span><span className="eyebrow">Enquiry noted</span><h2 className="display">Thank you,<br /><i>{form.name.split(' ')[0] || 'friend'}.</i></h2><p>Your note is safely with us. This is not an automated inbox, so Rae will read it herself and be in touch soon.</p><button className="line-link" onClick={() => { setForm(initialForm); setSent(false); }}>Send another note <ArrowRight size={14} /></button></motion.div> : <motion.form className="booking-form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} noValidate>
      <div className="form-progress"><span>01</span><span>Tell us about you</span><span className="form-line" /><span>Radiant / Enquiry</span></div>
      <div className="form-grid"><label className="field field-wide"><span>Full name *</span><input name="name" value={form.name} onChange={update} placeholder="First and last name" autoComplete="name" />{errors.name && <small>{errors.name}</small>}</label><label className="field"><span>Phone / WhatsApp *</span><input name="phone" value={form.phone} onChange={update} placeholder="+91" autoComplete="tel" />{errors.phone && <small>{errors.phone}</small>}</label><label className="field"><span>Email address</span><input name="email" type="email" value={form.email} onChange={update} placeholder="you@email.com" autoComplete="email" />{errors.email && <small>{errors.email}</small>}</label><fieldset className="field field-wide service-field"><legend>Photography service *</legend><div className="service-options">{['Wedding', 'Maternity', 'Kids', 'Models'].map((type) => <label key={type} className={form.type === type ? 'service-option selected' : 'service-option'}><input type="radio" name="type" value={type} checked={form.type === type} onChange={update} /><span>{type}</span></label>)}</div>{errors.type && <small>{errors.type}</small>}</fieldset>
         <label className="field"><span>Preferred date *</span><input name="date" type="date" value={form.date} onChange={update} />{errors.date && <small>{errors.date}</small>}</label><label className="field"><span>Location</span><input name="location" value={form.location} onChange={update} placeholder="City or venue" /></label><label className="field"><span>Number of people</span><input name="people" value={form.people} onChange={update} placeholder="A rough number" /></label><label className="field"><span>Type of shoot</span><input name="shootType" value={form.shootType} onChange={update} placeholder="Portraits, ceremony, campaign..." /></label>
         <AnimatePresence>{form.type === 'Wedding' && <motion.div className="wedding-fields field-wide" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}><label className="field"><span>Wedding date</span><input name="weddingDate" type="date" value={form.weddingDate} onChange={update} /></label><label className="field"><span>Venue</span><input name="venue" value={form.venue} onChange={update} placeholder="If you know it" /></label><label className="field"><span>Event type</span><input name="eventType" value={form.eventType} onChange={update} placeholder="Ceremony, reception..." /></label><label className="field"><span>Number of functions</span><input name="functions" value={form.functions} onChange={update} placeholder="A rough number" /></label></motion.div>}</AnimatePresence>
         <label className="field field-wide"><span>Additional information</span><textarea name="message" value={form.message} onChange={update} placeholder="Tell us about your requirements, hopes, or anything we should know." rows="5" /></label>
      </div><label className="checkbox-field"><input type="checkbox" name="newsletter" checked={form.newsletter} onChange={update} /><span className="check-box">{form.newsletter && <Check size={13} />}</span><span>Keep me close to future studio news and new work.</span></label><div className="form-submit"><button type="submit" className="dark-link">Send the enquiry <ArrowUpRight size={16} /></button><p>We respect your time and your inbox.<br />Your details stay with Radiant.</p></div>
    </motion.form>}</AnimatePresence></section>
  </main></PageLayout>;
}

export function NotFound() {
  usePageTitle('Page not found', 'This page could not be found.');
  return <PageLayout><main className="not-found"><span className="eyebrow">A little lost</span><h1 className="display">This frame<br /><i>is missing.</i></h1><Link href="/" className="dark-link">Back to the beginning <ArrowUpRight size={16} /></Link></main></PageLayout>;
}
