import Link from 'next/link';
import { listingUrl } from '@/shared/lib/post-listing';

interface CategoriesProps {
  categories: string[];
  selectedCategory: string;
  search?: string;
}

const pill = (on: boolean) =>
  `rounded-md border px-3 py-1 font-code text-xs transition-colors ${
    on
      ? 'border-tab bg-surface-2 text-fg-strong'
      : 'border-line text-muted hover:border-accent hover:text-accent'
  }`;

export default function Categories({ categories, selectedCategory, search }: CategoriesProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      <Link href={listingUrl(1, undefined, search)} className={pill(!selectedCategory)}>
        All
      </Link>
      {categories.map((category) => (
        <Link key={category} href={listingUrl(1, category, search)} className={pill(selectedCategory === category)}>
          {category}
        </Link>
      ))}
    </div>
  );
}
