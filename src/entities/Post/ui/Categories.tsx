import Link from 'next/link';
import { Tag } from 'lucide-react';

interface CategoriesProps {
  categories: string[];
  selectedCategory: string;
}

export default function Categories({ categories, selectedCategory }: CategoriesProps) {
  return (
    <div className='flex flex-wrap gap-3 items-center justify-center relative'>
      <div className='relative z-10 flex flex-wrap gap-3 items-center justify-center'>
        <Link
          href='/posts'
          className={`px-5 py-2.5 min-w-24 transition-colors duration-300 rounded-full text-center font-mono text-sm flex items-center justify-center ${
            !selectedCategory
              ? 'bg-navy text-cream font-medium'
              : 'border border-line bg-surface-2 text-fg hover:border-accent hover:text-accent'
          }`}
        >
          <Tag className={`w-4 h-4 mr-2 ${!selectedCategory ? '' : 'opacity-70 group-hover:opacity-100'}`} />
          ALL
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`?category=${category}`}
            className={`px-5 py-2.5 min-w-24 transition-colors duration-300 rounded-full text-center font-mono text-sm flex items-center justify-center group ${
              selectedCategory === category
                ? 'bg-navy text-cream font-medium'
                : 'border border-line bg-surface-2 text-fg hover:border-accent hover:text-accent'
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
