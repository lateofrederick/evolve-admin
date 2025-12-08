import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, AlertTriangle, FileText, Pill, History, Table } from "lucide-react"
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ClientProfilePage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-600">
                ES
            </div>
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Eleanor Smith</h2>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>12 Oak Lane, Derby, DE22 1AB</span>
                    <Badge variant="outline" className="ml-2">Key Safe: 1452</Badge>
                </div>
            </div>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><History className="mr-2 h-4 w-4"/> View Audit Logs</Button>
            <Button>Edit Care Plan</Button>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      <div className="bg-red-50 border border-red-200 rounded-md p-4 flex gap-3 items-start">
        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
        <div>
            <h4 className="font-semibold text-red-900">Critical Alerts</h4>
            <p className="text-sm text-red-800">
                • DNACPR in place (Red Folder on Fridge).<br/>
                • Severe allergy to Penicillin.<br/>
                • Two-person assist required for all transfers.
            </p>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="care-plan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="care-plan">Care Plan</TabsTrigger>
          <TabsTrigger value="medication">Medication (eMAR)</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessments</TabsTrigger>
          <TabsTrigger value="history">Visit History</TabsTrigger>
        </TabsList>

        {/* Tab 1: Care Plan */}
        <TabsContent value="care-plan" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5"/> Morning Routine (08:00 - 09:00)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <p className="font-semibold">Personal Care</p>
                            <p className="text-sm text-muted-foreground">Assist with strip wash at sink. Client prefers warm water and lavender soap.</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 py-1">
                            <p className="font-semibold">Nutrition</p>
                            <p className="text-sm text-muted-foreground">Prepare porridge with honey. Ensure fluids are thickened (Level 2).</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5"/> Lunch Routine (12:30 - 13:00)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-4 py-1">
                            <p className="font-semibold">Nutrition</p>
                            <p className="text-sm text-muted-foreground">Heat up delivered meal (Wiltshire Farm Foods). Ensure client is sitting upright.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>

        {/* Tab 2: Medication */}
        <TabsContent value="medication">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Pill className="h-5 w-5"/> Active Medication
                    </CardTitle>
                    <CardDescription>Last reviewed by GP: 01/12/2025</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Medication</TableHead>
                                <TableHead>Dosage</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Instructions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Paracetamol</TableCell>
                                <TableCell>500mg (2 tablets)</TableCell>
                                <TableCell><Badge>Morning</Badge> <Badge>Evening</Badge></TableCell>
                                <TableCell>Take with food.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Amlodipine</TableCell>
                                <TableCell>5mg</TableCell>
                                <TableCell><Badge>Morning</Badge></TableCell>
                                <TableCell>Monitor BP weekly.</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}