import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI 建站工具 - 智能生成企业网站',
  description: '使用 AI 快速创建专业的企业网站，支持可视化编辑和 AI 优化',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
