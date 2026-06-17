import { useState } from 'react';
import { Eye } from 'lucide-react';
import { INDUSTRY_TEMPLATES } from './pageComponents';

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
  onClose: () => void;
  currentIndustry?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  '工业制造': 'bg-blue-50 text-blue-700 border-blue-200',
  '医疗健康': 'bg-green-50 text-green-700 border-green-200',
  '消费品': 'bg-purple-50 text-purple-700 border-purple-200',
  '材料化工': 'bg-orange-50 text-orange-700 border-orange-200',
  '电子电气': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  '建筑建材': 'bg-amber-50 text-amber-700 border-amber-200',
  '能源环保': 'bg-teal-50 text-teal-700 border-teal-200',
  '农业': 'bg-lime-50 text-lime-700 border-lime-200',
};

// 前四个行业模板支持预览
const PREVIEWABLE_TEMPLATES = ['mechanical-equipment', 'auto-parts', 'biomedical', 'industrial-products'];

export default function TemplateSelector({ onSelect, onClose, currentIndustry }: TemplateSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(INDUSTRY_TEMPLATES.map((t) => t.category))];

  const filtered = INDUSTRY_TEMPLATES.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.products.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory = !selectedCategory || t.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const previewBase = `${window.location.origin}${window.location.pathname}`;

  const handlePreview = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${previewBase}#/template-preview/${templateId}`;
    window.open(url, '_blank');
  };

  const handleSelect = (templateId: string) => {
    onSelect(templateId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">选择行业模板</h2>
            <p className="text-sm text-gray-500 mt-1">
              已预置 {INDUSTRY_TEMPLATES.length * 10}+ 行业产品详情页模板，选择后AI将按行业规范生成页面
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 border-b border-gray-100 space-y-3">
          <input
            type="text"
            placeholder="搜索行业或产品品类..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 rounded-full text-xs border transition-all ${
                !selectedCategory ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
              }`}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs border transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600'
                    : CATEGORY_COLORS[cat] || 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((template) => {
              const canPreview = PREVIEWABLE_TEMPLATES.includes(template.id);
              return (
                <div
                  key={template.id}
                  onClick={() => handleSelect(template.id)}
                  className={`relative text-left p-4 rounded-xl border-2 transition-all hover:shadow-md cursor-pointer group ${
                    currentIndustry === template.id
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-100 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[template.category] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {template.category}
                      </span>
                      {currentIndustry === template.id && (
                        <span className="text-xs text-blue-600 font-medium">当前行业</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm mb-1">{template.name}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3">{template.products.join('、')}</p>
                    {canPreview && (
                      <button
                        onClick={(e) => handlePreview(template.id, e)}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        预览模板
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              <p className="text-lg mb-1">未找到匹配的行业模板</p>
              <p className="text-sm">您可以跳过模板选择，直接开始AI创建</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">共 {filtered.length} 个行业模板</p>
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            暂不选择
          </button>
        </div>
      </div>
    </div>
  );
}
