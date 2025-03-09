
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Leaf, Activity, UserCheck } from "lucide-react";

const DashboardMetrics = [
  {
    title: "Total Doctors",
    value: "32",
    description: "Ayurvedic practitioners",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Active Remedies",
    value: "184",
    description: "Ayurvedic treatments",
    icon: Leaf,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Active Users",
    value: "2,841",
    description: "Current app users",
    icon: UserCheck,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    title: "Daily Sessions",
    value: "349",
    description: "Today's user sessions",
    icon: Activity,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
];

const RecentActivities = [
  {
    activity: "New doctor profile added",
    time: "10 minutes ago",
    user: "Admin",
  },
  {
    activity: "Updated Ayurvedic remedy for PCOS",
    time: "1 hour ago",
    user: "Content Team",
  },
  {
    activity: "New user testimonial approved",
    time: "3 hours ago",
    user: "Moderator",
  },
  {
    activity: "System maintenance completed",
    time: "Yesterday",
    user: "System",
  },
];

const Dashboard = () => {
  return (
    <div className="admin-container space-y-6">
      <h1 className="text-3xl font-bold text-hersaki-purple">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DashboardMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className={`p-3 rounded-full ${metric.bgColor}`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly active users over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-muted-foreground">Chart placeholder - User Growth</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RecentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 border-b pb-3 last:border-0">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-hersaki-purple"></div>
                  <div>
                    <p className="font-medium text-sm">{activity.activity}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{activity.time}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
