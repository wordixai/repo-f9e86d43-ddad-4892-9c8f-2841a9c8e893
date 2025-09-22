import { useState } from "react";
import { Clock, CheckCircle, Truck, AlertCircle, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  items: number;
  time: string;
}

const statusConfig = {
  pending: { label: "待处理", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  processing: { label: "处理中", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
  shipped: { label: "已发货", color: "bg-purple-100 text-purple-700", icon: Truck },
  delivered: { label: "已送达", color: "bg-green-100 text-green-700", icon: CheckCircle },
};

export function OrdersFlow() {
  const [orders] = useState<Order[]>([
    { id: "ORD-2024-001", customer: "张小明", amount: 299.99, status: "pending", items: 3, time: "2分钟前" },
    { id: "ORD-2024-002", customer: "李小红", amount: 599.50, status: "processing", items: 1, time: "15分钟前" },
    { id: "ORD-2024-003", customer: "王大华", amount: 149.99, status: "shipped", items: 2, time: "1小时前" },
    { id: "ORD-2024-004", customer: "赵小芳", amount: 799.00, status: "processing", items: 4, time: "2小时前" },
    { id: "ORD-2024-005", customer: "刘志强", amount: 399.99, status: "delivered", items: 1, time: "3小时前" },
  ]);

  const getStatusBadge = (status: Order["status"]) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <Badge variant="secondary" className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>订单流</span>
          <Button variant="outline" size="sm">
            查看全部
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-primary text-white text-xs">
                    {order.customer.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{order.id}</div>
                  <div className="text-xs text-muted-foreground">{order.customer} • {order.items}件商品</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-medium">¥{order.amount}</div>
                  <div className="text-xs text-muted-foreground">{order.time}</div>
                </div>
                {getStatusBadge(order.status)}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>查看详情</DropdownMenuItem>
                    <DropdownMenuItem>更新状态</DropdownMenuItem>
                    <DropdownMenuItem>发送通知</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}