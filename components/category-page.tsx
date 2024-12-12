"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Search, ArrowRight, Building, Car, Bus, Calendar } from 'lucide-react'
import Link from "next/link"

interface CategoryPageProps {
  title: string
  items: Array<{
    id: string
    title: string
    description: string
    type: 'place' | 'event' | 'transport'
    date?: string
    [key: string]: any
  }>
}

export function CategoryPage({ title, items }: CategoryPageProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getIcon = (type: string) => {
    switch (type) {
      case 'place':
        return Building
      case 'event':
        return Calendar
      case 'transport':
        return Bus
      default:
        return MapPin
    }
  }

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-xl text-gray-600">Исследуйте город и найдите интересные места и события.</p>
        </div>

        <div className="mb-8">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Поиск по городу..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 bg-white border border-gray-200 rounded-full text-lg placeholder:text-gray-400"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const Icon = getIcon(item.type)
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-[#427cf8]" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 truncate">
                      {item.title}
                    </h3>
                    {item.date && (
                      <p className="text-sm text-gray-500 mt-1">
                        {item.date}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-base text-gray-600 line-clamp-2">
                  {item.description}
                </p>

                <Button
                  variant="ghost"
                  className="self-start h-12 px-6 text-[#427cf8] hover:text-[#427cf8] hover:bg-blue-50 rounded-full gap-2"
                >
                  <span className="text-lg font-medium">Подробнее</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
