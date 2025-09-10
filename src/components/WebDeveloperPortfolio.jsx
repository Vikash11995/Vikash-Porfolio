// Web Developer Portfolio (React, JavaScript version without GSAP)
// Filename: WebDeveloperPortfolio.jsx
// Setup instructions:
// 1) Ensure Tailwind CSS is configured in your React project.
// 2) Import and render this component in App.jsx.

import React from "react";

const projects = [
  {
    id: 1,
    title: "Sundown Studio",
    description: "A front-End website with the animation of GSAP",
    tech: ["HTMl", "CSS", "Javascript", "GSAP", "locomotive.js"],
    url: "https://vikash11995.github.io/Sundown-FrontEnd/",
  },
  {
    id: 2,
    title: "E‑commerce Landing",
    description:
      "Marketing landing with animations, micro-interactions and A/B tests.",
    tech: ["Bootstrap", "Tailwind"],
    url: "https://www.pexels.com/photo/a-person-climbing-in-high-snowcapped-mountains-19783226/",
  },
  {
    id: 3,
    title: "Portfolio CMS",
    description: "A headless CMS-powered portfolio with markdown support.",
    tech: ["React", "Tailwind", "Javascript"],
    url: "index.html",
  },
];

export default function WebDeveloperPortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-slate-100 antialiased overflow-y-auto no-scrollbar">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-xl font-semibold">Vikash Yadav</div>
        {/* Hamburger menu state */}
        <MobileNav />
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 ">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">
          <div>
            <p className="text-emerald-300 font-medium mb-2">
              Hi, I build delightful web experiences
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              I'm a Frontend Web Developer focused on performance & motion
            </h1>
            <p className="mt-6 text-slate-300">
              I design and build responsive, accessible web apps using modern
              tools. I love adding polish through animations and
              micro-interactions.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="#projects"
                className="inline-block bg-emerald-400 text-slate-900 px-5 py-2 rounded-md font-semibold shadow-lg"
              >
                See projects
              </a>
              <a
                href="#contact"
                className="inline-block border border-slate-500 px-5 py-2 rounded-md"
              >
                Contact
              </a>
            </div>

            <div className="mt-8">
              <h4 className="text-sm text-slate-400 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {["React", "HTML", "CSS", "Tailwind", "JavaScript"].map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-1 bg-white/5 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -bottom-8 w-40 h-40  bg-emerald-500/10 blur-3xl " />
            <img src="./src/images/ai-generated-8718795.svg" alt="" className="w-[62vw]" />
          </div>
        </section>

        <section id="projects" className="mt-20">
          <h2 className="text-2xl font-bold mb-6">Selected projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <article
                key={p.id}
                className="bg-white/5 p-5 rounded-xl backdrop-blur-sm border border-white/5"
              >
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-slate-300 mt-2">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 bg-white/6 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <a
                    href={p.url}
                    className="inline-block text-sm border-b-slate-300 hover:border-b-1 pb-0.5"
                  >
                    View project
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about mt-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold">About me</h2>
            <p className="mt-4 text-slate-300">
              I care about performance, accessibility and delivering delightful
              user experiences.
            </p>
            <ul className="mt-4 list-disc ml-5 text-slate-300">
              <li>Frontend architecture & component-driven design</li>
              <li>Animating interfaces for better UX</li>
              <li>Optimizing bundle size and Lighthouse metrics</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm text-slate-400">Contact</h4>
            <div id="contact" className="mt-3">
              <p className="text-slate-300">
                Email:{" "}
                <a
                  className="underline"
                  href="mailto:vikashyadav11995@gmail.com"
                >
                  vikashyadav11995@gmail.com
                </a>
              </p>
              <p className="text-slate-300 mt-2">Location: India</p>
              <div className="mt-4">
                <a
                  href="https://drive.google.com/file/d/1mBD6h0wDodc1_UMcV6juP_0-hNtXDtQ8/view?usp=drive_link"
                  className="inline-block px-4 py-2 border rounded hover:bg-emerald-500"
                >
                  Download resume
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-20 py-12 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Vikash Yadav — Built with React &
          Tailwind
        </footer>
      </main>
    </div>
  );
}

// Hamburger Navbar Component (moved out of JSX return)
function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="space-x-6 text-sm opacity-90 hidden md:flex">
        <a className="hover:underline cursor-pointer">Home</a>
        <a className="hover:underline cursor-pointer">Work</a>
        <a className="hover:underline cursor-pointer">About</a>
        <a className="hover:underline cursor-pointer">Contact</a>
      </nav>
      {/* Mobile Hamburger */}
      <div className="md:hidden relative">
        <button
          className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
          aria-label="Open navigation menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`block h-0.5 w-6 bg-slate-100 transition-all duration-300 ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-slate-100 my-1 transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-slate-100 transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
        {/* Mobile Nav Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-slate-800 rounded shadow-lg py-2 z-50 flex flex-col">
            <a
              className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Home
            </a>
            <a
              className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Work
            </a>
            <a
              className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              About
            </a>
            <a
              className="px-4 py-2 hover:bg-slate-700 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </>
  );
}
