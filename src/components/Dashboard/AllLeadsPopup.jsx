import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

import { leads } from '../../data/leadsData';
import LeadDetailsPopup from './LeadDetailsPopup';

function AllLeadsPopup({ onClose }) {
  const navigate = useNavigate();

  const leadsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);

  const totalPages = Math.ceil(leads.length / leadsPerPage);
  const startIndex = (currentPage - 1) * leadsPerPage;
  const endIndex = startIndex + leadsPerPage;
  const currentLeads = leads.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleViewAllLeads = () => {
    onClose();
    navigate('/leads');
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const popupContent = (
    <>
      <div className="pointer-events-auto fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-4">
        <div className="bg-theme-surface border-theme-border-light flex max-h-[85vh] w-full max-w-[820px] flex-col overflow-hidden rounded-xl border shadow-2xl transition-colors duration-300">
          {/* HEADER */}
          <div className="border-theme-border-light flex shrink-0 items-center justify-between gap-3 border-b px-5 py-4">
            <div>
              <h2 className="text-theme-text text-base font-semibold">
                All Leads
              </h2>
              <p className="text-theme-text-secondary mt-0.5 text-[11px]">
                {leads.length} leads total
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleViewAllLeads}
                className="bg-primary hover:bg-primary-hover hidden h-[32px] cursor-pointer items-center gap-1.5 rounded-md px-3 text-[11px] font-medium text-white transition-colors duration-200 sm:inline-flex"
              >
                View All Leads
                <ExternalLink size={12} />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="text-theme-text-secondary hover:bg-theme-surface-secondary hover:text-theme-text flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="bg-primary/10">
                  <th className="text-theme-text-secondary px-4 py-3 text-[11px] font-semibold">
                    Name
                  </th>
                  <th className="text-theme-text-secondary px-4 py-3 text-[11px] font-semibold">
                    Company
                  </th>
                  <th className="text-theme-text-secondary px-4 py-3 text-[11px] font-semibold">
                    Status
                  </th>
                  <th className="text-theme-text-secondary px-4 py-3 text-[11px] font-semibold">
                    Last Activity
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-theme-border-light hover:bg-theme-surface-secondary border-b transition-colors duration-200"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${lead.avatarColor} `}
                        >
                          {lead.initials}
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="cursor-pointer text-left text-[12px] font-medium text-blue-500 transition-colors hover:text-blue-600 hover:underline"
                        >
                          {lead.name}
                        </button>
                      </div>
                    </td>

                    <td className="text-theme-text-secondary px-4 py-3 text-[12px]">
                      {lead.company}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${
                          lead.status === 'Qualified'
                            ? 'bg-green-500/15 text-green-500'
                            : lead.status === 'Contacted'
                              ? 'bg-yellow-500/15 text-yellow-600'
                              : lead.status === 'New'
                                ? 'bg-blue-500/15 text-blue-500'
                                : lead.status === 'Proposal'
                                  ? 'bg-orange-500/15 text-orange-500'
                                  : 'bg-emerald-500/15 text-emerald-500'
                        } `}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="text-theme-text-muted px-4 py-3 text-[12px]">
                      {lead.lastActivity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="border-theme-border-light flex shrink-0 flex-col gap-3 border-t px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-theme-text-secondary text-[11px]">
              Showing {startIndex + 1} to {Math.min(endIndex, leads.length)} of{' '}
              {leads.length} leads
            </p>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition ${
                  currentPage === 1
                    ? 'text-theme-text-muted bg-theme-surface-secondary cursor-not-allowed'
                    : 'text-theme-text-secondary hover:bg-theme-surface-secondary'
                } `}
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageClick(page)}
                  className={`h-7 w-7 cursor-pointer rounded-md text-[11px] font-medium transition ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'border-theme-border-light text-theme-text-secondary hover:bg-theme-surface-secondary border'
                  } `}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition ${
                  currentPage === totalPages
                    ? 'text-theme-text-muted bg-theme-surface-secondary cursor-not-allowed'
                    : 'text-theme-text-secondary hover:bg-theme-surface-secondary'
                } `}
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* MOBILE: VIEW ALL LEADS */}
          <div className="px-5 pb-4 sm:hidden">
            <button
              type="button"
              onClick={handleViewAllLeads}
              className="bg-primary hover:bg-primary-hover inline-flex h-[36px] w-full cursor-pointer items-center justify-center gap-1.5 rounded-md text-[12px] font-medium text-white transition-colors duration-200"
            >
              View All Leads
              <ExternalLink size={13} />
            </button>
          </div>
        </div>
      </div>

      {selectedLead && (
        <LeadDetailsPopup
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </>
  );

  return createPortal(popupContent, document.body);
}

export default AllLeadsPopup;
