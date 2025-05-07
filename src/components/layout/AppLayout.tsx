
import React from 'react';
import { AppSidebar } from './AppSidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-metabridge-background text-metabridge-text">
      <AppSidebar />
      <main className="ml-64 min-h-screen">
        <div className="container py-6 px-4 mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
