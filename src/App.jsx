import { useEffect, useState } from 'react'
import './App.css'

const NAV_ITEMS = [
  { id: 'hero', label: 'Start' },
  { id: 'ueber-mich', label: 'Über mich' },
  { id: 'faehigkeiten', label: 'Fähigkeiten' },
  { id: 'projekte', label: 'Projekte' },
  { id: 'erfahrung', label: 'Erfahrung' },
  { id: 'kontakt', label: 'Kontakt' },
]

const SKILLS = [
  { name: 'HTML', group: 'Frontend', abbr: 'HT' },
  { name: 'CSS', group: 'Frontend', abbr: 'CS' },
  { name: 'JavaScript', group: 'Frontend', abbr: 'JS' },
  { name: 'React', group: 'Frontend', abbr: 'Re' },
  { name: 'Responsive Design', group: 'UI/UX', abbr: 'RD' },
  { name: 'Technische Analyse', group: 'Soft Skills', abbr: 'TA' },
  { name: 'Kommunikation', group: 'Soft Skills', abbr: 'KO' },
]

const PROJECTS = [
  {
    title: 'Portfolio-Webseite',
    description:
      'Moderne persönliche Portfolio-Website mit responsivem Design, dunklem Stil und klarer Benutzerführung.',
    tags: ['HTML', 'CSS', 'React'],
  },
  {
    title: 'Modernes Landingpage-Projekt',
    description:
      'Moderne Landingpage mit attraktivem Design, klarer Struktur und Kontaktbereich für Unternehmen.',
    tags: ['Responsive Design', 'CSS', 'JavaScript'],
  },
  {
    title: 'Interaktive React-Komponenten',
    description:
      'Interaktive UI-Komponenten mit React, modernen Effekten und wiederverwendbarer Struktur.',
    tags: ['React', 'JavaScript', 'Komponenten'],
  }
]

const EXPERIENCE = [
  {
    role: 'Lehrer / Dozent für Fahrzeugtechnik und Verkehrssicherheit',
    period: '2011–2022',
    description:
      'Unterricht in Fahrzeugtechnik, Traktoren und Landmaschinen, Aufbau von Pkw und Nutzfahrzeugen, Grundlagen des sicheren Fahrens, Verkehrssicherheit, Fahrkultur sowie Leitung einer methodischen Kommission.',
  },
  {
    role: 'Mechatroniker / Technischer Spezialist',
    period: '2006–2009',
    description:
      'Diagnose, Wartung und Reparatur technischer Anlagen, präzise Fehleranalyse und verantwortungsvoller Umgang mit komplexen technischen Systemen.',
  },
  {
    role: 'Konstruktionsingenieur – Instrumentenbau',
    period: '2001–2006',
    description:
      'Konstruktion technischer Systeme, technische Zeichnungen, Analyse von Baugruppen und Mitarbeit in der Hauptsystem-Abteilung eines Instrumentenbauwerks.',
  },
]

