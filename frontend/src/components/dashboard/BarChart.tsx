import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';


const data = [
  { name: '12 Aug', clients: 220 },
  { name: '13 Aug', clients: 400 },
  { name: '14 Aug', clients: 398 },
  { name: '15 Aug', clients: 100 },
  { name: '16 Aug', clients: 100 },
  { name: '17 Aug', clients: 245 },
  { name: '18 Aug', clients: 310 },
];

const CustomTooltip = ({ active, payload }) => {
  console.log(payload);
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: '#1a1a1a',
        color: '#fff',
        borderRadius: 12,
        padding: '8px 16px',
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 700 }}>{payload[0].value}</div>
      <div style={{ fontSize: 10, opacity: 0.9 }}>New Clients</div>
    </div>
  );
};

// #endregion
export const UserBarChart = () => {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 2.6 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
      barSize={18}
    >
      <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#e5e5ef" />
      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', style: { fontSize: 12} }} dy={8}/>
      <YAxis width="auto" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', style: { fontSize: 12 }}} />
      <Tooltip content={<CustomTooltip />} cursor={false} />
      {/*<Legend />*/}
      <Bar dataKey="clients" fill="#ddd6fe" activeBar={{ fill: "#7c6ce8" }} radius={[10, 10, 0, 0]} />
      {/*<Bar dataKey="uv" fill="#82ca9d" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]} />*/}
      {/*<RechartsDevtools />*/}
    </BarChart>
  );
};

