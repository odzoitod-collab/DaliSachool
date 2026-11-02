import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Далі — онлайн-школа підготовки до НМТ', description: 'Готуємося до НМТ з математики та української мови з підтримкою та вірою у себе.' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="uk"><body>{children}</body></html>; }
