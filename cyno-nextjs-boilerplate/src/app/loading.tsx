import React from "react"

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="size-32 animate-spin rounded-full border-y-2 border-gray-900" />
    </div>
  )
}