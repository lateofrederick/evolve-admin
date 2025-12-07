"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Phone, Mail, MapPin, Award, AlertCircle, CheckCircle } from "lucide-react"

export default function StaffDetailsPage() {
  return (
    <div className="space-y-6">
      {/* Staff Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24">
            <AvatarImage src="/avatars/sarah.png" />
            <AvatarFallback>SJ</AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Sarah Jenkins</h2>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        <Badge variant="outline">Senior Carer</Badge>
                        <span className="flex items-center gap-1 text-sm"><MapPin className="h-3 w-3" /> Derby, UK</span>
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="destructive">Log Incident</Button>
                    <Button>Edit Profile</Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="border-r px-4">
                    <div className="text-sm text-muted-foreground">Reliability Score</div>
                    <div className="text-2xl font-bold text-green-600">98%</div>
                </div>
                <div className="border-r px-4">
                    <div className="text-sm text-muted-foreground">Weekly Hours</div>
                    <div className="text-2xl font-bold">37.5</div>
                </div>
                <div className="border-r px-4">
                    <div className="text-sm text-muted-foreground">Next Shift</div>
                    <div className="text-sm font-medium">Tomorrow, 08:00</div>
                </div>
                 <div className="px-4">
                    <div className="text-sm text-muted-foreground">Driver?</div>
                    <div className="text-sm font-medium flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" /> Yes (Own Car)
                    </div>
                </div>
            </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview & Skills</TabsTrigger>
          <TabsTrigger value="schedule">Availability & Rota</TabsTrigger>
          <TabsTrigger value="compliance">Compliance (HR)</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
             <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader><CardTitle>Skills Matrix</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span>Medication Administration (Level 2)</span>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Certified</Badge>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span>Manual Handling (Hoist)</span>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Certified</Badge>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span>PEG Feeding</span>
                            <Badge variant="outline" className="text-muted-foreground">Not Trained</Badge>
                        </div>
                        <div className="flex justify-between items-center pb-2">
                            <span>Dementia Care</span>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Advanced</Badge>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                     <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-muted-foreground"/>
                            <span>+44 7700 900000</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground"/>
                            <span>sarah.jenkins@example.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <AlertCircle className="h-4 w-4 text-orange-500"/>
                            <span>Emergency Contact: Husband (Dave) - 07700...</span>
                        </div>
                     </CardContent>
                </Card>
             </div>
        </TabsContent>

        <TabsContent value="compliance">
            <Card>
                <CardHeader>
                    <CardTitle>Mandatory Training & Documents</CardTitle>
                    <CardDescription>Alerts will trigger 30 days before expiry.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Reusing the Table component approach here loosely for brevity */}
                    <div className="space-y-4">
                        {[
                            { name: "DBS Check (Enhanced)", status: "Valid", expiry: "12/2025", color: "text-green-600" },
                            { name: "Right to Work (UK Passport)", status: "Valid", expiry: "N/A", color: "text-green-600" },
                            { name: "Safeguarding Adults", status: "Expiring Soon", expiry: "Next Month", color: "text-orange-600" },
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center justify-between border p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Award className="h-5 w-5 text-slate-500" />
                                    <div>
                                        <p className="font-medium">{doc.name}</p>
                                        <p className="text-xs text-muted-foreground">Expires: {doc.expiry}</p>
                                    </div>
                                </div>
                                <span className={`font-bold text-sm ${doc.color}`}>{doc.status}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}