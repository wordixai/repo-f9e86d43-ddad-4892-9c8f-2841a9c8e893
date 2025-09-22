import { TopNavigation } from "@/components/dashboard/TopNavigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { OrdersFlow } from "@/components/dashboard/OrdersFlow";
import { ProductManagement } from "@/components/dashboard/ProductManagement";
import { AnalyticsDashboard } from "@/components/dashboard/AnalyticsDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <TopNavigation />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Stats Cards */}
          <StatsCards />
          
          {/* Main Dashboard Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Orders Flow - Takes 2 columns */}
            <div className="lg:col-span-2">
              <OrdersFlow />
            </div>
            
            {/* Product Management - Takes 1 column */}
            <div className="lg:col-span-1">
              <ProductManagement />
            </div>
          </div>
          
          {/* Analytics Dashboard - Full width */}
          <AnalyticsDashboard />
        </main>
      </div>
    </div>
  );
};

export default Index;