import { CategoryPage } from "@/components/category-page"

const serviceItems = [
  { id: "1", title: "Аварийная служба", description: "Круглосуточная помощь при авариях", phone: "112" },
  { id: "2", title: "Скорая помощь", description: "Экстренная медицинская помощь", phone: "103" },
  { id: "3", title: "Служба ЖКХ", description: "Решение коммунальных проблем", phone: "115" },
]

export default function ServicesPage() {
  return <CategoryPage title="Сервисы" items={serviceItems} />
}

