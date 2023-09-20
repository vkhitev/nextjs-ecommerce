import prismadb from '@/lib/prismadb'
import { CategoryForm } from './components/category-form'

export default async function CategoryPage({
  params,
}: {
  params: {
    storeId: string
    categoryId: string
  }
}) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  )
}
