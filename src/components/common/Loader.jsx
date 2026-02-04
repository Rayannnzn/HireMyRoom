function Loader({ size = 'md' }) {
  const sizeClasses =
    size === 'sm'
      ? 'h-4 w-4 border-2'
      : size === 'lg'
        ? 'h-10 w-10 border-4'
        : 'h-6 w-6 border-3';

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses} animate-spin rounded-full border-slate-300 border-t-indigo-500`}
        aria-label="Loading"
      />
    </div>
  );
}

export default Loader;

