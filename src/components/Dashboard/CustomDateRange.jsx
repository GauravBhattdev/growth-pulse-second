import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

function CustomDateRange({ onClose, onApply }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 20);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
  };

  const handleQuickSelect = (type) => {
    const today = new Date();
    let start = new Date(today);
    let end = new Date(today);

    if (type === 'today') {
      start = new Date(today);
      end = new Date(today);
    }
    if (type === 'yesterday') {
      start.setDate(today.getDate() - 1);
      end = new Date(start);
    }
    if (type === 'last7') {
      start.setDate(today.getDate() - 6);
      end = new Date(today);
    }
    if (type === 'last30') {
      start.setDate(today.getDate() - 29);
      end = new Date(today);
    }
    if (type === 'thisMonth') {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date(today);
    }
    if (type === 'lastMonth') {
      start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      end = new Date(today.getFullYear(), today.getMonth(), 0);
    }
    if (type === 'thisQuarter') {
      const quarterStart = Math.floor(today.getMonth() / 3) * 3;
      start = new Date(today.getFullYear(), quarterStart, 1);
      end = new Date(today);
    }
    if (type === 'lastQuarter') {
      const currentQuarter = Math.floor(today.getMonth() / 3);
      let year = today.getFullYear();
      let month = (currentQuarter - 1) * 3;
      if (month < 0) {
        month = 9;
        year--;
      }
      start = new Date(year, month, 1);
      end = new Date(year, month + 3, 0);
    }

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
  };

  const handleApply = () => {
    if (!startDate || !endDate) {
      alert('Please select start date and end date.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert('Start date cannot be after end date.');
      return;
    }
    if (onApply) onApply(startDate, endDate);
  };

  return (
    <div className="pointer-events-auto fixed inset-0 z-[9999] overflow-hidden bg-black/50">
      <div
        className={`bg-theme-surface border-theme-border-light text-theme-text absolute top-3 right-3 max-h-[calc(100vh-24px)] w-[520px] max-w-[calc(100%-24px)] transform overflow-y-auto border p-5 shadow-2xl transition-all duration-300 ease-out ${
          isClosing
            ? 'translate-y-full opacity-0'
            : isVisible
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0'
        } `}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-theme-text text-xl font-semibold">
              Custom Date Range
            </h2>
            <p className="text-theme-text-secondary mt-1 text-xs">
              Select a date range or choose a quick option.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="text-theme-text-secondary hover:text-theme-text cursor-pointer p-1 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className="text-theme-text-secondary mb-1.5 block text-xs">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-theme-surface-secondary border-theme-border-light text-theme-text focus:border-primary h-10 w-full rounded-md border px-3 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-theme-text-secondary mb-1.5 block text-xs">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-theme-surface-secondary border-theme-border-light text-theme-text focus:border-primary h-10 w-full rounded-md border px-3 text-sm outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-theme-text mb-2 text-sm font-medium">
            Quick Select
          </h3>
          <div className="grid grid-cols-4 gap-2">
            <QuickBtn onClick={() => handleQuickSelect('today')}>
              Today
            </QuickBtn>
            <QuickBtn onClick={() => handleQuickSelect('yesterday')}>
              Yesterday
            </QuickBtn>
            <QuickBtn onClick={() => handleQuickSelect('last7')}>
              Last 7 Days
            </QuickBtn>
            <QuickBtn onClick={() => handleQuickSelect('last30')}>
              Last 30 Days
            </QuickBtn>
            <QuickBtn onClick={() => handleQuickSelect('thisMonth')}>
              This Month
            </QuickBtn>
            <QuickBtn onClick={() => handleQuickSelect('lastMonth')}>
              Last Month
            </QuickBtn>
            <QuickBtn onClick={() => handleQuickSelect('thisQuarter')}>
              This Quarter
            </QuickBtn>
            <QuickBtn onClick={() => handleQuickSelect('lastQuarter')}>
              Last Quarter
            </QuickBtn>
          </div>
        </div>

        <div className="border-theme-border-light flex justify-end gap-2 border-t pt-3">
          <button
            type="button"
            onClick={handleReset}
            className="border-theme-border-light text-theme-text-secondary hover:bg-theme-surface-secondary h-9 cursor-pointer rounded-md border px-4 text-xs transition"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="border-theme-border-light text-theme-text-secondary hover:bg-theme-surface-secondary h-9 cursor-pointer rounded-md border px-4 text-xs transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="bg-primary hover:bg-primary-hover h-9 cursor-pointer rounded-md px-5 text-xs font-medium text-white transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickBtn({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-theme-surface-secondary border-theme-border-light text-theme-text hover:bg-theme-surface h-9 cursor-pointer rounded-md border text-xs transition"
    >
      {children}
    </button>
  );
}

export default CustomDateRange;
