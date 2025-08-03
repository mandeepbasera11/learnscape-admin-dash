import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Download, Eye, Calendar, CreditCard } from "lucide-react"

export default function Orders() {
  const orders = [
    {
      id: "ORD-2024-001",
      date: "Dec 10, 2024",
      items: [
        { name: "Advanced React Development Course", price: 99 },
        { name: "React Testing Certification", price: 49 }
      ],
      total: 148,
      status: "completed",
      paymentMethod: "Credit Card",
      downloadLinks: ["React_Course_Materials.zip", "Certification_Guide.pdf"]
    },
    {
      id: "ORD-2024-002",
      date: "Nov 25, 2024",
      items: [
        { name: "Data Structures & Algorithms", price: 129 }
      ],
      total: 129,
      status: "completed",
      paymentMethod: "PayPal",
      downloadLinks: ["DSA_Complete_Course.zip"]
    },
    {
      id: "ORD-2024-003",
      date: "Nov 15, 2024",
      items: [
        { name: "Web Security Fundamentals", price: 79 },
        { name: "Security Testing Tools", price: 39 }
      ],
      total: 118,
      status: "completed",
      paymentMethod: "Credit Card",
      downloadLinks: ["Security_Course.zip", "Tools_Guide.pdf"]
    },
    {
      id: "ORD-2024-004",
      date: "Dec 12, 2024",
      items: [
        { name: "Premium Membership (6 months)", price: 199 }
      ],
      total: 199,
      status: "processing",
      paymentMethod: "Credit Card",
      downloadLinks: []
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "✅ Completed"
      case "processing":
        return "⏳ Processing"
      case "cancelled":
        return "❌ Cancelled"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            View and manage your course purchases and subscriptions
          </p>
        </div>
        <Button>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Browse Courses
        </Button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="card-soft p-6 hover:shadow-card transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div className="flex items-center gap-4 mb-4 lg:mb-0">
                <div>
                  <h3 className="font-semibold text-foreground">Order {order.id}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3" />
                    {order.date}
                  </div>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusLabel(order.status)}
                </Badge>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">${order.total}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CreditCard className="h-3 w-3" />
                  {order.paymentMethod}
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="font-medium text-foreground">Items:</h4>
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm font-medium">${item.price}</span>
                </div>
              ))}
            </div>

            {order.downloadLinks.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-foreground mb-2">Downloads:</h4>
                <div className="flex flex-wrap gap-2">
                  {order.downloadLinks.map((link, index) => (
                    <Button key={index} variant="outline" size="sm">
                      <Download className="mr-2 h-3 w-3" />
                      {link}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-3 w-3" />
                View Details
              </Button>
              {order.status === "completed" && (
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-3 w-3" />
                  Download Invoice
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="card-soft p-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">4</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">$594</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">6</div>
            <div className="text-sm text-muted-foreground">Courses Purchased</div>
          </div>
        </div>
      </Card>
    </div>
  )
}