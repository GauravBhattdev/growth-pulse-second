import React from 'react';

function StatCard({ icon, title, value, percentage }) {
  return (
    <div className="border-theme-border-light bg-theme-surface flex min-h-20 w-full min-w-0 items-center rounded-lg border px-3 py-2 shadow-sm transition-all duration-300 hover:scale-[1.02]">
      <div className="bg-primary mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-theme-text-secondary mb-px truncate text-[11px]">
          {title}
        </p>

        <h2 className="text-theme-text truncate text-[18px] font-semibold">
          {value}
        </h2>

        <p className="mt-0.5 text-[10px] whitespace-nowrap text-green-500">
          ↑ {percentage} vs last week
        </p>
      </div>
    </div>
  );
}

export default StatCard;
