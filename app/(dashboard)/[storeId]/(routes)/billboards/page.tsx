import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'

import { BillboardClient } from './components/billboard-client'
import { BillboardColumn } from './components/columns'

interface BillboardsPageProps {
  params: {
    storeId: string
  }
}

export default async function BillboardsPage({ params }: BillboardsPageProps) {
  // const { userId } = auth()

  // if (!userId) {
  //   redirect('/sign-in')
  // }

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedBillboards: Array<BillboardColumn> = billboards.map(
    (item) => ({
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }),
  )

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  )
}
