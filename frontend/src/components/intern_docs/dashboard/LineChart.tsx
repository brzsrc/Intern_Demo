import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

// 每天 4 个数据点,只在 label 非空的位置显示 X 轴文字
const data = [
    {name: '11 Jan', Earnings: 29500, Revenue: 8800},
    {name: '12 Jan', Earnings: 28000, Revenue: 7000},
    {name: '12 Jan', Earnings: 23800, Revenue: 13200},
    {name: '12 Jan', Earnings: 24800, Revenue: 12000},
    {name: '12 Jan', Earnings: 26400, Revenue: 14000},
    {name: '13 Jan', Earnings: 21000, Revenue: 17800},
    {name: '13 Jan', Earnings: 19200, Revenue: 16000},
    {name: '13 Jan', Earnings: 22400, Revenue: 14500},
    {name: '13 Jan', Earnings: 18800, Revenue: 33000},
    {name: '14 Jan', Earnings: 23200, Revenue: 30500},
    {name: '14 Jan', Earnings: 20000, Revenue: 31000},
    {name: '14 Jan', Earnings: 16500, Revenue: 27800},
    {name: '14 Jan', Earnings: 22200, Revenue: 31500},
    {name: '15 Jan', Earnings: 18500, Revenue: 26000},
    {name: '15 Jan', Earnings: 21400, Revenue: 29200},
    {name: '15 Jan', Earnings: 21000, Revenue: 15200},
    {name: '15 Jan', Earnings: 23600, Revenue: 18500},
    {name: '16 Jan', Earnings: 22400, Revenue: 14200},
    {name: '16 Jan', Earnings: 24000, Revenue: 30000},
    {name: '16 Jan', Earnings: 25600, Revenue: 32000},
    {name: '16 Jan', Earnings: 21500, Revenue: 28800},
    {name: '17 Jan', Earnings: 19200, Revenue: 36000},
    {name: '17 Jan', Earnings: 21000, Revenue: 33200},
    {name: '17 Jan', Earnings: 15500, Revenue: 38000},
];

const CustomLegend = ({payload}) => (
    <div style={{display: 'flex', gap: 32, paddingTop: 24}}>
        {payload.map((entry) => (
            <div key={entry.value} style={{display: 'flex', alignItems: 'center', gap: 10}}>
        <span
            style={{
                width: 28,
                height: 12,
                borderRadius: 999,          // 大圆角 → 胶囊
                background: entry.color,    // 自动取对应 Line 的 stroke 色
                display: 'inline-block',
            }}
        />
                <span style={{color: '#9ca3af', fontSize: 12}}>{entry.value}</span>
            </div>
        ))}
    </div>
);

const formatEuro = (v) => (v === 0 ? '0' : `€${v / 1000}K`);

export default function RevenueLineChart() {
    return (
        <LineChart
            style={{width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618}}
            responsive
            data={data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="6 6" vertical={false}/>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', style: {fontSize: 12}}}
                   dy={8}/>
            <YAxis width="auto" tickFormatter={formatEuro} ticks={[0, 10000, 20000, 30000, 40000]}
                   domain={[0, 40000]} axisLine={false} tickLine={false}
                   tick={{fill: '#9ca3af', style: {fontSize: 12}}}/>
            <Legend content={<CustomLegend/>} verticalAlign="bottom"/>
            <Line
                type="linear"
                dataKey="Earnings"
                stroke="#8b7cf6"             // purple
                dot={false}
                strokeWidth={2}
                activeDot={false}
            />
            <Line
                type="linear"
                dataKey="Revenue"
                stroke="#8fd170"             // green
                dot={false}
                strokeWidth={2}
                activeDot={false}
            />
        </LineChart>
    );
}