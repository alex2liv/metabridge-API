
const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Serve o frontend em produção
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));
}

// Armazenamento temporário para sessões (em produção real usaríamos um banco de dados)
const sessions = [
  {
    id: '1',
    name: 'Business Account',
    phone: '+1 555-0123',
    status: 'active',
    lastActive: '2023-05-07T14:32:23Z',
    qrCode: null
  },
  {
    id: '2',
    name: 'Support Team',
    phone: '+1 555-0124',
    status: 'active',
    lastActive: '2023-05-07T14:30:45Z',
    qrCode: null
  }
];

// API para obter todas as sessões
app.get('/api/sessions', (req, res) => {
  res.json(sessions.map(session => {
    // Não enviar o QR code na listagem
    const { qrCode, ...sessionData } = session;
    return sessionData;
  }));
});

// API para obter uma sessão específica
app.get('/api/sessions/:id', (req, res) => {
  const session = sessions.find(s => s.id === req.params.id);
  if (!session) {
    return res.status(404).json({ error: 'Sessão não encontrada' });
  }
  res.json(session);
});

// API para gerar QR code
app.post('/api/sessions/qr', (req, res) => {
  const { sessionName } = req.body;
  
  if (!sessionName || !sessionName.trim()) {
    return res.status(400).json({ error: 'Nome da sessão é obrigatório' });
  }
  
  // Em uma implementação real, aqui teria a lógica para gerar o QR code do WhatsApp
  setTimeout(() => {
    const mockQrCode = `whatsapp://connection/${uuidv4()}`;
    res.json({ qrCode: mockQrCode });
  }, 1000);
});

// API para criar uma nova sessão
app.post('/api/sessions', (req, res) => {
  const { name } = req.body;
  
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Nome da sessão é obrigatório' });
  }
  
  const newSession = {
    id: uuidv4(),
    name,
    phone: `+1 555-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    status: 'reconnecting',
    lastActive: new Date().toISOString(),
    qrCode: null
  };
  
  sessions.push(newSession);
  res.status(201).json(newSession);
});

// API para atualizar uma sessão
app.put('/api/sessions/:id', (req, res) => {
  const { id } = req.params;
  const sessionIndex = sessions.findIndex(s => s.id === id);
  
  if (sessionIndex === -1) {
    return res.status(404).json({ error: 'Sessão não encontrada' });
  }
  
  const updatedSession = {
    ...sessions[sessionIndex],
    ...req.body,
    id // Garantir que o ID não mude
  };
  
  sessions[sessionIndex] = updatedSession;
  res.json(updatedSession);
});

// API para excluir uma sessão
app.delete('/api/sessions/:id', (req, res) => {
  const { id } = req.params;
  const sessionIndex = sessions.findIndex(s => s.id === id);
  
  if (sessionIndex === -1) {
    return res.status(404).json({ error: 'Sessão não encontrada' });
  }
  
  sessions.splice(sessionIndex, 1);
  res.json({ success: true });
});

// Salvar configurações
app.post('/api/settings/chatwoot', (req, res) => {
  // Aqui seria implementada a lógica para salvar as configurações do Chatwoot
  res.json({ success: true, message: 'Configurações do Chatwoot salvas com sucesso' });
});

app.post('/api/settings/webhook', (req, res) => {
  // Aqui seria implementada a lógica para salvar as configurações de webhook
  res.json({ success: true, message: 'Configurações de webhook salvas com sucesso' });
});

// Para qualquer outra rota no modo de produção, serve o index.html
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
