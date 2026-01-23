function CategoryCard({ label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
        active
          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
          : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:text-indigo-700'
      }`}
    >
      {label}
    </button>
  );
}

export default CategoryCard;
