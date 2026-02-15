import { Facebook, Instagram, Linkedin, Twitter, Send, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 pt-20 pb-12 text-slate-300">
      <div className="mx-auto w-[92%] max-w-[1600px] px-2 sm:px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 xl:gap-24">
          {/* Brand & Newsletter Section */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white">HireMyRoom</h2>
              <p className="mt-4 text-slate-400 leading-relaxed">
                Find your perfect space with ease. From cozy rooms to luxury apartments, we have it all.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-white">Subscribe to our newsletter</h3>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none backdrop-blur-sm transition-colors focus:border-indigo-500 focus:bg-white/10 focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2 text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25"
                  aria-label="Subscribe"
                >
                  <Send size={20} />
                </button>
              </form>
              <p className="text-xs text-slate-500">
                Get the latest updates and offers directly in your inbox.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-8 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="flex flex-col gap-6 text-slate-400">
              <li>
                <Link to="/" className="transition-colors hover:text-indigo-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="transition-colors hover:text-indigo-400">
                  Browse Rooms
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-indigo-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="transition-colors hover:text-indigo-400">
                  Login / Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="mb-8 text-lg font-semibold text-white">Support</h3>
            <ul className="flex flex-col gap-6 text-slate-400">
              <li>
                <a href="#" className="transition-colors hover:text-indigo-400">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-indigo-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-indigo-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-indigo-400">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-8 text-lg font-semibold text-white">Contact Us</h3>
            <ul className="flex flex-col gap-6 text-slate-400">
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 shrink-0 text-indigo-500" size={20} />
                <span className="leading-relaxed">Johar Town Phase-3, C2 Block.</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="shrink-0 text-indigo-500" size={20} />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="shrink-0 text-indigo-500" size={20} />
                <span>info@hiremyroom.com</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-10">
              <h4 className="mb-6 text-sm font-semibold text-white">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="rounded-full bg-white/5 p-3 text-slate-400 backdrop-blur-sm transition-all hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-600/25">
                  <Facebook size={20} />
                </a>
                <a href="#" className="rounded-full bg-white/5 p-3 text-slate-400 backdrop-blur-sm transition-all hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-600/25">
                  <Twitter size={20} />
                </a>
                <a href="#" className="rounded-full bg-white/5 p-3 text-slate-400 backdrop-blur-sm transition-all hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-600/25">
                  <Instagram size={20} />
                </a>
                <a href="#" className="rounded-full bg-white/5 p-3 text-slate-400 backdrop-blur-sm transition-all hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-600/25">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} HireMyRoom. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <a href="#" className="hover:text-indigo-400">Privacy</a>
            <a href="#" className="hover:text-indigo-400">Terms</a>
            <a href="#" className="hover:text-indigo-400">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
