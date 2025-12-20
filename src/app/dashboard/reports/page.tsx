"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileDown, Banknote, Loader2 } from "lucide-react"
import { format, startOfMonth, endOfMonth } from "date-fns"

const BASE_URL = 'http://localhost:8000/api/v1';

export default function ReportsPage() {
  const [downloading, setDownloading] = useState(false)

  async function handleDownloadPayroll() {
    setDownloading(true)
    try {
      const start = format(startOfMonth(new Date()), 'yyyy-MM-dd')
      const end = format(endOfMonth(new Date()), 'yyyy-MM-dd')

      const token = localStorage.getItem('careflow_token')

      const response = await fetch(`${BASE_URL}/reports/payroll?start_date=${start}&end_date=${end}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!response.ok) throw new Error("Download failed")

      // Handle Blob for file download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `payroll_${start}_${end}.csv`
      document.body.appendChild(a)
      a.click()
      a.remove()
    } catch (e) {
      alert("Error downloading report")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Reports</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:bg-slate-50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Payroll Export</CardTitle>
              <Banknote className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mt-2 mb-4 h-10">
                Current Month: {format(new Date(), 'MMMM yyyy')}
              </p>
              <Button
                className="w-full"
                variant="outline"
                onClick={handleDownloadPayroll}
                disabled={downloading}
              >
                {downloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <FileDown className="mr-2 h-4 w-4" />}
                Download CSV
              </Button>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}