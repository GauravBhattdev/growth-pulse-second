import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import CustomDateRange from './CustomDateRange';

const chartData = {
  D1: [
    { day: '00', revenue: 20 },
    { day: '04', revenue: 35 },
    { day: '08', revenue: 45 },
    { day: '12', revenue: 60 },
    { day: '16', revenue: 75 },
    { day: '20', revenue: 65 },
    { day: '24', revenue: 80 },
  ],
  D7: [
    { day: 'Mon', revenue: 20 },
    { day: 'Tue', revenue: 40 },
    { day: 'Wed', revenue: 60 },
    { day: 'Thu', revenue: 70 },
    { day: 'Fri', revenue: 100 },
    { day: 'Sat', revenue: 60 },
    { day: 'Sun', revenue: 60 },
  ],
  D30: [
    { day: '1', revenue: 25 },
    { day: '5', revenue: 40 },
    { day: '10', revenue: 55 },
    { day: '15', revenue: 45 },
    { day: '20', revenue: 75 },
    { day: '25', revenue: 65 },
    { day: '30', revenue: 90 },
  ],
};

function RevenueChart() {
  const [selectedRange, setSelectedRange] = useState('D7');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customDates, setCustomDates] = useState({
    startDate: '',
    endDate: '',
  });

  const data =
    selectedRange === 'CUSTOM' ? chartData.D7 : chartData[selectedRange];

  const handleCustomApply = (startDate, endDate) => {
    setCustomDates({ startDate, endDate });
    setSelectedRange('CUSTOM');
    setShowCustomModal(false);
  };

  return (
    <>
      <div className="w-full min-w-0">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-theme-text-secondary text-[11px] whitespace-nowrap">
            Data Range
          </span>

          <div className="flex items-center gap-1">
            <RangeBtn
              label="D1"
              active={selectedRange === 'D1'}
              onClick={() => {
                setSelectedRange('D1');
                setShowCustomModal(false);
              }}
            />
            <RangeBtn
              label="D7"
              active={selectedRange === 'D7'}
              onClick={() => {
                setSelectedRange('D7');
                setShowCustomModal(false);
              }}
            />
            <RangeBtn
              label="D30"
              active={selectedRange === 'D30'}
              onClick={() => {
                setSelectedRange('D30');
                setShowCustomModal(false);
              }}
            />
            <RangeBtn
              label="Custom"
              active={selectedRange === 'CUSTOM'}
              onClick={() => setShowCustomModal(true)}
            />
          </div>
        </div>

        {selectedRange === 'CUSTOM' &&
          customDates.startDate &&
          customDates.endDate && (
            <p className="text-theme-text-secondary mb-2 text-[9px]">
              {customDates.startDate} to {customDates.endDate}
            </p>
          )}

        <div className="h-[170px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 8, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                stroke="currentColor"
                className="text-theme-border-light"
                strokeDasharray="3 3"
                vertical={true}
                horizontal={true}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', fontSize: 8 }}
                className="text-theme-text-secondary"
              />

              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', fontSize: 8 }}
                className="text-theme-text-secondary"
              />

              <Tooltip
                formatter={(value) => [value, 'Revenue']}
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border-light)',
                  borderRadius: '6px',
                  color: 'var(--color-text)',
                  fontSize: '10px',
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8B3DF5"
                strokeWidth={2}
                fill="#8B3DF5"
                fillOpacity={0.25}
                dot={{ r: 3, fill: '#8B3DF5', stroke: '#8B3DF5' }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {showCustomModal &&
        createPortal(
          <CustomDateRange
            onClose={() => setShowCustomModal(false)}
            onApply={handleCustomApply}
          />,
          document.body
        )}
    </>
  );
}

function RangeBtn({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[17px] min-w-[35px] cursor-pointer rounded-[2px] px-2 text-[8px] font-medium transition ${
        active
          ? 'bg-primary text-white'
          : 'bg-theme-surface-secondary text-theme-text-secondary hover:text-theme-text'
      } `}
    >
      {label}
    </button>
  );
}

export default RevenueChart;
