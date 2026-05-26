import { useState } from 'react';
import {
  Image,
  Download,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import { imageScenes } from '../../data/websites';

interface GeneratedImage {
  id: string;
  scene: string;
  prompt: string;
  thumbnail: string;
  createdAt: string;
  status: 'generating' | 'completed';
}

const mockGeneratedImages: GeneratedImage[] = [
  { id: '1', scene: '产品展示', prompt: '工业机器人在现代化工厂场景中', thumbnail: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=industrial%20robot%20in%20modern%20factory&image_size=square', createdAt: '2026-05-20 15:00', status: 'completed' },
  { id: '2', scene: '展会海报', prompt: '科技展会宣传海报设计', thumbnail: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=technology%20exhibition%20poster&image_size=landscape_16_9', createdAt: '2026-05-19 10:30', status: 'completed' },
];

export default function AIImageGenerator() {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>(mockGeneratedImages);
  const [imagePrompt, setImagePrompt] = useState('');
  const [selectedImageScene, setSelectedImageScene] = useState('');
  const [selectedSize, setSelectedSize] = useState('square');

  const handleGenerateImage = () => {
    if (!selectedImageScene || !imagePrompt) return;
    const scene = imageScenes.find(s => s.id === selectedImageScene);
    const newImage: GeneratedImage = {
      id: Date.now().toString(),
      scene: scene?.name || '',
      prompt: imagePrompt,
      thumbnail: `https://neeko-copilot.bytedance.net/api/text2image?prompt=${encodeURIComponent(imagePrompt)}&image_size=${selectedSize}`,
      createdAt: new Date().toLocaleString(),
      status: 'generating'
    };
    setGeneratedImages([newImage, ...generatedImages]);
    setTimeout(() => {
      setGeneratedImages(prev => prev.map(img =>
        img.id === newImage.id ? { ...img, status: 'completed' as const } : img
      ));
    }, 3000);
    setImagePrompt('');
    setSelectedImageScene('');
  };

  const handleDeleteImage = (id: string) => {
    if (confirm('确定要删除吗？')) {
      setGeneratedImages(generatedImages.filter(img => img.id !== id));
    }
  };

  const imageSizes = [
    { id: 'square', label: '正方形' },
    { id: 'landscape_16_9', label: '横版' },
    { id: 'portrait_9_16', label: '竖版' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 左侧：场景预设 + 提示词 + 图片尺寸 */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-gray-50 rounded-xl p-5">
          <h3 className="font-semibold text-gray-800 mb-4">AI生图设置</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">场景预设</label>
              <div className="grid grid-cols-2 gap-2">
                {imageScenes.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => setSelectedImageScene(scene.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                      selectedImageScene === scene.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span>{scene.icon}</span>
                    <span className="text-sm text-left">{scene.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">生成提示词</label>
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={4}
                placeholder="请输入图片描述，例如：工业机器人在现代化智能工厂中工作，高清，专业摄影风格"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">图片尺寸</label>
              <div className="grid grid-cols-3 gap-2">
                {imageSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
                      selectedSize === size.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerateImage}
          disabled={!selectedImageScene || !imagePrompt}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-xl hover:bg-purple-700 transition-colors disabled:bg-gray-300"
        >
          <Image className="w-5 h-5" />
          <span>生成图片</span>
        </button>
      </div>

      {/* 右侧：图片生成历史 */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">图片生成历史</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">查看全部</button>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            {generatedImages.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  {image.status === 'completed' ? (
                    <img
                      src={image.thumbnail}
                      alt={image.scene}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />
                    </div>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{image.scene}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">{image.prompt}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
