import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  className?: string;
}

function StatCard({ title, value, change, trend, icon, className }: StatCardProps) {
  return (
    <Card className={cn("card-elevated animate-fade-in", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold gradient-text">{value}</div>
        <div className="flex items-center text-xs mt-1">
          {trend === "up" ? (
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
          )}
          <span className={cn(
            "font-medium",
            trend === "up" ? "text-green-600" : "text-red-600"
          )}>
            {change}
          </span>
          <span className="text-muted-foreground ml-1">较上月</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const stats = [
    {
      title: "总销售额",
      value: "¥324,567",
      change: "+12.5%",
      trend: "up" as const,
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: "新订单",
      value: "1,234",
      change: "+8.2%",
      trend: "up" as const,
      icon: <ShoppingCart className="h-4 w-4" />
    },
    {
      title: "活跃客户",
      value: "2,891",
      change: "+5.4%",
      trend: "up" as const,
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "库存商品",
      value: "4,567",
      change: "-2.1%",
      trend: "down" as const,
      icon: <Package className="h-4 w-4" />
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
          icon={stat.icon}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}