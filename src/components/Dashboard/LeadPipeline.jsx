import React from 'react';

const data = [
  { stage: 'New', leads: 320, color: '#8B3DF5', width: '100%' },
  { stage: 'Contacted', leads: 280, color: '#0099FF', width: '88%' },
  { stage: 'Qualified', leads: 384, color: '#2DBB55', width: '76%' },
  { stage: 'Proposal', leads: 264, color: '#FF7043', width: '64%' },
  { stage: 'Closed', leads: 200, color: '#276B35', width: '52%' },
];

function LeadPipeline() {
  return (
    <div className="w-full min-w-0 overflow-hidden">
      <div className="flex min-h-[235px] w-full items-center justify-center px-1 sm:px-2">
        <div className="flex w-full max-w-[330px] flex-col items-center gap-[8px]">
          {data.map((item) => (
            <div
              key={item.stage}
              className="flex w-full min-w-0 items-center justify-center"
            >
              <div
                className="flex h-[34px] min-w-0 shrink items-center justify-center overflow-hidden text-[11px] font-semibold text-white sm:text-[12px]"
                style={{
                  width: item.width,
                  backgroundColor: item.color,
                  clipPath: 'polygon(0 0, 100% 0, 92% 100%, 8% 100%)',
                }}
              >
                {item.stage}
              </div>

              <span
                className="ml-2 w-[38px] shrink-0 text-[11px] font-medium sm:ml-3 sm:w-[42px] sm:text-[12px]"
                style={{ color: item.color }}
              >
                {item.leads}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeadPipeline;
