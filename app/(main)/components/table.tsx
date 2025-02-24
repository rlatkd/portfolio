export function Table({ headings }) {
    return (
      <nav className="text-sm">
        <h2 className="font-semibold text-lg mb-2">목차</h2>
        <ul className="space-y-1">
          {headings.map(({ level, text, id }) => (
            <li key={id} className={`ml-${(level - 1) * 2}`}>
              <a href={`#${id}`} className="text-blue-500 hover:underline">
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }