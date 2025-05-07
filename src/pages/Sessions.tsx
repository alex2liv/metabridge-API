
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Trash2, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WhatsAppSession {
  id: string;
  name: string;
  phone: string;
  status: 'active' | 'inactive' | 'reconnecting';
  lastActive: string;
}

const SessionsPage = () => {
  // Mock data for WhatsApp sessions
  const sessions: WhatsAppSession[] = [
    {
      id: '1',
      name: 'Business Account',
      phone: '+1 555-0123',
      status: 'active',
      lastActive: '2023-05-07T14:32:23Z',
    },
    {
      id: '2',
      name: 'Support Team',
      phone: '+1 555-0124',
      status: 'active',
      lastActive: '2023-05-07T14:30:45Z',
    },
    {
      id: '3',
      name: 'Sales Account',
      phone: '+1 555-0125',
      status: 'reconnecting',
      lastActive: '2023-05-07T13:45:12Z',
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-metabridge-success">Active</Badge>;
      case 'inactive':
        return <Badge variant="destructive">Inactive</Badge>;
      case 'reconnecting':
        return <Badge className="bg-metabridge-warning">Reconnecting</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">WhatsApp Sessions</h1>
          <Button className="bg-metabridge-action hover:bg-metabridge-action hover:opacity-90">
            <MessageCircle className="mr-2 h-4 w-4" />
            Connect New Session
          </Button>
        </div>

        <Card className="bg-metabridge-card border-border">
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription className="text-metabridge-muted">
              Manage your connected WhatsApp accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.length === 0 ? (
                <div className="text-center py-6 text-metabridge-muted">
                  <p>No WhatsApp sessions connected.</p>
                  <p className="text-sm mt-2">Connect your first WhatsApp account to get started.</p>
                </div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 rounded-lg bg-metabridge-background border border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="flex items-center">
                      <span className={`status-indicator status-${session.status}`}></span>
                      <div>
                        <h3 className="font-medium">{session.name}</h3>
                        <p className="text-sm text-metabridge-muted">{session.phone}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      {getStatusBadge(session.status)}
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                      <Button size="sm" variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reconnect
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SessionsPage;
