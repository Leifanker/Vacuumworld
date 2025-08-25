export default function ReviewTOC() {
  const items = [
    ["quick-verdict", "Quick verdict"],
    ["how-we-tested", "How we tested"],
    ["benefits", "Benefits"],
    ["pros-cons", "Pros/Cons"],
    ["comparisons", "Comparisons"],
    ["objections", "Objections"],
    ["faq", "FAQ"],
    ["final-verdict", "Final verdict"],
  ];
  return (
    <nav className="mt-4 flex flex-wrap gap-2">
      {items.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          className="text-xs md:text-sm px-3 py-1 rounded-full border border-violet-200 bg-violet-50 text-violet-700 hover:border-violet-300"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
