import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useAppSelector } from '../../hooks';


const colors = [
  '#e6194b',
  '#3cb44b',
  '#f032e6',
  '#aaffc3',
  '#f58231',
  '#42d4f4',
  '#fabebe',
  '#469990',
  '#ffe119',
  '#4363d8',
  '#ffd8b1',
  '#000075',
  '#bfef45',
  '#911eb4',
  '#fffac8',
  '#e6beff'
]

function CpuTabContent() {
  const dataToShow = useAppSelector((state) => state.dataToShow.value)

  if (!dataToShow.cpu.usage[0]) return <></>

  const amountOfCors = dataToShow.cpu.amountOfCores
  const dta = [...dataToShow.cpu.usage]
  const cors = new Array(amountOfCors).fill(null).map((_, index) => index.toString())

  return (
    <ResponsiveContainer width="99%" height={400}>
      <LineChart data={dta}>
        {cors.map((c, i) => <Line key={c} type="monotone" dataKey={c} dot={false} isAnimationActive={false}
          stroke={colors[i]} yAxisId="left" />)}
        <XAxis dataKey='none'></XAxis>
        <YAxis key={1} type="number" domain={[0, 100]} orientation='left' yAxisId="left"></YAxis>
        <YAxis key={2} type="number" domain={[0, 100]} orientation='right' yAxisId="right"></YAxis>
      </LineChart>
    </ResponsiveContainer>
  );
}

export default CpuTabContent;
