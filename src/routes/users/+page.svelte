<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// User interface
	interface User {
		id: string;
		name: string;
		email: string;
		role: string;
		status: 'Active' | 'Inactive' | 'Pending';
		joinDate: string;
		location: string;
		phone: string;
	}

	// Hardcoded users data - will be replaced with API call
	let users: User[] = $state([
		{
			id: 'USR001',
			name: 'John Kamau',
			email: 'john.kamau@email.com',
			role: 'Farmer',
			status: 'Active',
			joinDate: '2024-01-15',
			location: 'Kiambu County',
			phone: '+254 712 345 678'
		},
		{
			id: 'USR002',
			name: 'Mary Wanjiku',
			email: 'mary.wanjiku@email.com',
			role: 'Cooperative Manager',
			status: 'Active',
			joinDate: '2024-02-20',
			location: 'Nyeri County',
			phone: '+254 723 456 789'
		},
		{
			id: 'USR003',
			name: 'Peter Ochieng',
			email: 'peter.ochieng@email.com',
			role: 'Market Vendor',
			status: 'Pending',
			joinDate: '2024-03-10',
			location: 'Kisumu County',
			phone: '+254 734 567 890'
		},
		{
			id: 'USR004',
			name: 'Grace Akinyi',
			email: 'grace.akinyi@email.com',
			role: 'Farmer',
			status: 'Active',
			joinDate: '2024-01-28',
			location: 'Homa Bay County',
			phone: '+254 745 678 901'
		},
		{
			id: 'USR005',
			name: 'David Mwangi',
			email: 'david.mwangi@email.com',
			role: 'Agricultural Officer',
			status: 'Active',
			joinDate: '2023-11-12',
			location: 'Meru County',
			phone: '+254 756 789 012'
		},
		{
			id: 'USR006',
			name: 'Sarah Njeri',
			email: 'sarah.njeri@email.com',
			role: 'Farmer',
			status: 'Inactive',
			joinDate: '2024-02-05',
			location: 'Nakuru County',
			phone: '+254 767 890 123'
		},
		{
			id: 'USR007',
			name: 'James Kipkoech',
			email: 'james.kipkoech@email.com',
			role: 'Market Vendor',
			status: 'Active',
			joinDate: '2024-04-01',
			location: 'Uasin Gishu County',
			phone: '+254 778 901 234'
		}
	]);

	// State for managing dropdowns
	let activeDropdown: string | null = $state(null);

	// Toggle dropdown for specific user
	function toggleDropdown(userId: string) {
		activeDropdown = activeDropdown === userId ? null : userId;
	}

	// Close dropdown when clicking outside
	function closeDropdown() {
		activeDropdown = null;
	}

	// Handle user actions
	function manageUser(user: User) {
		console.log('Managing user:', user);
		// TODO: Implement user management modal/page
		activeDropdown = null;
	}

	function deleteUser(user: User) {
		console.log('Deleting user:', user);
		// TODO: Implement delete confirmation and API call
		users = users.filter((u) => u.id !== user.id);
		activeDropdown = null;
	}

	// Get status badge class
	function getStatusClass(status: string): string {
		switch (status) {
			case 'Active':
				return 'bg-success/5 text-success';
			case 'Inactive':
				return 'bg-error/5 text-error';
			case 'Pending':
				return 'bg-warning/5 text-warning';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}

	// Format date
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bg-background ml-64 min-h-screen flex-1 p-8" onclick={closeDropdown}>
	<div class="max-w-8xl mx-auto">
		<!-- Page Header -->
		<div class="mb-8">
			<h1 class="text-primary-dark mb-2 text-3xl font-bold">User Management</h1>
			<p class="text-text">Manage platform users, farmers, and market vendors</p>
		</div>

		<!-- Users Table -->
		<div class="border-border overflow-hidden rounded-lg border bg-white">
			<!-- Table Header -->
			<div class="border-border border-b bg-white px-6 py-4">
				<h2 class="text-text text-lg font-semibold">All Users</h2>
				<p class="text-text/90 mt-1 text-sm">Total: {users.length} users</p>
			</div>

			<!-- Table -->
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="border-border bg-background border-b">
						<tr>
							<th
								class="text-text/70 px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
							>
								User ID
							</th>
							<th
								class="text-text/70 px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
							>
								Name
							</th>
							<th
								class="text-text/70 px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
							>
								Email
							</th>
							<th
								class="text-text/70 px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
							>
								Role
							</th>
							<th
								class="text-text/70 px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
							>
								Status
							</th>
							<th
								class="text-text/70 px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
							>
								Location
							</th>
							<th
								class="text-text/70 px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
							>
								Join Date
							</th>
							<th
								class="text-text/70 px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
							>
								Actions
							</th>
						</tr>
					</thead>
					<tbody class="divide-border divide-y bg-white">
						{#each users as user}
							<tr class="hover:bg-background transition-colors duration-100">
								<td class="text-primary-dark px-6 py-4 text-sm font-medium whitespace-nowrap">
									{user.id}
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<div class="h-8 w-8 flex-shrink-0">
											<div class="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
												<span class="text-xs font-medium text-white">
													{user.name
														.split(' ')
														.map((n) => n[0])
														.join('')}
												</span>
											</div>
										</div>
										<div class="ml-3">
											<div class="text-text text-sm font-medium">{user.name}</div>
											<div class="text-text/70 text-sm">
												<a
													href={`tel:${user.phone.replace(/\s+/g, '')}`}
													class="hover:text-primary hover:underline"
												>
													{user.phone}
												</a>
											</div>
										</div>
									</div>
								</td>
								<td class="text-text px-6 py-4 text-sm whitespace-nowrap">
									<a href={`mailto:${user.email}`} class="hover:text-primary hover:underline">
										{user.email}
									</a>
								</td>
								<td class="text-text px-6 py-4 text-sm whitespace-nowrap">
									{user.role}
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span
										class={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusClass(user.status)}`}
									>
										{user.status}
									</span>
								</td>
								<td class="text-text px-6 py-4 text-sm whitespace-nowrap">
									{user.location}
								</td>
								<td class="text-text px-6 py-4 text-sm whitespace-nowrap">
									{formatDate(user.joinDate)}
								</td>
								<td class="text-text/70 px-6 py-4 text-sm whitespace-nowrap">
									<div class="relative">
										<button
											onclick={(e) => {
												e.stopPropagation();
												toggleDropdown(user.id);
											}}
											class="hover:bg-background rounded-full p-2 transition-colors duration-150"
											aria-label="User actions"
										>
											<i class="bi-three-dots-vertical text-text/60"></i>
										</button>

										{#if activeDropdown === user.id}
											<div
												class="border-border absolute right-0 z-10 mt-2 w-48 rounded-md border bg-white shadow-lg"
											>
												<div class="py-1">
													<button
														onclick={(e) => {
															e.stopPropagation();
															manageUser(user);
														}}
														class="text-text hover:bg-background hover:text-primary flex w-full items-center px-4 py-2 text-left text-sm transition-colors duration-150"
													>
														<i class="bi-gear text-text/60 mr-3"></i>
														Manage User
													</button>
													<button
														onclick={(e) => {
															e.stopPropagation();
															deleteUser(user);
														}}
														class="text-error hover:bg-error/10 flex w-full items-center px-4 py-2 text-left text-sm transition-colors duration-150"
													>
														<i class="bi-trash text-error mr-3"></i>
														Delete User
													</button>
												</div>
											</div>
										{/if}
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Table Footer with Summary -->
			<div class="border-border bg-background border-t px-6 py-4">
				<div class="text-text/80 flex items-center justify-between text-sm">
					<span>Showing all {users.length} users</span>
					<div class="flex space-x-4">
						<span>Active: {users.filter((u) => u.status === 'Active').length}</span>
						<span>Pending: {users.filter((u) => u.status === 'Pending').length}</span>
						<span>Inactive: {users.filter((u) => u.status === 'Inactive').length}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
