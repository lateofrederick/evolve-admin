"use client"

import QRCode from "react-qr-code"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Printer, Download, Key } from "lucide-react"

export default function ClientAccessPage({ params }: { params: { id: string } }) {
  // In real app, this ID comes from the DB.
  // We encode a secure payload, e.g., "{"clientId": "123", "hash": "xyz"}"
  const qrPayload = JSON.stringify({
    type: "client_checkin",
    id: params.id,
    name: "Eleanor Smith"
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h3 className="text-xl font-semibold">Access & Call Monitoring</h3>
         <Button onClick={() => window.print()} variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Print Card
         </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* The Printable ID Card Area */}
        <div className="flex justify-center bg-slate-100 p-8 rounded-lg border border-dashed border-slate-300">
            <div className="bg-white border-2 border-black p-6 w-[350px] rounded-xl shadow-lg flex flex-col items-center text-center space-y-4" id="printable-card">
                {/* Header of the Card */}
                <div className="w-full border-b-2 border-black pb-2 mb-2">
                    <h2 className="text-2xl font-bold tracking-tighter uppercase">CareFlow</h2>
                    <p className="text-xs font-mono">OFFICIAL CHECK-IN POINT</p>
                </div>

                {/* The QR Code */}
                <div className="p-2 border border-slate-200 rounded">
                    <QRCode
                        value={qrPayload}
                        size={180}
                        level="H" // High error correction (good if sticker gets scratched)
                    />
                </div>

                {/* Footer of the Card */}
                <div className="space-y-1">
                    <h3 className="font-bold text-lg">Mrs. Eleanor Smith</h3>
                    <p className="text-xs text-muted-foreground">ID: #{params.id} | Loc: Kitchen</p>
                </div>

                <div className="bg-slate-100 p-2 w-full rounded text-[10px] text-slate-600">
                    <p><strong>INSTRUCTIONS FOR STAFF:</strong></p>
                    <p>Scan this code using the CareFlow App upon arrival and departure to log your visit.</p>
                </div>
            </div>
        </div>

        {/* Instructions / Meta Data */}
        <div className="space-y-6">
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <Key className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Key Safe Code</h4>
                            <p className="text-2xl font-mono tracking-widest mt-1">4590 A</p>
                            <p className="text-xs text-muted-foreground mt-1">Updated: 12 Nov 2025</p>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <h4 className="font-semibold text-sm mb-2">QR Code Status</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            This code is unique to this client's geolocation. Scanning it outside the GPS geofence (20m radius) will trigger an alert.
                        </p>
                        <Button variant="secondary" size="sm" className="w-full">
                            <Download className="mr-2 h-4 w-4" /> Download as PNG
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}