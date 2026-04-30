export const Input = ({ label, error, className = '', wrapperClassName = '', ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 ${wrapperClassName}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 bg-white dark:bg-slate-900 border rounded-lg focus:outline-none focus:ring-2 transition-colors
          ${error 
            ? 'border-red-500 focus:ring-red-500 dark:border-red-500/50' 
            : 'border-slate-300 dark:border-slate-700 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20'
          } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
