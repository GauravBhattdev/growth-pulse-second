import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Phone, Building2, User, Tag, Clock } from 'lucide-react';

function LeadDetailsPopup({ lead, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!lead) return null;

  const statusClasses =
    lead.status === 'Qualified'
      ? 'bg-green-500/15 text-green-500'
      : lead.status === 'Contacted'
        ? 'bg-yellow-500/15 text-yellow-600'
        : lead.status === 'New'
          ? 'bg-blue-500/15 text-blue-500'
          : lead.status === 'Proposal'
            ? 'bg-orange-500/15 text-orange-500'
            : 'bg-emerald-500/15 text-emerald-500';

  const popupContent = (
    <div className="pointer-events-auto fixed inset-0 z-[130] flex items-center justify-center bg-black/50 p-4">
      <div
        ref={panelRef}
        className="bg-theme-surface border-theme-border-light max-h-[90vh] w-full max-w-[460px] overflow-y-auto rounded-xl border shadow-2xl transition-colors duration-300"
      >
        <div className="border-theme-border-light flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-theme-text text-base font-semibold">
            Lead Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-theme-text-secondary hover:bg-theme-surface-secondary hover:text-theme-text flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="border-theme-border-light flex items-center gap-4 border-b px-5 py-5">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold ${lead.avatarColor} `}
          >
            {lead.initials}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-theme-text truncate text-[15px] font-semibold">
              {lead.name}
            </h3>
            <p className="text-theme-text-secondary mt-0.5 truncate text-[12px]">
              {lead.company}
            </p>

            <span
              className={`mt-2 inline-block rounded-full px-2 py-1 text-[10px] font-medium ${statusClasses} `}
            >
              {lead.status}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-5 py-4">
          <DetailRow
            icon={<Mail size={15} />}
            label="Email"
            value={lead.email}
          />
          <DetailRow
            icon={<Phone size={15} />}
            label="Phone"
            value={lead.phone}
          />
          <DetailRow
            icon={<Building2 size={15} />}
            label="Company"
            value={lead.company}
          />
          <DetailRow
            icon={<Tag size={15} />}
            label="Source"
            value={lead.source}
          />
          <DetailRow
            icon={<User size={15} />}
            label="Assigned To"
            value={lead.assignedTo}
          />
          <DetailRow
            icon={<Clock size={15} />}
            label="Last Activity"
            value={lead.lastActivity}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-theme-text-muted text-[10px] tracking-wider uppercase">
          {label}
        </p>
        <p className="text-theme-text mt-0.5 text-[12px] break-words">
          {value || '—'}
        </p>
      </div>
    </div>
  );
}

export default LeadDetailsPopup;
