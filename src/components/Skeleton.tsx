export function Skeleton({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`skeleton ${className}`} />;
}

export function PageSkeleton({ type = 'cards' }: { type?: 'cards' | 'detail' | 'booking' }) {
  return <main className="pt-28"><div className="container section"><Skeleton className="h-3 w-24" /><Skeleton className="mt-6 h-20 w-full max-w-3xl md:h-28" /><Skeleton className="mt-6 h-5 w-full max-w-xl" />{type === 'booking' ? <BookingSkeleton /> : type === 'detail' ? <DetailSkeleton /> : <CardSkeleton />}</div></main>;
}

function CardSkeleton() {
  return <div className="mt-16 grid gap-5 md:grid-cols-3">{[1, 2, 3].map((item) => <div className="card p-5" key={item}><Skeleton className="aspect-[4/3] w-full" /><Skeleton className="mt-6 h-3 w-20" /><Skeleton className="mt-4 h-8 w-3/4" /><Skeleton className="mt-4 h-4 w-full" /><Skeleton className="mt-2 h-4 w-5/6" /></div>)}</div>;
}

function DetailSkeleton() {
  return <div className="mt-14 grid gap-6 md:grid-cols-3">{[1, 2, 3].map((item) => <div className="card p-7" key={item}><Skeleton className="h-3 w-8" /><Skeleton className="mt-8 h-8 w-2/3" /><Skeleton className="mt-4 h-4 w-full" /><Skeleton className="mt-2 h-4 w-5/6" /></div>)}</div>;
}

function BookingSkeleton() {
  return <div className="card mt-14 p-6 md:p-10"><div className="flex justify-between"><Skeleton className="h-3 w-36" /><Skeleton className="h-3 w-20" /></div><Skeleton className="mt-6 h-1 w-full" /><div className="mt-10 grid gap-5 sm:grid-cols-2">{[1, 2, 3, 4, 5, 6].map((item) => <Skeleton className="h-16 w-full" key={item} />)}</div></div>;
}

export function ListSkeleton() {
  return <div className="mt-10 grid gap-4">{[1, 2, 3].map((item) => <div className="card grid gap-4 p-6 md:grid-cols-[1fr_auto]" key={item}><div><Skeleton className="h-3 w-32" /><Skeleton className="mt-4 h-8 w-48" /><Skeleton className="mt-3 h-4 w-full max-w-xl" /></div><Skeleton className="h-12 w-32" /></div>)}</div>;
}