const EMAIL = 'yuriijarovoi@gmail.com'

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = document.querySelectorAll('.reveal')

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add('reveal--visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function App() {
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useScrollReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = (id) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <div className="portfolio">
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <a
          href="#hero"
          className="header__logo"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('hero')
          }}
        >
          <span className="header__logo-mark">YY</span>
          <span className="header__logo-text">Yurii Yarovyi</span>
        </a>

        <button
          type="button"
          className={`header__toggle ${menuOpen ? 'header__toggle--open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-nav" className={`nav ${menuOpen ? 'nav--open' : ''}`}>
          <ul className="nav__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.id)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section id="hero" className="hero section">
          <div className="hero__glow" aria-hidden="true" />
          <div className="container hero__inner">
            <p className="hero__eyebrow animate-in">Frontend-Entwickler · Quereinsteiger mit technischem Hintergrund</p>
            <h1 className="hero__title animate-in animate-in--delay-1">
              Yurii <span className="hero__accent">Yarovyi</span>
            </h1>
            <p className="hero__subtitle animate-in animate-in--delay-2">
            Ich verbinde langjährige technische Erfahrung aus Engineering, Fahrzeugtechnik und Unterricht mit moderner Webentwicklung – strukturiert, lösungsorientiert und benutzerfreundlich.
            </p>
            <div className="hero__actions animate-in animate-in--delay-3">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => handleNavClick('projekte')}
              >
                Projekte ansehen
              </button>
              <a
                href="/yurii-portfolio/lebenslauf.pdf"
                className="btn btn--outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lebenslauf herunterladen
              </a>
            </div>
          </div>
        </section>

        <section id="ueber-mich" className="section">
          <div className="container">
            <h2 className="section__title reveal">Über mich</h2>
            <div className="card about-card reveal reveal--delay-1">
              <p>
                Mein beruflicher Weg führte mich durch anspruchsvolle technische Felder: als
                Mechaniker und technischer Spezialist habe ich Systeme analysiert, Fehler
                gefunden und Lösungen umgesetzt. Als Fahrlehrer und in der technischen Betreuung
                habe ich gelernt, komplexe Inhalte verständlich zu erklären und mit Menschen
                strukturiert zusammenzuarbeiten.
              </p>
              <p>
                Diese Erfahrung bringe ich in die Frontend-Entwicklung ein: sauberer Code,
                durchdachtes Layout und Websites, die auf allen Geräten zuverlässig funktionieren.
                Aktuell vertiefe ich HTML, CSS, JavaScript und React — mit dem Ziel,
                professionelle Weblösungen zu liefern.
              </p>
            </div>
          </div>
        </section>

        <section id="faehigkeiten" className="section section--alt">
          <div className="container">
            <h2 className="section__title reveal">Fähigkeiten</h2>
            <ul className="skills-grid">
              {SKILLS.map((skill, index) => (
                <li
                  key={skill.name}
                  className={`skill-card reveal reveal--delay-${(index % 4) + 1}`}
                >
                  <span className="skill-card__icon" aria-hidden="true">
                    {skill.abbr}
                  </span>
                  <div className="skill-card__body">
                    <span className="skill-card__group">{skill.group}</span>
                    <span className="skill-card__name">{skill.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="projekte" className="section">
          <div className="container">
            <h2 className="section__title reveal">Projekte</h2>
            <div className="projects-grid">
              {PROJECTS.map((project, index) => (
                <article
                  key={project.title}
                  className={`card project-card reveal reveal--delay-${(index % 3) + 1}`}
                >
                  <div className="project-card__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__text">{project.description}</p>
                  <ul className="project-card__tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="erfahrung" className="section section--alt">
          <div className="container">
            <h2 className="section__title reveal">Berufserfahrung</h2>
            <div className="timeline">
              {EXPERIENCE.map((job, index) => (
                <article
                  key={job.role}
                  className={`card timeline-card reveal reveal--delay-${(index % 3) + 1}`}
                >
                  <span className="timeline-card__step" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="timeline-card__role">{job.role}</h3>
                    <p className="timeline-card__period">{job.period}</p>
                    <p className="timeline-card__text">{job.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="section">
          <div className="container">
            <h2 className="section__title reveal">Kontakt</h2>
            <div className="contact-panel reveal reveal--delay-1">
              <div className="contact-panel__glow" aria-hidden="true" />
              <div className="contact-panel__inner">
                <div className="contact-panel__intro">
                  <span className="contact-panel__badge">Offen für berufliche Möglichkeiten</span>
                  <h3 className="contact-panel__heading">Lassen Sie uns sprechen</h3>
                  <p className="contact-panel__text">
                    Sie möchten zusammenarbeiten oder haben eine Frage? Schreiben Sie mir — ich
                    melde mich zeitnah zurück.
                  </p>
                </div>
                <div className="contact-panel__actions">
                  <a href={`mailto:${EMAIL}`} className="contact-panel__mail">
                    <span className="contact-panel__mail-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path
                          d="M4 7h16v10H4V7zm0 0l8 6 8-6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="contact-panel__mail-content">
                      <span className="contact-panel__mail-label">E-Mail</span>
                      <span className="contact-panel__mail-address">{EMAIL}</span>
                    </span>
                    <span className="contact-panel__arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                  <button
                  className="btn btn--primary"
                  onClick={() => {
                   navigator.clipboard.writeText(EMAIL);
                   setCopied(true);
                   setTimeout(() => {
                     setCopied(false);
                     }, 2000);
                    }}
                   >
                      {copied ? "Kopiert!" : "E-Mail kopieren"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
        <p>© Yurii Yarovyi</p>
          <p>Frontend-Entwickler · Portfolio</p>
        </div>
      </footer>
    </div>
  )
}

export default App
