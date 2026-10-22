import { Toaster } from "@/components/ui/sonner"

/** Mounts the toast outlet only where toasts are raised, keeping sonner off public pages. */
export default function ArticlesAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
