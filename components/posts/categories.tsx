import Link from 'next/link';

interface CategoriesProps {
  categories: string[];
  selectedCategory?: string;
}

export default function Categories({ categories, selectedCategory }: CategoriesProps) {
  return (
    <div className='flex flex-wrap gap-3 items-center justify-center'>
      <Link
        href="/posts"
        className={`px-4 py-2 min-w-20 transition-all duration-300 rounded-full text-center ${
          !selectedCategory 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold' 
            : 'border border-blue-500/20 hover:border-blue-500/50 text-white/70 hover:text-white'
        }`}
      >
        ALL
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`?category=${category}`}
          className={`px-4 py-2 min-w-20 transition-all duration-300 rounded-full text-center ${
            selectedCategory === category 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold' 
              : 'border border-blue-500/20 hover:border-blue-500/50 text-white/70 hover:text-white'
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
