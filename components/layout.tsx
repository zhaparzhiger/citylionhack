"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Home, Plus, Upload, LogOut, Settings, PanelLeftClose, PanelLeft } from 'lucide-react'
import Swal from 'sweetalert2'
import Image from "next/image"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    Swal.fire({
      title: 'Выход',
      text: "Вы уверены, что хотите выйти?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Да, выйти',
      cancelButtonText: 'Отмена',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        router.push('/login')
      }
    })
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col bg-white border-r w-[260px] transition-transform duration-300 ease-in-out transform",
          isCollapsed ? "translate-x-[-100%]" : "translate-x-0"
        )}
      >
        <div className="flex items-center gap-3 mt-4 px-6">
          <Link className="flex items-center gap-3" href="/">
            <Image src="/images/lion.svg" alt="Logo" width={100} height={100} />
            <div className="flex flex-col items-start">
              <span className={cn(
                "text-2xl font-semibold text-black transition-all duration-300 flex items-center gap-2",
                isCollapsed ? "opacity-0 transform translate-x-[-100%] delay-200" : "opacity-100 w-auto translate-x-0"
              )}>
                CityLion
              </span>
              <span className="text-sm text-[#757575] font-medium mt-0.5">
                by <span className="text-[#427cf8]">AlashDevs</span>
              </span>
            </div>
          </Link>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-2 p-3">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start py-3 px-3 h-auto">
                <Home className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3 text-[15px]">Главная</span>
              </Button>
            </Link>
            <Link href="/all-resumes">
              <Button variant="ghost" className="w-full justify-start py-3 px-3 h-auto">
                <FileText className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3 text-[15px]">Все резюме</span>
              </Button>
            </Link>
            <Link href="/add-resume">
              <Button variant="ghost" className="w-full justify-start py-3 px-3 h-auto">
                <Plus className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3 text-[15px]">Добавить резюме</span>
              </Button>
            </Link>
            <Link href="/upload-resume">
              <Button variant="ghost" className="w-full justify-start py-3 px-3 h-auto">
                <Upload className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3 text-[15px]">Загрузить резюме</span>
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" className="w-full justify-start py-3 px-3 h-auto">
                <Settings className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3 text-[15px]">Настройки</span>
              </Button>
            </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start py-3 px-3 h-auto"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className="ml-3 text-[15px]">Выйти</span>
          </Button>
          </div>
        </ScrollArea>

     
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        isCollapsed ? "ml-0" : "ml-[260px]"
      )}>
        <header className="h-[70px] border-b bg-white flex items-center px-6">
          <h1 className="text-lg font-medium">CityLion Dashboard</h1>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>

      {/* Sidebar toggle button */}
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          variant="ghost"
          className="p-3"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <PanelLeft className="h-5 w-5 flex-shrink-0" />
          ) : (
            <PanelLeftClose className="h-5 w-5 flex-shrink-0" />
          )}
        </Button>
      </div>
    </div>
  )
}
