
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Settings, MessageCircle, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
        active 
          ? "bg-metabridge-action bg-opacity-20 text-metabridge-text" 
          : "text-metabridge-muted hover:text-metabridge-text hover:bg-metabridge-action hover:bg-opacity-10"
      )}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export function AppSidebar() {
  const pathname = window.location.pathname;

  return (
    <div className="w-64 bg-metabridge-sidebar border-r border-border h-screen flex flex-col fixed left-0 top-0">
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold text-metabridge-text">MetaBridge</h1>
        <p className="text-xs text-metabridge-muted">WhatsApp Connection Manager</p>
      </div>

      <div className="flex-1 py-6">
        <nav className="px-2 space-y-1">
          <NavItem 
            to="/" 
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            active={pathname === '/'} 
          />
          <NavItem 
            to="/sessions" 
            icon={<MessageCircle className="w-5 h-5" />}
            label="WhatsApp Sessions"
            active={pathname === '/sessions'} 
          />
          <NavItem 
            to="/connect" 
            icon={<UserPlus className="w-5 h-5" />}
            label="Connect WhatsApp"
            active={pathname === '/connect'} 
          />
          <NavItem 
            to="/settings" 
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
            active={pathname === '/settings'} 
          />
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <p className="text-xs text-metabridge-muted">Version 1.0.0</p>
      </div>
    </div>
  );
}
