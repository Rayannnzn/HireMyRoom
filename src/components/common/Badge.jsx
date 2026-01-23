const badgeStyles = {
  hot: 'bg-orange-100 text-orange-700 ring-1 ring-orange-200',
  super: 'bg-red-100 text-red-700 ring-1 ring-red-200',
  default: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
};

function Badge({ label, tone = 'default' }) {
  const style = badgeStyles[tone] || badgeStyles.default;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}

export default Badge;
