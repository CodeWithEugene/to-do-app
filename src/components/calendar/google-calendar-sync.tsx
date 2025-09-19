"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import { useSession } from "next-auth/react"

interface GoogleCalendarSyncProps {
  onSyncComplete?: () => void
}

export function GoogleCalendarSync({ onSyncComplete }: GoogleCalendarSyncProps) {
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "error">("idle")
  const { data: session } = useSession()

  const handleSync = async () => {
    if (!session?.user?.email) return

    try {
      setIsSyncing(true)
      setSyncStatus("idle")

      const response = await fetch("/api/calendar/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setSyncStatus("success")
        setLastSync(new Date())
        onSyncComplete?.()
      } else {
        setSyncStatus("error")
      }
    } catch (error) {
      console.error("Failed to sync with Google Calendar:", error)
      setSyncStatus("error")
    } finally {
      setIsSyncing(false)
    }
  }

  const getStatusIcon = () => {
    switch (syncStatus) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Calendar className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusText = () => {
    switch (syncStatus) {
      case "success":
        return "Sync completed successfully"
      case "error":
        return "Sync failed. Please try again."
      default:
        return lastSync ? `Last synced: ${lastSync.toLocaleString()}` : "Not synced yet"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Google Calendar Sync
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm text-muted-foreground">
              {getStatusText()}
            </span>
          </div>
          <Badge variant="outline">
            {session?.user?.email}
          </Badge>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Sync your tasks with Google Calendar to see them in your calendar app.
            This will create calendar events for tasks with due dates.
          </p>
        </div>

        <Button
          onClick={handleSync}
          disabled={isSyncing}
          className="w-full"
        >
          {isSyncing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <Calendar className="h-4 w-4 mr-2" />
              Sync with Google Calendar
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>• Tasks with due dates will appear as calendar events</p>
          <p>• Recurring tasks will create recurring calendar events</p>
          <p>• Changes in the app will sync to your calendar</p>
        </div>
      </CardContent>
    </Card>
  )
}
