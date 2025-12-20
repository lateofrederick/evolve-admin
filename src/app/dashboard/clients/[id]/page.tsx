"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { fetchClient } from "@/lib/api"
import { Client } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Printer, Loader2 } from "lucide-react"
import QRCode from "react-qr-code"

// Extended type for this view
interface CarePlan {
  morning_routine: string;
  lunch_routine: string;
}

export default function ClientProfilePage() {
  const { id } = useParams()
  const [client, setClient] = useState<Client | null>(null)
  const [carePlan, setCarePlan] = useState<CarePlan | null>(null)
  const [qrPayload, setQrPayload] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        // Parallel fetch
        const [clientData, planData, qrData] = await Promise.all([
          fetchClient<Client>(`/clients?id=${id}`).then(res => (Array.isArray(res) ? res.find(c => c.id === Number(id)) : res)), // Simple find as mock /clients endpoint returns all
          fetchClient<CarePlan>(`/clients/${id}/care-plan`),
          fetchClient<{qr_payload: string}>(`/clients/${id}/qr`)
        ])

        setClient(clientData as Client)
        setCarePlan(planData)
        setQrPayload(qrData.qr_payload)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  if (loading || !client) return <div className="p-8"><Loader2 className="animate-spin" /></div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-600">
                {client.first_name[0]}{client.last_name[0]}
            </div>
            <div>
                <h2 className="text-3xl font-bold tracking-tight">{client.first_name} {client.last_name}</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{client.address_line_1}, {client.post_code}</span>
                </div>
            </div>
        </div>
      </div>

      <Tabs defaultValue="care-plan">
        <TabsList>
          <TabsTrigger value="care-plan">Care Plan</TabsTrigger>
          <TabsTrigger value="access">Access & QR</TabsTrigger>
        </TabsList>

        <TabsContent value="care-plan" className="space-y-4">
            <Card>
                <CardHeader><CardTitle>Morning Routine</CardTitle></CardHeader>
                <CardContent>{carePlan?.morning_routine || "No details"}</CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Lunch Routine</CardTitle></CardHeader>
                <CardContent>{carePlan?.lunch_routine || "No details"}</CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-8">
                {/* QR Card */}
                <Card className="border-2 border-dashed">
                    <CardContent className="flex flex-col items-center pt-6 text-center">
                        <div className="bg-white p-4 rounded-lg border shadow-sm mb-4">
                            <QRCode value={qrPayload} size={150} />
                        </div>
                        <h3 className="font-bold text-lg">{client.first_name} {client.last_name}</h3>
                        <p className="text-xs text-muted-foreground mb-4">ID: {client.id} • Official Check-in Point</p>
                        <Button variant="outline" onClick={() => window.print()}>
                            <Printer className="mr-2 h-4 w-4" /> Print Card
                        </Button>
                    </CardContent>
                </Card>

                {/* Info */}
                <Card>
                    <CardHeader><CardTitle>Access Details</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-md">
                            <p className="text-sm font-medium text-slate-500">Key Safe Code</p>
                            <p className="text-2xl font-mono tracking-widest">4590</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-md">
                            <p className="text-sm font-medium text-slate-500">Location</p>
                            <p className="text-sm">
                                Lat: {Number(0).toFixed(6)} <br/>
                                Long: {Number(0).toFixed(6)}
                            </p>
                            <Badge variant="outline" className="mt-2">Geofence Active</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}