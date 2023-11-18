import { ReactNode } from 'react';
import NewNavBar from './NewNavBar';
import Footer from './Footer';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col bg-bm__layout'>
      <NewNavBar />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  );
}
