export function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="eyebrow">{eyebrow}</div>

      <h2 className="serif mt-4 text-4xl leading-tight md:text-6xl">
        {title}
      </h2>

      {body && (
        <p className="mt-5 leading-7 text-neutral-400">
          {body}
        </p>
      )}
    </div>
  );
}
