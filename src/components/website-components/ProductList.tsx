'use client';

import { cn } from '@/lib/utils';

interface ProductListProps {
  title?: string;
  className?: string;
  isEditable?: boolean;
  onEdit?: (key: string, value: any) => void;
}

const sampleProducts = [
  { id: 1, name: '产品一', desc: '高品质产品，值得信赖', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400' },
  { id: 2, name: '产品二', desc: '创新设计，引领潮流', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { id: 3, name: '产品三', desc: '优质服务，客户至上', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400' },
];

export function ProductList({ 
  title = '我们的产品', 
  className,
  isEditable = false,
  onEdit 
}: ProductListProps) {
  return (
    <section className={cn('py-16 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleProducts.map((product) => (
            <div key={product.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600">
                  {product.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
