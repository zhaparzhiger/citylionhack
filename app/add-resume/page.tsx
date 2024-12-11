'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'
import { toast } from "@/hooks/use-toast"

export default function AddResumePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    education: '',
    skills: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Resume submitted:', formData)
    toast({
      title: "Резюме добавлено",
      description: "Новое резюме успешно добавлено в систему.",
    })
    setIsSubmitting(false)
    router.push('/all-resumes')
  }

  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Добавить новое резюме</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">ФИО</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Должность</Label>
                <Input id="position" name="position" value={formData.position} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Опыт работы</Label>
              <Input id="experience" name="experience" value={formData.experience} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Образование</Label>
              <Input id="education" name="education" value={formData.education} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Навыки</Label>
              <Input id="skills" name="skills" value={formData.skills} onChange={handleChange} required />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Добавление...
                </>
              ) : (
                'Добавить резюме'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  )
}

