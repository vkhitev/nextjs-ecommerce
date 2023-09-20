import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'

import { CategoryClient } from './components/category-client'
import { CategoryColumn } from './components/columns'

interface CategoriesPageProps {
  params: {
    storeId: string
  }
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedCategories: Array<CategoryColumn> = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  )
}
