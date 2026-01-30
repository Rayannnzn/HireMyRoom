// Color variants for category cards (bg, border, text, hover)
const colorVariants = {
  indigo:
    'border-indigo-300 bg-indigo-50 text-indigo-800 hover:bg-indigo-100 hover:border-indigo-400 data-[active=true]:bg-indigo-200 data-[active=true]:border-indigo-500 data-[active=true]:ring-2 data-[active=true]:ring-indigo-300',
  emerald:
    'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-400 data-[active=true]:bg-emerald-200 data-[active=true]:border-emerald-500 data-[active=true]:ring-2 data-[active=true]:ring-emerald-300',
  amber:
    'border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 hover:border-amber-400 data-[active=true]:bg-amber-200 data-[active=true]:border-amber-500 data-[active=true]:ring-2 data-[active=true]:ring-amber-300',
  rose:
    'border-rose-300 bg-rose-50 text-rose-800 hover:bg-rose-100 hover:border-rose-400 data-[active=true]:bg-rose-200 data-[active=true]:border-rose-500 data-[active=true]:ring-2 data-[active=true]:ring-rose-300',
  sky: 'border-sky-300 bg-sky-50 text-sky-800 hover:bg-sky-100 hover:border-sky-400 data-[active=true]:bg-sky-200 data-[active=true]:border-sky-500 data-[active=true]:ring-2 data-[active=true]:ring-sky-300',
};

function CategoryCard({ label, active = false, onClick, color = 'indigo' }) {
  const variant = colorVariants[color] || colorVariants.indigo;
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition shadow-sm ${variant}`}
    >
      {label}
    </button>
  );
}

export default CategoryCard;
