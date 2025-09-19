"use client"

import { useSession } from "next-auth/react"
import { signIn, signOut } from "next-auth/react"

export default function DebugPage() {
  const { data: session, status } = useSession()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Session</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Status:</h2>
          <p className="text-gray-600">{status}</p>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Session Data:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
        
        <div className="space-x-4">
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sign In with Google
          </button>
          
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
