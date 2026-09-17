import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

import { leads } from '../../data/leadsData';
import AllLeadsPopup from './AllLeadsPopup';
import LeadDetailsPopup from './LeadDetailsPopup';

const PREVIEW_COUNT = 5;

function RecentLeads() {
  const [showAllLeads, setShowAllLeads] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const previewLeads = leads.slice(0, PREVIEW_COUNT);

  return (
    <>
      <div className="w-full min-w-0 overflow-hidden">
        {previewLeads.map((lead) => (
          <div
            key={lead.id}
            className="mb-0.5 flex h-9.5 min-w-0 items-center transition-colors duration-300"
          >
            <div
              className={`mr-2.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${lead.avatarColor}`}
            >
              {lead.initials}
            </div>

            <button
              type="button"
              onClick={() => setSelectedLead(lead)}
              className="w-32.5 cursor-pointer truncate text-left text-[12px] font-medium text-blue-500 transition-colors hover:text-blue-600 hover:underline"
            >
              {lead.name}
            </button>

            <div className="text-theme-text w-23.75 truncate text-[12px]">
              {lead.company}
            </div>

            <div
              className={`w-15 shrink-0 rounded-[5px] px-1.5 py-0.75 text-center text-[9px] font-medium ${
                lead.status === 'Qualified'
                  ? 'bg-green-500/15 text-green-500'
                  : lead.status === 'Contacted'
                    ? 'bg-yellow-500/15 text-yellow-600'
                    : lead.status === 'New'
                      ? 'bg-blue-500/15 text-blue-500'
                      : lead.status === 'Proposal'
                        ? 'bg-orange-500/15 text-orange-500'
                        : 'bg-emerald-500/15 text-emerald-500'
              }`}
            >
              {lead.status}
            </div>

            <div className="text-theme-text-secondary ml-auto shrink-0 pl-2 text-[10px] whitespace-nowrap">
              {lead.lastActivity}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setShowAllLeads(true)}
          className="bg-primary/10 text-primary hover:bg-primary/20 mt-3 flex h-8.5 w-full cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 text-[12px] font-medium transition-colors duration-200"
        >
          More Leads
          <ArrowRight size={13} />
        </button>
      </div>

      {showAllLeads && <AllLeadsPopup onClose={() => setShowAllLeads(false)} />}

      {selectedLead && (
        <LeadDetailsPopup
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </>
  );
}

export default RecentLeads;
