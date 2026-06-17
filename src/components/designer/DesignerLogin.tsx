import { useState } from 'react';

export default function DesignerLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [siteUrl, setSiteUrl] = useState('https://design.example.com');

  const handleLogin = () => {
    onLogin();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        <h1 className="text-2xl font-bold text-center mb-10" style={{ color: '#4A90D9' }}>
          DCLOUD LOGIN PLATFORM
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="请输入用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-400"
          />
          <input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-400"
          />
          <input
            type="text"
            placeholder="请输入网站地址"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-400"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-8 py-3 rounded-md text-white text-base font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#4A90D9' }}
        >
          登 录
        </button>

        <p className="text-center text-gray-400 text-sm mt-8">设计云平台</p>
      </div>
    </div>
  );
}
