import React from 'react'

const Footer = () => {
  return (
     <footer id="contact" className="border-t border-slate-200 bg-white">
        <div className="container-page py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo.jfif"
                  alt="Igala Wikimedia Community logo"
                  className="h-10 w-auto rounded-lg object-contain ring-2 ring-slate-100"
                />
                <span className="text-base font-extrabold tracking-tight text-slate-900">
                  Igala Wikimedia
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-600 mb-4">
                A community dedicated to preserving and sharing Igala culture, language, and
                knowledge through Wikimedia projects.
              </p>
              <div className="flex gap-3">
                {[
                  { href: 'https://meta.wikimedia.org', label: 'Wikimedia Meta', icon: 'W' },
                  { href: 'https://twitter.com', label: 'Twitter', icon: 'T' },
                  { href: 'https://facebook.com', label: 'Facebook', icon: 'F' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                    aria-label={social.label}
                  >
                    <span className="text-xs font-semibold">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Community Links */}
            <div>
              <h3 className="text-sm font-extrabold tracking-tight text-slate-900 mb-4">Community</h3>
              <ul className="space-y-3">
                {['About Us', 'Our Projects', 'Contribute', 'Events', 'Members'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(' ', '-')}`}
                      className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wikimedia Projects */}
            <div>
              <h3 className="text-sm font-extrabold tracking-tight text-slate-900 mb-4">Wikimedia Projects</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Igala Wikipedia', href: 'https://ig.wikipedia.org' },
                  { name: 'Wikimedia Commons', href: 'https://commons.wikimedia.org' },
                  { name: 'Wikidata', href: 'https://wikidata.org' },
                  { name: 'Wiktionary', href: 'https://wiktionary.org' },
                  { name: 'Wikisource', href: 'https://wikisource.org' },
                ].map((project) => (
                  <li key={project.name}>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                    >
                      {project.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-extrabold tracking-tight text-slate-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Documentation', href: '#docs' },
                  { name: 'Guidelines', href: '#guidelines' },
                  { name: 'Contact Us', href: '#contact' },
                  { name: 'Privacy Policy', href: '#privacy' },
                  { name: 'Terms of Use', href: 'https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use' },
                ].map((resource) => (
                  <li key={resource.name}>
                    <a
                      href={resource.href}
                      target={resource.href.startsWith('http') ? '_blank' : undefined}
                      rel={resource.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-slate-200 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="text-xs text-slate-500">
                <p className="mt-1">
                  © {new Date().getFullYear()} Igala Wikimedia Community. Powered by{' '}
                  <a
                    href="https://wikimedia.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-slate-700 hover:text-slate-900"
                  >
                    Wikimedia Foundation
                  </a>
                  .
                </p>
              </div>
              <div className="text-xs text-slate-500">
                <a
                  href="https://meta.wikimedia.org/wiki/Wikimedia_User_Groups"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-700 hover:text-slate-900"
                >
                  Recognized User Group
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer