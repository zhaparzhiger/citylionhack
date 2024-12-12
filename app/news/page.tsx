import { CategoryPage } from "@/components/category-page"

const newsItems = [
  { id: "1", title: "Ремонт дороги на ул. Ленина", description: "Ремонтные работы продлятся до конца месяца", date: "2023-06-10" },
  { id: "2", title: "Отключение воды в центральном районе", description: "Плановые работы 15 июня с 9:00 до 18:00", date: "2023-06-14" },
  { id: "3", title: "Открытие нового парка", description: "Торжественное открытие состоится в эту субботу", date: "2023-06-18" },
]

export default function NewsPage() {
  return <CategoryPage title="Новости" items={newsItems} />
}
