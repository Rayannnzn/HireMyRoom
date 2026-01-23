function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900">HireMyRoom</p>
          <p className="text-sm text-slate-500">Find rooms, apartments, hostels, and offices with ease.</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <a href="#terms" className="hover:text-indigo-700">
            Terms
          </a>
          <a href="#privacy" className="hover:text-indigo-700">
            Privacy
          </a>
          <a href="#support" className="hover:text-indigo-700">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
