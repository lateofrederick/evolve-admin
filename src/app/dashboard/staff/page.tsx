"use client"

import { useState } from "react"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, MoreHorizontal, FileWarning } from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

// Mock Data with "Compliance Status" logic
const STAFF_DATA = [
  { id: 1, name: "Sarah Jenkins", role: "Senior Carer", email: "sarah.j@careflow.com", status: "Active", compliance: "Valid", lastTraining: "2023-11-15" },
  { id: 2, name: "Michael Thompson", role: "Carer", email: "m.thompson@careflow.com", status: "Active", compliance: "Expiring Soon", lastTraining: "2023-01-10" },
  { id: 3, name: "Emma Wilson", role: "Trainee", email: "emma.w@careflow.com", status: "Onboarding", compliance: "Missing Docs", lastTraining: "N/A" },
]

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
          <p className="text-muted-foreground">Manage carers, compliance, and training records.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Staff
        </Button>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search staff..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Compliance</TableHead>
              <TableHead>Last Training</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STAFF_DATA.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`/avatars/${staff.id}.png`} alt={staff.name} />
                      <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span>{staff.name}</span>
                        <span className="text-xs text-muted-foreground">{staff.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>
                    <Badge variant={staff.status === 'Active' ? 'default' : 'secondary'}>
                        {staff.status}
                    </Badge>
                </TableCell>
                <TableCell>
                    {staff.compliance === 'Valid' && <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50">Compliant</Badge>}
                    {staff.compliance === 'Expiring Soon' && <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50">DBS Expiring</Badge>}
                    {staff.compliance === 'Missing Docs' && <Badge variant="outline" className="border-red-500 text-red-700 bg-red-50">Missing Docs</Badge>}
                </TableCell>
                <TableCell>{staff.lastTraining}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}