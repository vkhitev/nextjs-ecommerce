import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'

import { OrderClient } from './components/order-client'
import { OrderColumn } from './components/columns'
import { formatter } from '@/lib/utils'

interface OrdersPageProps {
  params: {
    storeId: string
  }
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedOrders: Array<OrderColumn> = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(', '),
    totalPrice: formatter.format(
      item.orderItems.reduce(
        (acc, orderItem) => acc + Number(orderItem.product.price),
        0,
      ),
    ),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  )
}
