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
import { Calendar, Newspaper, Phone, Car, Bus } from 'lucide-react'

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
      confirmButtonColor: "#427cf8",
      cancelButtonColor: "#94a3b8",
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        router.push('/login')
      }
    })
  }

  return (
    <div className="flex h-screen bg-[#F5F7FB]">
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col bg-white shadow-lg w-[260px] transition-transform duration-300 ease-in-out transform",
          isCollapsed ? "translate-x-[-100%]" : "translate-x-0"
        )}
      >
        <div className="flex items-center gap-3 mt-6 px-6">
          <Link className="flex items-center gap-3" href="/">
            <Image src="/images/lion.svg" alt="Logo" width={40} height={40} className="rounded-xl" />
            <div className="flex flex-col items-start">
              <span className={cn(
                "text-xl font-semibold text-[#1a1a1a] transition-all duration-300 flex items-center gap-2",
                isCollapsed ? "opacity-0 transform translate-x-[-100%] delay-200" : "opacity-100 w-auto translate-x-0"
              )}>
                CityLion
              </span>
              <span className="text-xs text-[#64748b]">
                by <span className="text-[#427cf8]">AlashDevs</span>
              </span>
            </div>
          </Link>
        </div>

        <ScrollArea className="flex-1 mt-6">
          <div className="space-y-1 px-3">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start h-10 hover:bg-[#427cf8]/10 hover:text-[#427cf8]">
                <Home className="h-4 w-4 flex-shrink-0" />
                <span className="ml-3 text-sm font-medium">Главная</span>
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="ghost" className="w-full justify-start h-10 hover:bg-[#427cf8]/10 hover:text-[#427cf8]">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="ml-3 text-sm font-medium">События</span>
              </Button>
            </Link>
            <Link href="/news">
              <Button variant="ghost" className="w-full justify-start h-10 hover:bg-[#427cf8]/10 hover:text-[#427cf8]">
                <Newspaper className="h-4 w-4 flex-shrink-0" />
                <span className="ml-3 text-sm font-medium">Новости</span>
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="ghost" className="w-full justify-start h-10 hover:bg-[#427cf8]/10 hover:text-[#427cf8]">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="ml-3 text-sm font-medium">Сервисы</span>
              </Button>
            </Link>
            <Link href="/parking">
              <Button variant="ghost" className="w-full justify-start h-10 hover:bg-[#427cf8]/10 hover:text-[#427cf8]">
                <Car className="h-4 w-4 flex-shrink-0" />
                <span className="ml-3 text-sm font-medium">Парковки</span>
              </Button>
            </Link>
            <Link href="/transport">
              <Button variant="ghost" className="w-full justify-start h-10 hover:bg-[#427cf8]/10 hover:text-[#427cf8]">
                <Bus className="h-4 w-4 flex-shrink-0" />
                <span className="ml-3 text-sm font-medium">Общественный транспорт</span>
              </Button>
            </Link>
          </div>
        </ScrollArea>

        <div className="p-3 mt-auto">
          <Button 
            variant="ghost" 
            className="w-full justify-start h-10 hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span className="ml-3 text-sm font-medium">Выйти</span>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        isCollapsed ? "ml-0" : "ml-[260px]"
      )}>
        <header className="h-16 bg-white shadow-sm flex items-center px-6">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
          <h1 className="text-lg font-medium ml-4 text-[#1a1a1a]">CityLion Dashboard</h1>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
