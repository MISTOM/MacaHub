<script lang="ts">
	// Admin panel sidebar component
	import { page } from '$app/state';

	let { menuItems = [] } = $props();

	// Updated classes to create the "spill" effect for active items
	let activeMenuItemsClass =
		'bg-background text-primary-dark rounded-l-2xl px-4 py-2 transition-colors duration-75';
	let menuItemsClass =
		'hover:bg-background hover:text-primary-dark rounded-2xl rounded-r-none px-4 py-2 transition-colors duration-75';

	menuItems = [
		{ name: 'Home', icon: 'bi-house', path: '/' },
		{ name: 'Users', icon: 'bi-people', path: '/users' },
		{ name: 'Listings', icon: 'bi-grid-3x3-gap', path: '/listings' },
		{ name: 'Settings', icon: 'bi-gear', path: '/settings' },
		{ name: 'Logout', icon: 'bi-box-arrow-right', path: '/logout' }
	];
</script>

<div class="bg-primary absolute top-0 left-0 h-full w-64 rounded-r-md text-white">
	<h1>
		<a href="/" class="block p-4 text-2xl font-bold">Dashboard</a>
	</h1>
	<nav class="mt-4">
		<ul class="space-y-3 pr-0">
			{#each menuItems as item}
				<li>
					<a
						href={item.path}
						class={`flex items-center ${page.url.pathname === item.path ? activeMenuItemsClass : menuItemsClass}`}
					>
						<i class={`${item.icon} mr-3`}></i>
						<span>{item.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>
