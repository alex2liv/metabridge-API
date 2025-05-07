
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

const Dashboard = () => {
  // Mock data for the dashboard
  const stats = [
    {
      title: "Active Sessions",
      value: "3",
      icon: <MessageCircle className="h-5 w-5 text-metabridge-success" />,
      color: "border-metabridge-success"
    },
    {
      title: "Messages Today",
      value: "247",
      icon: <Activity className="h-5 w-5 text-metabridge-action" />,
      color: "border-metabridge-action"
    },
    {
      title: "Alerts",
      value: "1",
      icon: <AlertTriangle className="h-5 w-5 text-metabridge-warning" />,
      color: "border-metabridge-warning"
    },
    {
      title: "Connected to Chatwoot",
      value: "Yes",
      icon: <CheckCircle className="h-5 w-5 text-metabridge-success" />,
      color: "border-metabridge-success"
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button variant="outline" className="border-metabridge-action text-metabridge-action hover:bg-metabridge-action hover:text-white">
            Refresh Status
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`bg-metabridge-card border-l-4 ${stat.color}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
                <CardTitle className="text-sm font-medium text-metabridge-muted">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-metabridge-card">
            <CardHeader>
              <CardTitle>WhatsApp Sessions</CardTitle>
              <CardDescription className="text-metabridge-muted">
                Status of your connected WhatsApp accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-md bg-metabridge-background flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="status-indicator status-active"></span>
                    <span>Business Account (+1 555-0123)</span>
                  </div>
                  <span className="text-xs text-metabridge-success">Connected</span>
                </div>
                <div className="p-3 rounded-md bg-metabridge-background flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="status-indicator status-active"></span>
                    <span>Support Team (+1 555-0124)</span>
                  </div>
                  <span className="text-xs text-metabridge-success">Connected</span>
                </div>
                <div className="p-3 rounded-md bg-metabridge-background flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="status-indicator status-warning"></span>
                    <span>Sales Account (+1 555-0125)</span>
                  </div>
                  <span className="text-xs text-metabridge-warning">Reconnecting...</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-metabridge-card">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription className="text-metabridge-muted">
                Current system performance and webhooks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-metabridge-muted">Chatwoot Connection</span>
                  <span className="inline-flex items-center">
                    <span className="status-indicator status-active"></span>
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-metabridge-muted">n8n Webhook</span>
                  <span className="inline-flex items-center">
                    <span className="status-indicator status-active"></span>
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-metabridge-muted">API Status</span>
                  <span className="inline-flex items-center">
                    <span className="status-indicator status-active"></span>
                    Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-metabridge-muted">Memory Usage</span>
                  <span className="text-metabridge-muted">127MB / 512MB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
