import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, Filter, Plus, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock Data for the Timeline
const STAFF = [
  { id: 1, name: "Sarah J.", role: "Senior Carer", color: "bg-blue-100" },
  { id: 2, name: "Mike T.", role: "Carer", color: "bg-green-100" },
  { id: 3, name: "Emma W.", role: "Carer", color: "bg-purple-100" },
]

const SHIFTS = [
  { staffId: 1, client: "Mrs. Smith", start: 2, duration: 2, type: "Personal Care" }, // Start at col 2 (08:00)
  { staffId: 1, client: "Mr. Doe", start: 5, duration: 1, type: "Lunch" },
  { staffId: 2, client: "Client A", start: 2, duration: 4, type: "Respite" },
  { staffId: 3, client: "Client B", start: 6, duration: 1, type: "Meds" },
]

export default function SchedulePage() {
  return (
    <div className="flex-1 space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Rostering</h2>
          <p className="text-muted-foreground">Manage shifts and optimize routes.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Sparkles className="mr-2 h-4 w-4" /> Auto-Optimize (AI)
            </Button>
            <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Shift
            </Button>
        </div>
      </div>

      {/* The Visual Timeline (CSS Grid) */}
      <div className="border rounded-md shadow-sm overflow-hidden flex-1 bg-white">
        {/* Header Row (Hours) */}
        <div className="grid grid-cols-[150px_repeat(12,1fr)] border-b bg-slate-50">
            <div className="p-4 font-semibold text-sm border-r">Staff Member</div>
            {[8,9,10,11,12,13,14,15,16,17,18,19].map(hour => (
                <div key={hour} className="p-2 text-xs text-center border-r text-muted-foreground">
                    {hour}:00
                </div>
            ))}
        </div>

        {/* Staff Rows */}
        <div className="divide-y">
            {STAFF.map(staff => (
                <div key={staff.id} className="grid grid-cols-[150px_repeat(12,1fr)] min-h-[80px]">
                    {/* Staff Info Column */}
                    <div className="p-4 border-r flex flex-col justify-center">
                        <span className="font-medium text-sm">{staff.name}</span>
                        <span className="text-xs text-muted-foreground">{staff.role}</span>
                    </div>

                    {/* Timeline Columns (Relative Positioning for events) */}
                    <div className="col-span-12 relative bg-white">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                             {[...Array(12)].map((_, i) => (
                                <div key={i} className="border-r border-slate-100 h-full" />
                             ))}
                        </div>

                        {/* Shifts */}
                        {SHIFTS.filter(s => s.staffId === staff.id).map((shift, idx) => (
                            <div
                                key={idx}
                                className={`absolute top-2 bottom-2 rounded-md p-2 text-xs border border-l-4 shadow-sm ${staff.color} border-l-primary cursor-pointer hover:brightness-95 transition-all`}
                                style={{
                                    left: `${(shift.start - 1) * 8.33}%`, // 100% / 12 cols = 8.33%
                                    width: `${shift.duration * 8.33}%`
                                }}
                            >
                                <div className="font-bold">{shift.client}</div>
                                <div className="text-[10px] opacity-80">{shift.type}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}