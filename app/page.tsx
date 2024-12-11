import Link from "next/link"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight, FileText, Search, Upload } from 'lucide-react'

export default function HomePage() {
  return (
    <Layout>
      <div className="space-y-6">
   
        <div className="ugushka flex">
        <Card className="border-blue-100 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-800">Добро пожаловать в CityLion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-600">
              CityLion использует передовые технологии искусственного интеллекта для анализа резюме и сопоставления резюме с требованиями работодателей. Это позволяет быстро и эффективно находить наиболее подходящих кандидатов.
            </p>
          </CardContent>
        </Card>
        </div>
        

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Найти Резюме</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Используйте поиск для навигации по базе резюме
              </p>
              <div className="flex space-x-2">
                <Input placeholder="Поиск резюме..." className="flex-grow" />
                <Link href="/all-resumes">
                  <Button variant="default">
                    <Search className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Добавить Резюме</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Создайте новое резюме или загрузите существующее
              </p>
              <Link href="/add-resume">
                <Button variant="default" className="w-full">
                  Добавить резюме
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Загрузить Резюме</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Загрузите резюме в формате PDF
              </p>
              <Link href="/upload-resume">
                <Button variant="default" className="w-full">
                  Загрузить PDF
                  <Upload className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Недавние резюме</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя файла</TableHead>
                  <TableHead>Дата загрузки</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {['Тимофей Сутулбаев', 'Диана Тюрючева', 'Марат Бакиужабеков', 'Нурбол Нурубаев'].map((name, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Обработан
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        <FileText className="h-4 w-4 mr-2" />
                        Открыть PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

