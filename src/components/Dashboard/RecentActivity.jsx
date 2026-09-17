import React from 'react';

const activities = [
  {
    id: 1,
    text: 'Rohit Mehta called Rahul Sharma',
    time: '2m ago',
    avatar: 'RM',
    color: '#42b883',
  },
  {
    id: 2,
    text: 'Priya Sharma emailed Ankit Verma',
    time: '10m ago',
    avatar: 'PS',
    color: '#8b5cf6',
  },
  {
    id: 3,
    text: 'Ankit Verma updated a lead',
    time: '20m ago',
    avatar: 'AV',
    color: '#ef6545',
  },
  {
    id: 4,
    text: 'New Lead Priya Singh added',
    time: '30m ago',
    avatar: 'PS',
    color: '#2196f3',
  },
  {
    id: 5,
    text: 'Invoice #INV-1024 created',
    time: '1h ago',
    avatar: 'IN',
    color: '#3b9b62',
  },
];

function RecentActivity() {
  return (
    <div className="w-full min-w-0 overflow-hidden">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="border-theme-border-light flex min-w-0 items-center border-b py-3 transition-colors duration-300 last:border-b-0"
        >
          <div
            className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: activity.color }}
          >
            {activity.avatar}
          </div>

          <div className="text-theme-text min-w-0 flex-1 truncate text-sm">
            {activity.text}
          </div>

          <div className="text-theme-text-secondary ml-3 shrink-0 text-xs whitespace-nowrap">
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentActivity;
