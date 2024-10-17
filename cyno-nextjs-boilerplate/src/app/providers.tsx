"use client"

import React from "react"

import {
  QueryClientProvider,
} from "@tanstack/react-query"

import {
  getQueryClient,
} from "~/lib/tanstack-query/get-query-client"

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
