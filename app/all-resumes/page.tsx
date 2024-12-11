'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Search, Plus, RefreshCw } from 'lucide-react'

interface Resume {
  id: number;
  name: string;
  position: string;
  experience: string;
  status: string;
}

const initialResumes: Resume[] = [
  { id: 1, name: "Тимофей Сутулбаев", position: "Frontend Developer", experience: "3 года", status: "Активный" },
  { id: 2, name: "Диана Тюрючева", position: "UX Designer", experience: "5 лет", status: "На рассмотрении" },
  { id: 3, name: "Марат Бакиужабеков", position: "Backend Developer", experience: "2 года", status: "Отклонен" },
  { id: 4, name: "Нурбол Нурубаев", position: "Project Manager", experience: "7 лет", status: "Активный" },
  { id: 5, name: "Алия Сагындыкова", position: "Data Analyst", experience: "4 года", status: "На рассмотрении" },
]

export default function AllResumesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchResumes = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setResumes(initialResumes)
      setIsLoading(false)
    }
    fetchResumes()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
  }

  const filteredResumes = resumes.filter(resume => 
    resume.name.toLowerCase().includes(searchTerm) ||
    resume.position.toLowerCase().includes(searchTerm) ||
    resume.experience.toLowerCase().includes(searchTerm) ||
    resume.status.toLowerCase().includes(searchTerm)
  )

  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-800">Все резюме</CardTitle>
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.location.reload()}
              className="h-8 w-8"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2 w-1/3">
                <Input 
                  placeholder="Поиск резюме..." 
                  className="flex-grow" 
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Button variant="default">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Link href="/add-resume">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить новое резюме
                </Button>
              </Link>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Имя</TableHead>
                    <TableHead>Должность</TableHead>
                    <TableHead>Опыт работы</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResumes.map((resume) => (
                    <TableRow key={resume.id}>
                      <TableCell className="font-medium">{resume.name}</TableCell>
                      <TableCell>{resume.position}</TableCell>
                      <TableCell>{resume.experience}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          resume.status === 'Активный' ? 'bg-green-100 text-green-800' :
                          resume.status === 'На рассмотрении' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {resume.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                          <FileText className="h-4 w-4 mr-2" />
                          Просмотр
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

