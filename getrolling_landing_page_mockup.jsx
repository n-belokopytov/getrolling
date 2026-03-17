export default function GetRollingLandingPage() {
  const enterprisePoints = [
    "Fix delivery drag across teams and functions",
    "Introduce AI where it saves real time, not theater",
    "Stabilize platform ownership, quality, and release flow",
  ];

  const startupPoints = [
    "Set up product and engineering from zero to motion",
    "Define lean process, architecture, and hiring priorities",
    "Give founders senior technical leverage without full-time exec cost",
  ];

  const outcomes = [
    { title: "Ship faster", text: "Reduce coordination drag, broken ownership, and dead time in the delivery system." },
    { title: "Use AI pragmatically", text: "Integrate AI into engineering workflows where it creates measurable leverage." },
    { title: "Get structure early", text: "Install the first real operating model before chaos hardens into culture." },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-200 selection:text-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_22%)]" />

      <main className="relative mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-12">
        <header className="flex items-center justify-between py-4">
          <div>
            <div className="text-xl font-semibold tracking-tight">GetRolling<span className="text-zinc-400">.tech</span></div>
            <div className="text-sm text-zinc-400">Engineering systems that actually move</div>
          </div>
          <nav className="hidden gap-8 text-sm text-zinc-300 md:flex">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#tracks" className="hover:text-white">Who it’s for</a>
            <a href="#approach" className="hover:text-white">Approach</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </header>

        <section className="grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-300">
              For startups, scaleups, and larger engineering orgs under pressure
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Get the engineering machine <span className="text-zinc-400">rolling.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
              I help companies remove delivery drag, install better operating systems, and apply AI where it creates measurable leverage. For bigger teams, that means execution under complexity. For early companies, that means setting the foundation before entropy takes over.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-2xl bg-white px-6 py-3 text-sm font-medium text-zinc-950 shadow-lg shadow-white/10 transition hover:-translate-y-0.5">
                Book an intro call
              </button>
              <button className="rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800">
                See engagement options
              </button>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
              {[
                "AI in SDLC",
                "Platform cleanup",
                "Delivery redesign",
                "Fractional leadership",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-4 text-sm text-zinc-300 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end">
            <div className="w-full rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-sm text-zinc-400">Positioning</div>
                  <div className="text-xl font-semibold">Two tracks. One operator.</div>
                </div>
                <div className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">Operator-led</div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">Track 1</div>
                  <div className="mt-1 text-lg font-medium">Execution for mid-size and large companies</div>
                  <div className="mt-2 text-sm leading-6 text-zinc-300">
                    Fix delivery, ownership, platform friction, release flow, and AI adoption across teams that already exist but do not move cleanly.
                  </div>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">Track 2</div>
                  <div className="mt-1 text-lg font-medium">Setup for smaller and seed-stage companies</div>
                  <div className="mt-2 text-sm leading-6 text-zinc-300">
                    Put the first real system in place: architecture, process, hiring direction, delivery basics, and founder support.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-10 md:py-16">
          <div className="mb-8 max-w-2xl">
            <div className="text-sm font-medium text-zinc-400">What changes</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Less drag. More motion. Better systems.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {outcomes.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-zinc-800 bg-zinc-900/60 p-6">
                <div className="text-xl font-semibold">{item.title}</div>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="tracks" className="grid gap-6 py-10 md:grid-cols-2 md:py-16">
          <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/60 p-7">
            <div className="text-sm font-medium text-zinc-400">For mid-size to large companies</div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">Get shit done inside complexity</h3>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              When delivery slows down, ownership gets muddy, and every fix creates another layer of process, I come in and rework the system so teams can move again.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-200">
              {enterprisePoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-zinc-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/60 p-7">
            <div className="text-sm font-medium text-zinc-400">For smaller and seed-stage companies</div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">Set it up right before chaos scales</h3>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Early-stage teams do not need ceremony. They need a senior operator who can install enough structure, technical direction, and momentum to keep growth from turning into waste.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-200">
              {startupPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-zinc-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="approach" className="py-10 md:py-16">
          <div className="rounded-[32px] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 md:p-10">
            <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="text-sm font-medium text-zinc-400">Approach</div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Senior technical leverage without corporate theater.</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["1. Diagnose", "Map where time, trust, and ownership are being lost."],
                  ["2. Redesign", "Simplify operating model, interfaces, and decision flow."],
                  ["3. Roll out", "Introduce AI, process, and technical changes with actual adoption."],
                  ["4. Stabilize", "Hand back a system that can keep moving without babysitting."],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-zinc-800 bg-black/20 p-5">
                    <div className="text-base font-semibold">{title}</div>
                    <div className="mt-2 text-sm leading-6 text-zinc-300">{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-10 md:py-16">
          <div className="rounded-[30px] border border-zinc-800 bg-white px-8 py-10 text-zinc-950 md:px-10">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
              <div>
                <div className="text-sm font-medium text-zinc-500">Start with a concrete problem</div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">Delivery stalled? Team scaling too fast? AI rollout going nowhere?</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-700">
                  Bring me the mess. I’ll help you turn it into a working system.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <button className="rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5">
                  Book an intro call
                </button>
                <div className="text-sm text-zinc-500">Berlin-based. Works remotely across Europe.</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
