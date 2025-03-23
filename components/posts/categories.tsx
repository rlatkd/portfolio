import Link from 'next/link';

interface CategoriesProps {
  categories: string[];
  selectedCategory?: string;
}

export default function Categories({ categories, selectedCategory }: CategoriesProps) {
  return (
    <div className='flex flex-wrap gap-3 mt-10 mb-10 items-center text-center'>
      <Link
        href="/posts"
        className={`border border-gray-200 rounded-3xl px-4 py-2 min-w-20 ${!selectedCategory ? 'bg-black text-white font-extrabold' : 'bg-gray-200 text-gray-500 font-semibold'}`}
      >
        ALL
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`?category=${category}`}
          className={`border border-gray-200 rounded-3xl px-4 py-2 min-w-20 ${selectedCategory === category ? 'bg-black text-white font-extrabold' : 'bg-gray-200 text-gray-500 font-semibold'}`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
