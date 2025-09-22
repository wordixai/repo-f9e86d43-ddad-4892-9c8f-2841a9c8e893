import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Edit, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "low_stock";
  image: string;
  category: string;
}

interface SortableProductProps {
  product: Product;
}

function SortableProduct({ product }: SortableProductProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusBadge = (status: Product["status"]) => {
    const config = {
      active: { label: "上架中", className: "bg-green-100 text-green-700" },
      inactive: { label: "已下架", className: "bg-gray-100 text-gray-700" },
      low_stock: { label: "库存不足", className: "bg-yellow-100 text-yellow-700" },
    };
    
    return (
      <Badge variant="secondary" className={config[status].className}>
        {config[status].label}
      </Badge>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center space-x-3">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        
        <img
          src={product.image}
          alt={product.name}
          className="h-12 w-12 object-cover rounded-md"
        />
        
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-muted-foreground">{product.category}</div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="font-medium">¥{product.price}</div>
          <div className="text-sm text-muted-foreground">库存: {product.stock}</div>
        </div>
        
        {getStatusBadge(product.status)}
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>编辑商品</DropdownMenuItem>
              <DropdownMenuItem>复制商品</DropdownMenuItem>
              <DropdownMenuItem>查看统计</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">删除商品</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "iPhone 15 Pro",
      price: 7999,
      stock: 45,
      status: "active",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=100&h=100&fit=crop",
      category: "电子产品"
    },
    {
      id: "2",
      name: "MacBook Air M2",
      price: 8999,
      stock: 12,
      status: "low_stock",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
      category: "电脑设备"
    },
    {
      id: "3",
      name: "AirPods Pro",
      price: 1899,
      stock: 89,
      status: "active",
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100&h=100&fit=crop",
      category: "音频设备"
    },
    {
      id: "4",
      name: "iPad Pro 12.9",
      price: 6999,
      stock: 0,
      status: "inactive",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop",
      category: "平板电脑"
    },
    {
      id: "5",
      name: "Apple Watch Series 9",
      price: 2999,
      stock: 23,
      status: "active",
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=100&h=100&fit=crop",
      category: "智能手表"
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setProducts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>商品管理</span>
          <Button variant="outline" size="sm">
            添加商品
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={products} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {products.map((product) => (
                <SortableProduct key={product.id} product={product} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}