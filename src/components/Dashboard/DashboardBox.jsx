import React from 'react';
import { Link } from 'react-router-dom';

function DashboardBox({ title, children, action, actionTo }) {
  return (
    <div className="bg-theme-surface border-theme-border-light min-h-[200px] w-full min-w-0 rounded-[8px] border p-3 shadow-sm transition-all duration-300 hover:-translate-y-[3px] hover:shadow-md sm:p-4 lg:min-h-[180px]">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-theme-text m-0 truncate text-[14px] font-semibold sm:text-[15px]">
          {title}
        </h2>

        {action && actionTo && (
          <Link
            to={actionTo}
            className="text-primary shrink-0 text-[12px] font-medium whitespace-nowrap hover:underline"
          >
            {action}
          </Link>
        )}
      </div>

      <div className="mt-3 w-full min-w-0 sm:mt-4">{children}</div>
    </div>
  );
}

export default DashboardBox;
