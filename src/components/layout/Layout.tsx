import type { ReactNode } from 'react';
import { Header } from './Header';
import { Card } from '@/components/ui/card';

interface LayoutProps {
  leftPanel: ReactNode;
  centerPanel: ReactNode;
  rightPanel: ReactNode;
}

export const Layout = ({ leftPanel, centerPanel, rightPanel }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="p-6">

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          <div className="lg:col-span-3">
            <Card className="p-6">
              {leftPanel}
            </Card>
          </div>
          
          <div className="lg:col-span-6">
            <Card className="p-6">
              {centerPanel}
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Card className="p-6">
              {rightPanel}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};