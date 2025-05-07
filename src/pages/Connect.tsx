
import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';

// URL do backend
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:8080/api';

const ConnectPage = () => {
  const [sessionName, setSessionName] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleGenerateQR = async () => {
    if (!sessionName.trim()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/sessions/qr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionName }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar QR code');
      }
      
      setQrCode(data.qrCode);
      toast.success("QR Code gerado com sucesso!");
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Falha ao gerar QR code. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshQR = async () => {
    if (qrCode) {
      setLoading(true);
      
      try {
        const response = await fetch(`${API_URL}/sessions/qr`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionName }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Erro ao atualizar QR code');
        }
        
        setQrCode(data.qrCode);
        toast.success("QR Code atualizado com sucesso!");
      } catch (error) {
        console.error('Erro:', error);
        toast.error("Falha ao atualizar QR code. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">Connect WhatsApp</h1>
        
        <Card className="bg-metabridge-card border-border">
          <CardHeader>
            <CardTitle>New WhatsApp Session</CardTitle>
            <CardDescription className="text-metabridge-muted">
              Connect a new WhatsApp account by scanning the QR code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sessionName">Session Name</Label>
                <Input
                  id="sessionName"
                  placeholder="e.g. Business Account, Support Team"
                  className="bg-metabridge-background border-border text-metabridge-text"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                />
                <p className="text-xs text-metabridge-muted">
                  Give this WhatsApp session a recognizable name
                </p>
              </div>

              <Button 
                className="w-full bg-metabridge-action hover:bg-metabridge-action hover:opacity-90"
                onClick={handleGenerateQR}
                disabled={loading || !sessionName.trim()}
              >
                {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Generate QR Code
              </Button>

              {qrCode && (
                <div className="pt-6 space-y-4">
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Scan this QR code with your WhatsApp</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleRefreshQR}
                        disabled={loading}
                      >
                        {loading ? <Loader className="h-4 w-4 animate-spin" /> : <QrCode className="h-4 w-4 mr-2" />}
                        {loading ? "Refreshing..." : "Refresh QR"}
                      </Button>
                    </div>
                    
                    <div className="bg-white p-4 rounded-md mx-auto flex items-center justify-center">
                      <QRCodeSVG 
                        value={qrCode} 
                        size={256}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                    
                    <p className="text-sm text-metabridge-muted mt-4">
                      Open WhatsApp on your phone, tap Menu or Settings and select WhatsApp Web. 
                      Point your phone to this screen to capture the QR code.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ConnectPage;
