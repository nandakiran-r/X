
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, Users, UserCheck, Clock, Activity, TrendingUp, TrendingDown } from "lucide-react";

const AnalyticsPage = () => {
  return (
    <div className="admin-container space-y-6">
      <h1 className="text-3xl font-bold text-hersaki-purple">Analytics</h1>
      
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Total Users</span>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardTitle>
                <CardDescription>Total registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4,827</div>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>12% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Active Users</span>
                  <UserCheck className="h-4 w-4 text-gray-500" />
                </CardTitle>
                <CardDescription>Users active in the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,841</div>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>8% from last week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Avg. Session Time</span>
                  <Clock className="h-4 w-4 text-gray-500" />
                </CardTitle>
                <CardDescription>Average time spent in app</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">6m 42s</div>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>1m 12s from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-muted-foreground">Chart placeholder - User Growth Over Time</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Age distribution of users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-muted-foreground">Chart placeholder - User Demographics</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Users by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-muted-foreground">Chart placeholder - Geographic Distribution</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Daily Active Users</span>
                  <Activity className="h-4 w-4 text-gray-500" />
                </CardTitle>
                <CardDescription>Average DAU last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,247</div>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>5% from previous week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Retention Rate</span>
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                </CardTitle>
                <CardDescription>30-day retention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">68%</div>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>3% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Churn Rate</span>
                  <TrendingDown className="h-4 w-4 text-gray-500" />
                </CardTitle>
                <CardDescription>Monthly user churn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4.2%</div>
                <div className="flex items-center text-sm text-red-600 mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>0.5% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>Weekly active users and sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-muted-foreground">Chart placeholder - User Engagement Over Time</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Usage</CardTitle>
                <CardDescription>Most used app features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-muted-foreground">Chart placeholder - Feature Usage</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Session Times</CardTitle>
                <CardDescription>Usage by time of day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-muted-foreground">Chart placeholder - Session Times</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Top Remedies</CardTitle>
                <CardDescription>Most viewed remedies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Ashoka Tea</span>
                    <span className="text-sm text-muted-foreground">2,451 views</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-hersaki-purple h-1.5 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Shatavari Tonic</span>
                    <span className="text-sm text-muted-foreground">1,893 views</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-hersaki-purple h-1.5 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Turmeric Milk</span>
                    <span className="text-sm text-muted-foreground">1,540 views</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-hersaki-purple h-1.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Popular Categories</CardTitle>
                <CardDescription>Most viewed remedy categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Menstrual Pain</span>
                    <span className="text-sm text-muted-foreground">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-hersaki-purple h-1.5 rounded-full" style={{ width: "32%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">PCOS</span>
                    <span className="text-sm text-muted-foreground">28%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-hersaki-purple h-1.5 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Hormonal Balance</span>
                    <span className="text-sm text-muted-foreground">24%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-hersaki-purple h-1.5 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Doctor Profiles</CardTitle>
                <CardDescription>Most viewed doctors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Dr. Aditi Sharma</span>
                    <span className="text-sm text-muted-foreground">1,245 views</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-hersaki-purple h-1.5 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Dr. Priya Patel</span>
                    <span className="text-sm text-muted-foreground">987 views</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-hersaki-purple h-1.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Dr. Rajesh Kumar</span>
                    <span className="text-sm text-muted-foreground">754 views</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-hersaki-purple h-1.5 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">User Feedback</CardTitle>
                <CardDescription>Rating distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[146px] flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-muted-foreground">Chart placeholder - Rating Distribution</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Content Performance Over Time</CardTitle>
              <CardDescription>Views and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-muted-foreground">Chart placeholder - Content Performance</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
