<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/Components/Sidebar.svelte';
	import { page } from '$app/state';

	let menuItems = $state([
		{ name: 'Home', icon: 'bi-house', path: '/' },
		{ name: 'Dashboard', icon: 'bi-speedometer2', path: '/dashboard' },
		{ name: 'Analytics', icon: 'bi-graph-up', path: '/analytics' },
		{ name: 'Users', icon: 'bi-people', path: '/users' },
		{ name: 'Listings', icon: 'bi-grid-3x3-gap', path: '/listings' },
		{ name: 'Posts', icon: 'bi bi-book', path: '/posts' },
		{ name: 'Settings', icon: 'bi-gear', path: '/settings' },
	]);

	let { children } = $props();
	let sidebarCollapsed = $state(false);
	// Get the current page title based on URL path
	let currentTitle = $derived(
		menuItems.find((item) => item.path === page.url.pathname)?.name || ''
	);
</script>

<div class="bg-background flex h-screen">
	<Sidebar bind:isSidebarCollapsed={sidebarCollapsed} {menuItems} />

	<main class="flex-1 transition-all duration-200 {sidebarCollapsed ? 'ml-0' : 'ml-64'}">
		<header class="max-w-8xl flex items-center justify-between p-4 shadow-md">
			<h1 class="text-primary-dark mb-2 text-3xl font-bold">{currentTitle}</h1>
			<div>
				<div class="flex items-center gap-4">
					<button
						class="text-primary-dark border-border h-10 w-10 cursor-pointer rounded-sm border transition-colors hover:bg-gray-200"
					>
						<i class="bi-bell"></i>
						<span class="sr-only">Notifications</span>
					</button>
					<button
						class="text-primary-dark border-border h-10 w-10 cursor-pointer rounded-sm border transition-colors hover:bg-gray-200"
					>
						<i class="bi-gear"></i>
						<span class="sr-only">Settings</span>
					</button>
				</div>
			</div>
		</header>
		{@render children()}
	</main>
</div>
