import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Website', value: 35, color: '#8B3DFF' },
  { name: 'LinkedIn', value: 25, color: '#2196F3' },
  { name: 'Referral', value: 20, color: '#2DBB55' },
  { name: 'Cold Call', value: 10, color: '#FF9800' },
  { name: 'Other', value: 10, color: '#E91E63' },
];

function LeadsBySource() {
  return (
    <div className="w-full min-w-0">
      <div className="h-[180px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>

            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              fontSize="22"
              fontWeight="bold"
              className="text-theme-text"
            >
              1248
            </text>

            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              fontSize="11"
              className="text-theme-text-secondary"
            >
              Total Leads
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-[5px] flex w-full flex-col gap-[10px]">
        {data.map((item) => (
          <div
            className="flex min-w-0 items-center text-[12px]"
            key={item.name}
          >
            <span
              className="mr-[7px] h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-theme-text">{item.name}</span>
            <span className="text-theme-text ml-[5px] font-semibold">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeadsBySource;
