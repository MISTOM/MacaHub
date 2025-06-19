<script lang="ts">
	// Admin panel sidebar component
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let { menuItems = [], isSidebarCollapsed = $bindable(false) } = $props();

	// Reason: Calculate sidebar width dynamically for smooth transitions
	let sidebarWidth = $derived(isSidebarCollapsed ? 0 : 256); // 64 * 4 = 256px (w-64)
	// Updated classes to create the "spill" effect for active items
	let activeMenuItemsClass =
		'bg-background text-primary-dark rounded-l-2xl px-4 py-2 transition-colors duration-75';
	let menuItemsClass =
		'hover:bg-background hover:text-primary-dark rounded-2xl rounded-r-none px-4 py-2 transition-colors duration-75';

	// Reason: State to control profile popup visibility
	let isProfilePopupOpen = $state(false);

	let user = {
		name: 'John Kim',
		phone: '+1234567890',
		email: 'johndoe@gmail.com'
	};

	// Reason: Close popup when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (!isProfilePopupOpen) return;
		const target = event.target as HTMLElement;
		if (!target.closest('.profile-section') && !target.closest('.profile-popup')) {
			isProfilePopupOpen = false;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

<!-- Maximize button when sidebar is collapsed -->
{#if isSidebarCollapsed}
	<button
		onclick={() => (isSidebarCollapsed = false)}
		class="bg-primary/30 hover:bg-primary/80 fixed top-4 left-4 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm text-white shadow-xl"
		in:fade={{ delay: 150, duration: 200 }}
	>
		<i class="bi bi-layout-sidebar-inset"></i>
		<span class="sr-only">Expand sidebar</span>
	</button>
{/if}

<!-- Sidebar container -->
{#if !isSidebarCollapsed}
	<div
		class="text-text fixed top-0 left-0 z-40 flex h-full w-64 flex-col justify-between rounded-r-sm bg-white"
		in:fly={{ x: -256, duration: 200, easing: quintOut }}
		out:fly={{ x: -256, duration: 200, easing: quintOut }}
	>
		<div>
			<div class="flex items-center justify-between p-4">
				<h1>
					<a href="/" class="flex items-center text-2xl font-bold">Dashboard</a>
				</h1>
				<button
					onclick={() => (isSidebarCollapsed = !isSidebarCollapsed)}
					class="text-text/70 hover:text-text cursor-pointer"
					title="Collapse sidebar"
				>
					<i class="bi bi-layout-sidebar-inset"></i>
					<span class="sr-only">Collapse sidebar</span>
				</button>
			</div>
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

		<!-- Profile section with popup -->
		<div class="relative">
			<!-- Profile popup -->
			{#if isProfilePopupOpen}
				<div
					class="profile-popup absolute right-4 bottom-full left-4 z-50 mb-2 rounded-lg border border-gray-200 bg-white shadow-lg"
					in:fly={{ y: 20, duration: 200 }}
					out:fly={{ y: 20, duration: 150 }}
				>
					<!-- User info header -->
					<div class="flex items-center border-b border-gray-100 p-4">
						<div class="bg-accent flex h-10 w-10 items-center justify-center rounded-full">
							<span class="text-sm font-medium text-white">
								{user.name
									.split(' ')
									.map((n) => n[0])
									.join('')}
							</span>
						</div>
						<div class="ml-3">
							<div class="text-sm font-medium text-gray-900">{user.name}</div>
							<div class="text-xs text-gray-500">{user.email}</div>
						</div>
					</div>

					<!-- Menu items -->
					<div class="py-1">
						<button
							class="flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
						>
							<i class="bi bi-gear mr-3 text-gray-400"></i>
							Account Settings
						</button>
						<button
							class="flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
						>
							<i class="bi bi-bell mr-3 text-gray-400"></i>
							Notifications
						</button>
						<button
							class="mt-1 flex w-full items-center border-t border-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
						>
							<i class="bi bi-box-arrow-right mr-3 text-gray-400"></i>
							Log out
						</button>
					</div>
				</div>
			{/if}

			<!-- Clickable profile section -->
			<button
				class="profile-section border-border/20 flex w-full items-center border-t px-4 py-3 transition-colors hover:bg-gray-50"
				onclick={() => (isProfilePopupOpen = !isProfilePopupOpen)}
			>
				<div class="h-8 w-8 flex-shrink-0">
					<div class="bg-accent flex h-8 w-8 items-center justify-center rounded-full">
						<span class="font-medium text-white">
							{user.name
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</span>
					</div>
				</div>
				<div class="ml-3 flex-1 text-left">
					<div class="text-sm font-medium">{user.name}</div>
					<div class="text-sm">
						<span class="text-gray-500">{user.email}</span>
					</div>
				</div>
				<!-- Chevron icon -->
				<i
					class="bi bi-chevron-up text-gray-400 transition-transform duration-200 {isProfilePopupOpen
						? 'rotate-180'
						: ''}"
				></i>
			</button>
		</div>
	</div>
{/if}
