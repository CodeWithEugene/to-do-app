"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, Lightbulb, Calendar, Flag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AIAssistantProps {
  onTaskCreate?: (task: { title: string; description?: string; priority?: string }) => void
}

export function AIAssistant({ onTaskCreate }: AIAssistantProps) {
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    setIsProcessing(true)
    
    // Simulate AI processing
    setTimeout(() => {
      const newSuggestions = generateSuggestions(input)
      setSuggestions(newSuggestions)
      setIsProcessing(false)
    }, 1000)
  }

  const generateSuggestions = (text: string): string[] => {
    const suggestions: string[] = []
    
    // Simple keyword-based suggestions
    if (text.toLowerCase().includes("meeting")) {
      suggestions.push("Schedule team meeting for next week")
      suggestions.push("Prepare agenda for client meeting")
    }
    
    if (text.toLowerCase().includes("deadline") || text.toLowerCase().includes("due")) {
      suggestions.push("Set reminder for project deadline")
      suggestions.push("Break down deadline into smaller tasks")
    }
    
    if (text.toLowerCase().includes("urgent") || text.toLowerCase().includes("important")) {
      suggestions.push("Mark as high priority task")
      suggestions.push("Set immediate reminder")
    }
    
    if (text.toLowerCase().includes("call") || text.toLowerCase().includes("phone")) {
      suggestions.push("Schedule phone call reminder")
      suggestions.push("Prepare call notes")
    }
    
    if (text.toLowerCase().includes("email")) {
      suggestions.push("Draft email response")
      suggestions.push("Follow up on email")
    }
    
    // Default suggestions if no keywords match
    if (suggestions.length === 0) {
      suggestions.push("Create task with due date")
      suggestions.push("Set priority level")
      suggestions.push("Add to project")
    }
    
    return suggestions.slice(0, 3) // Limit to 3 suggestions
  }

  const handleSuggestionClick = (suggestion: string) => {
    const priority = suggestion.includes("urgent") || suggestion.includes("high priority") ? "HIGH" : "MEDIUM"
    onTaskCreate?.({
      title: suggestion,
      priority,
    })
    setSuggestions([])
    setInput("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you need to do..."
            disabled={isProcessing}
          />
          <Button type="submit" disabled={isProcessing || !input.trim()}>
            {isProcessing ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>

        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lightbulb className="h-4 w-4" />
                <span>AI Suggestions:</span>
              </div>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <div className="text-sm">{suggestion}</div>
                        </div>
                        <div className="flex gap-1">
                          {suggestion.includes("urgent") && (
                            <Flag className="h-3 w-3 text-red-500" />
                          )}
                          {suggestion.includes("meeting") && (
                            <Calendar className="h-3 w-3 text-blue-500" />
                          )}
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-xs text-muted-foreground">
          <p>Try saying:</p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>"I have an important meeting tomorrow"</li>
            <li>"Need to call the client about the project"</li>
            <li>"Deadline is coming up for the report"</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
