
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Trash2, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// URL do backend
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:8080/api';

interface WhatsAppSession {
  id: string;
  name: string;
  phone: string;
  status: 'active' | 'inactive' | 'reconnecting';
  lastActive: string;
}

const SessionsPage = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<WhatsAppSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/sessions`);
      if (!response.ok) {
        throw new Error('Erro ao buscar sessões');
      }
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Erro ao carregar sessões:', error);
      toast.error("Não foi possível carregar as sessões do WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handleReconnect = async (sessionId: string) => {
    try {
      const response = await fetch(`${API_URL}/sessions/${sessionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'reconnecting' }),
      });
      
      if (!response.ok) {
        throw new Error('Falha ao reconectar');
      }
      
      // Atualiza a sessão na lista
      setSessions(sessions.map(session => 
        session.id === sessionId ? { ...session, status: 'reconnecting' } : session
      ));
      
      toast.success("Sessão está tentando reconectar.");
    } catch (error) {
      console.error('Erro ao reconectar:', error);
      toast.error("Falha ao reconectar a sessão.");
    }
  };

  const handleDelete = async (sessionId: string) => {
    if (confirm('Tem certeza que deseja excluir esta sessão?')) {
      try {
        const response = await fetch(`${API_URL}/sessions/${sessionId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Falha ao excluir sessão');
        }
        
        // Remove a sessão da lista
        setSessions(sessions.filter(session => session.id !== sessionId));
        toast.success("Sessão excluída com sucesso.");
      } catch (error) {
        console.error('Erro ao excluir:', error);
        toast.error("Falha ao excluir a sessão.");
      }
    }
  };

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
          <Button 
            className="bg-metabridge-action hover:bg-metabridge-action hover:opacity-90"
            onClick={() => navigate('/connect')}
          >
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
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="flex flex-col items-center">
                  <RefreshCw className="h-8 w-8 animate-spin text-metabridge-muted" />
                  <p className="mt-2 text-metabridge-muted">Carregando sessões...</p>
                </div>
              </div>
            ) : (
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
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReconnect(session.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Reconnect
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleDelete(session.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SessionsPage;
