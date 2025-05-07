import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// URL do backend
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:8080/api';

const SettingsPage = () => {
  // Mock initial settings
  const [chatwootSettings, setChatwootSettings] = useState({
    url: 'https://chatwoot.example.com',
    token: 'chatwoot_access_token_12345',
    inboxIdentifier: 'inbox_12345',
  });

  const [webhookSettings, setWebhookSettings] = useState({
    n8nUrl: 'https://n8n.example.com/webhook/12345',
    apiKey: 'api_key_12345',
  });

  const handleChatwootSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/settings/chatwoot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatwootSettings),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar configurações');
      }
      
      toast.success("Configurações do Chatwoot salvas com sucesso");
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Falha ao salvar configurações do Chatwoot");
    }
  };

  const handleWebhookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/settings/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookSettings),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar configurações');
      }
      
      toast.success("Configurações de webhook salvas com sucesso");
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Falha ao salvar configurações de webhook");
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Tabs defaultValue="chatwoot">
          <TabsList className="grid w-full grid-cols-2 bg-metabridge-background border border-border rounded-md">
            <TabsTrigger value="chatwoot">Chatwoot Integration</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks & API</TabsTrigger>
          </TabsList>

          <TabsContent value="chatwoot" className="mt-6">
            <Card className="bg-metabridge-card border-border">
              <CardHeader>
                <CardTitle>Chatwoot Configuration</CardTitle>
                <CardDescription className="text-metabridge-muted">
                  Configure your Chatwoot integration settings
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleChatwootSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chatwootUrl">Chatwoot URL</Label>
                    <Input
                      id="chatwootUrl"
                      placeholder="https://chatwoot.yourdomain.com"
                      className="bg-metabridge-background border-border text-metabridge-text"
                      value={chatwootSettings.url}
                      onChange={(e) => setChatwootSettings({...chatwootSettings, url: e.target.value})}
                    />
                    <p className="text-xs text-metabridge-muted">
                      The URL of your Chatwoot instance
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="chatwootToken">Access Token</Label>
                    <Input
                      id="chatwootToken"
                      type="password"
                      placeholder="Your Chatwoot access token"
                      className="bg-metabridge-background border-border text-metabridge-text"
                      value={chatwootSettings.token}
                      onChange={(e) => setChatwootSettings({...chatwootSettings, token: e.target.value})}
                    />
                    <p className="text-xs text-metabridge-muted">
                      The access token for authenticating with Chatwoot API
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="inboxIdentifier">Inbox Identifier</Label>
                    <Input
                      id="inboxIdentifier"
                      placeholder="Chatwoot inbox identifier"
                      className="bg-metabridge-background border-border text-metabridge-text"
                      value={chatwootSettings.inboxIdentifier}
                      onChange={(e) => setChatwootSettings({...chatwootSettings, inboxIdentifier: e.target.value})}
                    />
                    <p className="text-xs text-metabridge-muted">
                      The identifier for the Chatwoot inbox to use
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-metabridge-action hover:bg-metabridge-action hover:opacity-90">
                    Save Chatwoot Settings
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="mt-6">
            <Card className="bg-metabridge-card border-border">
              <CardHeader>
                <CardTitle>Webhooks & API Configuration</CardTitle>
                <CardDescription className="text-metabridge-muted">
                  Configure webhooks for n8n and API access
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleWebhookSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="n8nWebhookUrl">n8n Webhook URL</Label>
                    <Input
                      id="n8nWebhookUrl"
                      placeholder="https://n8n.yourdomain.com/webhook/endpoint"
                      className="bg-metabridge-background border-border text-metabridge-text"
                      value={webhookSettings.n8nUrl}
                      onChange={(e) => setWebhookSettings({...webhookSettings, n8nUrl: e.target.value})}
                    />
                    <p className="text-xs text-metabridge-muted">
                      The URL where MetaBridge will send webhook events to n8n
                    </p>
                  </div>
                  
                  <Separator className="my-4 bg-border" />
                  
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Your API key for authentication"
                      className="bg-metabridge-background border-border text-metabridge-text"
                      value={webhookSettings.apiKey}
                      onChange={(e) => setWebhookSettings({...webhookSettings, apiKey: e.target.value})}
                    />
                    <p className="text-xs text-metabridge-muted">
                      API key for authenticating external services with MetaBridge
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-2">API Endpoints</h3>
                    <div className="bg-metabridge-background rounded-md p-3 text-sm">
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="text-metabridge-muted">Connect WhatsApp</div>
                        <code className="text-metabridge-text">POST /api/connect</code>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="text-metabridge-muted">Get Session Status</div>
                        <code className="text-metabridge-text">GET /api/status</code>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="text-metabridge-muted">Send Message</div>
                        <code className="text-metabridge-text">POST /api/send-message</code>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-metabridge-action hover:bg-metabridge-action hover:opacity-90">
                    Save Webhook Settings
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
