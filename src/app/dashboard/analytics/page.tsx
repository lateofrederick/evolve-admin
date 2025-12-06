"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from "recharts"

const VISIT_DATA = [
  { day: "Mon", scheduled: 45, completed: 44, missed: 1 },
  { day: "Tue", scheduled: 50, completed: 50, missed: 0 },
  { day: "Wed", scheduled: 48, completed: 47, missed: 1 },
  { day: "Thu", scheduled: 52, completed: 52, missed: 0 },
  { day: "Fri", scheduled: 55, completed: 54, missed: 1 },
  { day: "Sat", scheduled: 30, completed: 30, missed: 0 },
  { day: "Sun", scheduled: 32, completed: 32, missed: 0 },
]

const EFFICIENCY_DATA = [
    { name: "Week 1", travel: 20, care: 80 },
    { name: "Week 2", travel: 18, care: 82 },
    { name: "Week 3", travel: 15, care: 85 }, // Improved efficiency
    { name: "Week 4", travel: 14, care: 86 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics & Insights</h2>
        <Select defaultValue="7d">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last Quarter</SelectItem>
            </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

        {/* Main Chart: Visits Trend */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visit Fulfillment</CardTitle>
            <CardDescription>Scheduled vs. Completed visits over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={VISIT_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="scheduled" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="completed" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Efficiency Chart */}
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Operational Efficiency</CardTitle>
                <CardDescription>Care Contact Time vs. Travel Time (%)</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={EFFICIENCY_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" fontSize={12} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="care" stackId="a" fill="#4ade80" name="Care Time %" />
                            <Bar dataKey="travel" stackId="a" fill="#f87171" name="Travel Time %" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}