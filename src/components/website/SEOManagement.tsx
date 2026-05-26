import { useState } from 'react';
import {
  Save,
  Globe,
  FileCode,
  List,
  Tag,
  AlertCircle
} from 'lucide-react';
import { SEOConfig } from '../../types';

const mockSEOConfig: SEOConfig = {
  id: '1',
  robots: 'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /private/',
  sitemapEnabled: true,
  siteTitle: '数字门户 - 数智化业务增长平台',
  siteDescription: '数字门户是一款面向企业的数智化业务增长平台，采用产品矩阵模式，帮助企业实现从网站运营到全球拓展的全链路数字化运营。',
  siteKeywords: '数字门户,AI,数字化,业务增长,营销,电商',
  updatedAt: '2026-05-20',
};

export default function SEOManagement() {
  const [config, setConfig] = useState<SEOConfig>(mockSEOConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">SEO设置</h1>
          <p className="text-gray-500 mt-1">管理网站SEO相关配置</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          <span>{isSaving ? '保存中...' : '保存设置'}</span>
        </button>
      </div>

      {saved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700">设置已成功保存</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileCode className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Robots.txt</h3>
              <p className="text-sm text-gray-500">搜索引擎爬虫规则</p>
            </div>
          </div>
          <textarea
            value={config.robots}
            onChange={(e) => setConfig({ ...config, robots: e.target.value })}
            rows={8}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
            placeholder="User-agent: *\nAllow: /"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <List className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Sitemap设置</h3>
              <p className="text-sm text-gray-500">站点地图配置</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">启用Sitemap</p>
              <p className="text-sm text-gray-500">自动生成XML站点地图</p>
            </div>
            <button
              onClick={() => setConfig({ ...config, sitemapEnabled: !config.sitemapEnabled })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                config.sitemapEnabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  config.sitemapEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {config.sitemapEnabled && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Sitemap地址: <code className="bg-blue-100 px-2 py-1 rounded">/sitemap.xml</code>
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <Tag className="w-5 h-5 text-purple-600" />
        </div>
            <div>
              <h3 className="font-semibold text-gray-800">网站标题</h3>
              <p className="text-sm text-gray-500">TDK - Title</p>
            </div>
          </div>
          <input
            type="text"
            value={config.siteTitle}
            onChange={(e) => setConfig({ ...config, siteTitle: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入网站标题"
          />
          <div className="mt-2 text-sm text-gray-400">
            建议长度：60字符以内 | 当前长度：{config.siteTitle.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">网站描述</h3>
              <p className="text-sm text-gray-500">TDK - Description</p>
            </div>
          </div>
          <textarea
            value={config.siteDescription}
            onChange={(e) => setConfig({ ...config, siteDescription: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="请输入网站描述"
          />
          <div className="mt-2 text-sm text-gray-400">
            建议长度：150-160字符 | 当前长度：{config.siteDescription.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
          <Tag className="w-5 h-5 text-pink-600" />
        </div>
            <div>
              <h3 className="font-semibold text-gray-800">网站关键词</h3>
              <p className="text-sm text-gray-500">TDK - Keywords</p>
            </div>
          </div>
          <input
            type="text"
            value={config.siteKeywords}
            onChange={(e) => setConfig({ ...config, siteKeywords: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入网站关键词，用逗号分隔"
          />
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">SEO优化建议</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                标题应包含核心关键词，长度控制在60字符以内
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                描述应简洁明了，包含主要关键词，长度控制在150-160字符
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                关键词不宜过多，5-10个核心关键词即可
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                启用Sitemap有助于搜索引擎更快发现网站内容
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}