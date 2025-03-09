
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Shield, Bell, Server, Users } from "lucide-react";

const SettingsPage = () => {
  const { toast } = useToast();
  const [accountForm, setAccountForm] = useState({
    name: "Admin User",
    email: "admin@gmail.com",
    role: "Administrator"
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    securityAlerts: true
  });
  
  const [apiSettings, setApiSettings] = useState({
    apiKey: "••••••••••••••••",
    appEndpoint: "https://api.hersakhi.com/v1"
  });

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account settings updated",
      description: "Your account information has been saved."
    });
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Notification settings updated",
      description: `${key} ${notificationSettings[key] ? 'disabled' : 'enabled'}.`
    });
  };
  
  const regenerateApiKey = () => {
    setApiSettings(prev => ({
      ...prev,
      apiKey: "••••••••••••••••"
    }));
    
    toast({
      title: "API key regenerated",
      description: "A new API key has been generated. Please save it securely."
    });
  };
  
  return (
    <div className="admin-container space-y-6">
      <h1 className="text-3xl font-bold text-hersaki-purple">Settings</h1>
      
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center">
            <Server className="h-4 w-4 mr-2" />
            API
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <form onSubmit={handleAccountSubmit}>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={accountForm.name}
                    onChange={e => setAccountForm({...accountForm, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={accountForm.email}
                    onChange={e => setAccountForm({...accountForm, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input 
                    id="role" 
                    value={accountForm.role}
                    disabled
                  />
                  <p className="text-sm text-muted-foreground">
                    Your role cannot be changed. Contact a system administrator for role changes.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="bg-hersaki-purple hover:bg-hersaki-dark-purple">
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications about system updates
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={() => handleNotificationChange('emailNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications on your device
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={() => handleNotificationChange('pushNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly performance reports
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={() => handleNotificationChange('weeklyReports')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Security Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified about security-related events
                  </p>
                </div>
                <Switch 
                  checked={notificationSettings.securityAlerts}
                  onCheckedChange={() => handleNotificationChange('securityAlerts')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>
                Manage API keys and endpoints for the HerSakhi app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="apiKey" 
                    value={apiSettings.apiKey}
                    readOnly
                    type="password"
                  />
                  <Button 
                    variant="outline" 
                    onClick={regenerateApiKey}
                    className="shrink-0"
                  >
                    Regenerate
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your API key grants access to the HerSakhi API. Keep it secure.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endpoint">API Endpoint</Label>
                <Input 
                  id="endpoint" 
                  value={apiSettings.appEndpoint}
                  readOnly
                />
                <p className="text-sm text-muted-foreground">
                  The base URL for all API requests
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL (Optional)</Label>
                <Input 
                  id="webhookUrl" 
                  placeholder="https://your-webhook-url.com"
                />
                <p className="text-sm text-muted-foreground">
                  Receive notifications when certain events occur
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-hersaki-purple hover:bg-hersaki-dark-purple">
                Save API Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Enhance your account security with 2FA
                    </p>
                  </div>
                  <Button variant="outline" className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Enable 2FA
                  </Button>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">Session Management</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  You're currently logged in on 1 device
                </p>
                <Button variant="outline" className="text-red-500 hover:text-red-700">
                  Sign out from all devices
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-hersaki-purple hover:bg-hersaki-dark-purple">
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
