import { Activity, BarChart3, Bed, Dumbbell, Flame, Scale } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card } from '../components/Card';
import type { WellnessState } from '../types';
import { getLevel } from '../utils/metrics';

interface ProgressScreenProps {
  state: WellnessState;
}

function ChartShell({ title, icon: Icon, children }: { title: string; icon: typeof Scale; children: ReactNode }) {
  return (
    <Card>
      <div className="mb-3 flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-cream text-lagoon">
          <Icon size={18} />
        </div>
        <h2 className="text-lg font-black">{title}</h2>
      </div>
      <div className="h-56">{children}</div>
    </Card>
  );
}

function EmptyChart() {
  return (
    <div className="grid h-full place-items-center rounded-lg border border-dashed border-stone-300 bg-stone-50 px-4 text-center text-sm font-semibold text-stone-500">
      No logged data yet.
    </div>
  );
}

export function ProgressScreen({ state }: ProgressScreenProps) {
  const chartData = state.logs.map((log) => ({
    date: log.date.slice(5),
    weight: log.weight,
    calories: log.calories,
    protein: log.protein,
    workouts: log.workoutDurationMinutes > 0 ? 1 : 0,
    sleep: log.sleepHours,
  }));
  const level = getLevel(state.xp);
  const xpData = [{ name: `Level ${level.level}`, xp: level.progress, remaining: level.nextLevelXp - level.progress }];

  return (
    <div className="space-y-4">
      <header>
        <p className="text-sm font-bold uppercase tracking-wide text-lagoon">Progress views</p>
        <h1 className="text-3xl font-black">Charts that matter</h1>
        <p className="mt-1 text-sm text-stone-600">Trend lines over perfection. Use the shape of the week to pick the next habit.</p>
      </header>

      <ChartShell title="Weight over time" icon={Scale}>
        {chartData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7dfd2" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#257e8c" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </ChartShell>

      <ChartShell title="Calories over time" icon={BarChart3}>
        {chartData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7dfd2" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="calories" stroke="#ef6f61" fill="#ef6f61" fillOpacity={0.18} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </ChartShell>

      <ChartShell title="Protein over time" icon={Activity}>
        {chartData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7dfd2" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="protein" fill="#2bbf8a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </ChartShell>

      <ChartShell title="Workouts per week" icon={Dumbbell}>
        {chartData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7dfd2" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="workouts" fill="#f5b942" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </ChartShell>

      <ChartShell title="Sleep over time" icon={Bed}>
        {chartData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7dfd2" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sleep" stroke="#16211f" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </ChartShell>

      <ChartShell title="XP / level progress" icon={Flame}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={xpData} layout="vertical">
            <XAxis type="number" hide domain={[0, level.nextLevelXp]} />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip />
            <Bar dataKey="xp" stackId="xp" fill="#2bbf8a" radius={[6, 0, 0, 6]} />
            <Bar dataKey="remaining" stackId="xp" fill="#e7dfd2" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>
    </div>
  );
}
