'use client'
import { Suspense } from 'react';
import DashboardComponent from '../component/dashboardComponent';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <DashboardComponent />
    </Suspense>
  );
}
