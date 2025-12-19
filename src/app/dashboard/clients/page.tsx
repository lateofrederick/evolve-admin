"use client"

import { useEffect, useState } from "react"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, MapPin } from "lucide-react"
import { fetchClient } from "@/lib/api"
import { Client } from "@/types"
import { useRouter } from "next/navigation"

export default function ClientsPage() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // New Client Form State
  const [newClient, setNewClient] = useState({
    first_name: "", last_name: "", address_line_1: "", post_code: ""
  })

  async function loadClients() {
    try {
      const data = await fetchClient<Client[]>('/clients')
      setClients(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadClients() }, [])

  async function handleCreateClient() {
    try {
      await fetchClient('/clients', {
        method: 'POST',
        body: JSON.stringify(newClient)
      })
      setIsDialogOpen(false)
      loadClients() // Refresh list
      setNewClient({ first_name: "", last_name: "", address_line_1: "", post_code: "" })
    } catch (error) {
      alert("Failed to create client")
    }
  }

  const filteredClients = clients.filter(c =>
    c.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
          <p className="text-muted-foreground">Manage service users and care plans.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input value={newClient.first_name} onChange={e => setNewClient({...newClient, first_name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input value={newClient.last_name} onChange={e => setNewClient({...newClient, last_name: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address Line 1</Label>
                <Input value={newClient.address_line_1} onChange={e => setNewClient({...newClient, address_line_1: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Post Code</Label>
                <Input value={newClient.post_code} onChange={e => setNewClient({...newClient, post_code: e.target.value})} />
              </div>
              <Button onClick={handleCreateClient}>Create Record</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
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
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Alerts</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : filteredClients.map((client) => (
              <TableRow
                key={client.id}
                className="cursor-pointer hover:bg-slate-50"
                onClick={() => router.push(`/dashboard/clients/${client.id}`)}
              >
                <TableCell className="font-medium">
                    {client.first_name} {client.last_name}
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="h-3 w-3" /> {client.address_line_1}, {client.post_code}
                    </div>
                </TableCell>
                <TableCell>
                    {client.critical_alerts?.length > 0 ? (
                        <Badge variant="destructive">{client.critical_alerts.length} Alerts</Badge>
                    ) : (
                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Safe</Badge>
                    )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">View Profile</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}