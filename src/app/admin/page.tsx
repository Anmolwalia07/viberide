import { AdminLoginForm } from '@/components/AdminLoginForm';

export default function Admin() {
	return (
		<main className="pt-28">
			<div className="container section">
				<div className="eyebrow">Private operations</div>
				<h1 className="serif mt-5 max-w-3xl text-6xl md:text-8xl">Admin sign in.</h1>
				<p className="mt-6 max-w-xl text-neutral-400">
					Use the Supabase Auth account that has been added to the administrators table.
				</p>
				<div className="mt-10"><AdminLoginForm /></div>
			</div>
		</main>
	);
}
