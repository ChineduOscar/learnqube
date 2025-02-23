import ToastProvider from '../component/toastProvider';

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      {children}
      <ToastProvider />
    </main>
  );
}