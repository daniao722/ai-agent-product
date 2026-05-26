import { useState } from 'react';
import {
  Video,
  Download,
  Trash2,
  RefreshCw,
  Play,
} from 'lucide-react';
import { videoScenes } from '../../data/websites';

interface GeneratedVideo {
  id: string;
  scene: string;
  title: string;
  duration: string;
  thumbnail: string;
  createdAt: string;
  status: 'generating' | 'completed';
}

const mockGeneratedVideos: GeneratedVideo[] = [
  { id: '1', scene: '产品演示视频', title: '智能机器人功能演示', duration: '1:23', thumbnail: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=robot%20product%20demo%20video%20thumbnail&image_size=landscape_16_9', createdAt: '2026-05-20 10:00', status: 'completed' },
];

export default function AIVideoCreator() {
  const [generatedVideos, setGeneratedVideos] = useState<GeneratedVideo[]>(mockGeneratedVideos);
  const [videoTitle, setVideoTitle] = useState('');
  const [selectedVideoScene, setSelectedVideoScene] = useState('');
  const [videoScript, setVideoScript] = useState('');

  const handleGenerateVideo = () => {
    if (!selectedVideoScene || !videoTitle || !videoScript) return;
    const scene = videoScenes.find(s => s.id === selectedVideoScene);
    const newVideo: GeneratedVideo = {
      id: Date.now().toString(),
      scene: scene?.name || '',
      title: videoTitle,
      duration: scene?.duration || '1分钟',
      thumbnail: `https://neeko-copilot.bytedance.net/api/text2image?prompt=${encodeURIComponent(videoTitle + ' video thumbnail')}&image_size=landscape_16_9`,
      createdAt: new Date().toLocaleString(),
      status: 'generating'
    };
    setGeneratedVideos([newVideo, ...generatedVideos]);
    setTimeout(() => {
      setGeneratedVideos(prev => prev.map(vid =>
        vid.id === newVideo.id ? { ...vid, status: 'completed' as const } : vid
      ));
    }, 5000);
    setVideoTitle('');
    setVideoScript('');
    setSelectedVideoScene('');
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm('确定要删除吗？')) {
      setGeneratedVideos(generatedVideos.filter(vid => vid.id !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 左侧：视频场景选择 + 标题 + 脚本 */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-gray-50 rounded-xl p-5">
          <h3 className="font-semibold text-gray-800 mb-4">AI视频创作</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">视频场景</label>
              <div className="space-y-2">
                {videoScenes.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => setSelectedVideoScene(scene.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      selectedVideoScene === scene.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{scene.icon}</span>
                      <span className="text-sm text-left">{scene.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{scene.duration}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">视频标题</label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="输入视频标题"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">视频脚本</label>
              <textarea
                value={videoScript}
                onChange={(e) => setVideoScript(e.target.value)}
                rows={4}
                placeholder="请输入视频脚本或描述..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerateVideo}
          disabled={!selectedVideoScene || !videoTitle || !videoScript}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition-colors disabled:bg-gray-300"
        >
          <Video className="w-5 h-5" />
          <span>生成视频</span>
        </button>
      </div>

      {/* 右侧：视频生成历史 */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">视频生成历史</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">查看全部</button>
          </div>
          <div className="p-4 space-y-4">
            {generatedVideos.map((video) => (
              <div key={video.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="relative w-32 h-18 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                  {video.status === 'completed' ? (
                    <>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-800">{video.title}</p>
                    <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">{video.scene}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">时长: {video.duration}</span>
                    <span className="text-sm text-gray-500">{video.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteVideo(video.id)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
