import Link from 'next/link';
import { Tag } from 'lucide-react';

interface CategoriesProps {
  categories: string[];
  selectedCategory?: string;
}

export default function Categories({ categories, selectedCategory }: CategoriesProps) {
  return (
    <div className='flex flex-wrap gap-3 items-center justify-center relative'>
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="relative z-10 flex flex-wrap gap-3 items-center justify-center">
        <Link
          href="/posts"
          className={`px-5 py-2.5 min-w-24 transition-all duration-300 rounded-full text-center backdrop-blur-sm flex items-center justify-center ${
            !selectedCategory 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-md shadow-blue-500/20' 
              : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-[0.5px] border-white/10 hover:border-white/20 shadow-sm shadow-white/5'
          }`}
        >
          <Tag className={`w-4 h-4 mr-2 ${!selectedCategory ? '' : 'opacity-70 group-hover:opacity-100'}`} />
          ALL
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`?category=${category}`}
            className={`px-5 py-2.5 min-w-24 transition-all duration-300 rounded-full text-center backdrop-blur-sm flex items-center justify-center group ${
              selectedCategory === category 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-md shadow-blue-500/20' 
                : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-[0.5px] border-white/10 hover:border-white/20 shadow-sm shadow-white/5'
            }`}
          >
            <Tag className={`w-4 h-4 mr-2 ${selectedCategory === category ? '' : 'opacity-70 group-hover:opacity-100'}`} />
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
