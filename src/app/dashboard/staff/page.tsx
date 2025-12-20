"use client"

import { useEffect, useState } from "react"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, MoreHorizontal } from "lucide-react"
import { fetchClient } from "@/lib/api"
import { StaffProfile } from "@/types"

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [staffList, setStaffList] = useState<StaffProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStaff() {
      try {
        const data = await fetchClient<StaffProfile[]>('/staff') // Calls backend
        setStaffList(data)
      } catch (error) {
        console.error("Failed to fetch staff", error)
      } finally {
        setLoading(false)
      }
    }
    loadStaff()
  }, [])

  // Basic client-side search filtering
  const filteredStaff = staffList.filter(staff =>
    staff.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">Loading Staff...</TableCell>
                </TableRow>
            ) : filteredStaff.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`/avatars/${staff.id}.png`} />
                      <AvatarFallback>{staff.user.full_name.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span>{staff.user.full_name}</span>
                        <span className="text-xs text-muted-foreground">{staff.user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{staff.job_title}</TableCell>
                <TableCell>
                    <Badge variant={staff.user.is_active ? 'default' : 'secondary'}>
                        {staff.user.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                </TableCell>
                <TableCell>
                    {staff.compliance_status === 'compliant' && <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50">Compliant</Badge>}
                    {staff.compliance_status === 'warning' && <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50">Expiring Soon</Badge>}
                    {staff.compliance_status === 'non_compliant' && <Badge variant="outline" className="border-red-500 text-red-700 bg-red-50">Missing Docs</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}