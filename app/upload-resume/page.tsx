'use client'

import { useState } from 'react'
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload, Trash2 } from 'lucide-react'
import { toast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadDate: Date;
  status: 'processing' | 'completed' | 'error';
}

export default function UploadResumePage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type === "application/pdf") {
      setUploadProgress(0)
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        uploadDate: new Date(),
        status: 'processing'
      }
      setUploadedFiles(prev => [...prev, newFile])

      // Simulate file upload
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          setUploadProgress(null)
          setUploadedFiles(prev => 
            prev.map(f => f.id === newFile.id ? {...f, status: 'completed'} : f)
          )
          toast({
            title: "Файл загружен",
            description: `${file.name} успешно загружен и обработан.`,
          })
        }
      }, 500)
    } else {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, загрузите файл в формате PDF.",
        variant: "destructive",
      })
    }
  }

  const deleteFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id))
    toast({
      title: "Файл удален",
      description: "Резюме успешно удалено из системы.",
    })
  }

  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Загрузка резюме</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div 
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-4">
                <Upload className={`h-12 w-12 ${dragActive ? 'text-blue-600' : 'text-gray-400'}`} />
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-800">Перетащите файл PDF сюда</h3>
                  <p className="text-sm text-gray-500">
                    или нажмите для выбора файла
                  </p>
                </div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                    Выбрать файл
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileInput}
                  />
                </label>
              </div>
            </div>
            {uploadProgress !== null && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Загрузка...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}
            <div className="space-y-4">
              <h3 className="font-medium text-lg text-gray-800">Загруженные резюме</h3>
              <div className="grid gap-4">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-800">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          Загружено {file.uploadDate.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        file.status === 'completed' ? 'bg-green-100 text-green-800' :
                        file.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {file.status === 'completed' ? 'Обработан' :
                         file.status === 'processing' ? 'Обработка' : 'Ошибка'}
                      </span>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        Открыть PDF
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800" onClick={() => deleteFile(file.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

