"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Shield, Plus, Lock } from "lucide-react"

const OFFICE_USERS = [
  { id: 1, name: "Admin User", email: "admin@careflow.com", role: "Super Admin", status: "Active" },
  { id: 2, name: "Jessica Coord", email: "jess@careflow.com", role: "Coordinator", status: "Active" },
  { id: 3, name: "Finance Tim", email: "tim@careflow.com", role: "Finance", status: "Active" },
]

export default function TeamSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Office Team & Permissions</h2>
          <p className="text-muted-foreground">Manage web portal access and define user roles.</p>
        </div>

        {/* Add New User Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Office User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                They will receive an email to set their password.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <Select>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">Super Admin (Full Access)</SelectItem>
                        <SelectItem value="coord">Coordinator (Scheduling & Clients)</SelectItem>
                        <SelectItem value="finance">Finance (Reports Only)</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Col: User List */}
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {OFFICE_USERS.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-xs text-muted-foreground">{user.email}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="flex w-fit items-center gap-1">
                                            <Shield className="h-3 w-3" /> {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell><Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

        {/* Right Col: Permissions Matrix Visualization */}
        <div className="md:col-span-1">
            <Card className="bg-slate-50 border-slate-200">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Lock className="h-4 w-4"/> Role Definitions
                    </CardTitle>
                    <CardDescription>What each role can do.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Coordinator</h4>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="c1" checked disabled />
                            <label htmlFor="c1" className="text-sm">Manage Clients & Staff</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="c2" checked disabled />
                            <label htmlFor="c2" className="text-sm">Edit Schedule</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="c3" disabled />
                            <label htmlFor="c3" className="text-sm text-muted-foreground line-through">Access Payroll Data</label>
                        </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-slate-200">
                        <h4 className="font-semibold text-sm">Finance</h4>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="f1" checked disabled />
                            <label htmlFor="f1" className="text-sm">View Reports</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="f2" disabled />
                            <label htmlFor="f2" className="text-sm text-muted-foreground line-through">Edit Care Plans</label>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}