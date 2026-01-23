const baseClasses =
  'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const variants = {
  primary:
    'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-indigo-600',
  ghost:
    'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 focus-visible:outline-indigo-600',
  subtle:
    'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus-visible:outline-indigo-600',
};

function Button({ children, variant = 'primary', fullWidth = false, className = '', ...props }) {
  const composed = `${baseClasses} ${variants[variant] || variants.primary} ${
    fullWidth ? 'w-full' : ''
  } ${className}`.trim();

  return (
    <button className={composed} {...props}>
      {children}
    </button>
  );
}

export default Button;
