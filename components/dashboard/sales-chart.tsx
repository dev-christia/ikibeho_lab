// components/dashboard/sales-chart.tsx
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: 1, sales: 200, commission: 100, pending: 50 },
  { month: 2, sales: 300, commission: 150, pending: 60 },
  { month: 3, sales: 400, commission: 200, pending: 70 },
  { month: 4, sales: 500, commission: 250, pending: 80 },
  { month: 5, sales: 600, commission: 300, pending: 90 },
  { month: 6, sales: 700, commission: 350, pending: 100 },
  { month: 7, sales: 800, commission: 400, pending: 110 },
  { month: 8, sales: 900, commission: 450, pending: 120 },
  { month: 9, sales: 1000, commission: 500, pending: 130 },
  { month: 10, sales: 1100, commission: 550, pending: 140 },
  { month: 11, sales: 1200, commission: 600, pending: 150 },
  { month: 12, sales: 1300, commission: 650, pending: 160 },
];

export function SalesChart() {
  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Life Time Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="sales"
            stackId="1"
            stroke="#3b82f6"
            fill="#bfdbfe"
          />
          <Area
            type="monotone"
            dataKey="commission"
            stackId="1"
            stroke="#10b981"
            fill="#6ee7b7"
          />
          <Area
            type="monotone"
            dataKey="pending"
            stackId="1"
            stroke="#f59e0b"
            fill="#fde68a"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
