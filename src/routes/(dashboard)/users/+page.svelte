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
		},
		{
			id: 'USR008',
			name: 'Alice Wambui',
			email: 'alice.wambui@email.com',
			role: 'Exporter',
			status: 'Active',
			joinDate: '2024-03-15',
			location: 'Nairobi County',
			phone: '+254 789 012 345'
		},
		{
			id: 'USR009',
			name: 'Robert Kiprotich',
			email: 'robert.kiprotich@email.com',
			role: 'Farmer',
			status: 'Pending',
			joinDate: '2024-04-10',
			location: 'Kericho County',
			phone: '+254 790 123 456'
		},
		{
			id: 'USR010',
			name: "Margaret Nyong'o",
			email: 'margaret.nyongo@email.com',
			role: 'Agricultural Officer',
			status: 'Active',
			joinDate: '2024-02-14',
			location: 'Kisumu County',
			phone: '+254 701 234 567'
		}
	]);

	// State for managing dropdowns and filters
	let activeDropdown: string | null = $state(null);
	let searchQuery: string = $state('');
	let selectedRole: string = $state('All Roles');
	let isRoleDropdownOpen: boolean = $state(false);

	// Available roles for filtering
	const roles = ['All Roles', 'Farmers', 'Buyers', 'Exporters', 'Officers'];

	// Role mapping to match user data
	const roleMapping: Record<string, string[]> = {
		'All Roles': [],
		Farmers: ['Farmer'],
		Buyers: ['Cooperative Manager', 'Market Vendor'],
		Exporters: ['Exporter'],
		Officers: ['Agricultural Officer']
	};

	// Filtered users based on search and role
	let filteredUsers = $derived.by(() => {
		let filtered = users;

		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(user) =>
					user.name.toLowerCase().includes(query) ||
					user.email.toLowerCase().includes(query) ||
					user.id.toLowerCase().includes(query) ||
					user.location.toLowerCase().includes(query)
			);
		}

		// Filter by role
		if (selectedRole !== 'All Roles') {
			const allowedRoles = roleMapping[selectedRole] || [];
			if (allowedRoles.length > 0) {
				filtered = filtered.filter((user) => allowedRoles.includes(user.role));
			}
		}

		return filtered;
	});

	// Toggle dropdown for specific user
	function toggleDropdown(userId: string) {
		activeDropdown = activeDropdown === userId ? null : userId;
	}

	// Toggle role dropdown
	function toggleRoleDropdown() {
		isRoleDropdownOpen = !isRoleDropdownOpen;
	}

	// Select role and close dropdown
	function selectRole(role: string) {
		selectedRole = role;
		isRoleDropdownOpen = false;
	}

	// Close dropdown when clicking outside
	function closeDropdown() {
		activeDropdown = null;
		isRoleDropdownOpen = false;
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
		return date.toLocaleDateString('en-KE', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bg-background min-h-screen flex-1 p-6" onclick={closeDropdown}>
	<div class="max-w-8xl mx-auto">
		<!-- Page Header with Search and Filter -->
		<div class="mb-8">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<!-- Search and Filter Controls -->
				<div class="flex flex-col gap-3 sm:flex-row sm:items-center">
					<!-- Search Input -->
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<i class="bi-search text-text/40"></i>
						</div>
						<input
							type="text"
							bind:value={searchQuery}
							placeholder="Search users..."
							class="border-border placeholder-text/40 focus:ring-primary/20 focus:border-primary block w-full rounded-md border bg-white py-3 pr-3 pl-10 text-sm leading-5 focus:ring-2 focus:outline-none"
						/>
					</div>

					<!-- Role Filter Dropdown -->
					<div class="relative">
						<button
							onclick={(e) => {
								e.stopPropagation();
								toggleRoleDropdown();
							}}
							class="text-text border-border hover:bg-background focus:ring-primary/20 focus:border-primary flex w-full items-center justify-between rounded-md border bg-white px-4 py-2 text-sm font-medium focus:ring-2 focus:outline-none sm:w-40"
						>
							<span>{selectedRole}</span>
							<i
								class={`bi-chevron-down ml-2 text-lg transition-transform duration-100 ${
									isRoleDropdownOpen ? 'rotate-180' : ''
								}`}
							></i>
						</button>

						{#if isRoleDropdownOpen}
							<div
								class="border-border absolute right-0 z-20 mt-2 w-full rounded-md border bg-white shadow-lg sm:w-48"
							>
								<div class="py-1">
									{#each roles as role}
										<button
											onclick={(e) => {
												e.stopPropagation();
												selectRole(role);
											}}
											class={`w-full px-4 py-2 text-left text-sm transition-colors duration-150 ${
												selectedRole === role
													? 'bg-primary/10 text-primary font-medium'
													: 'text-text hover:bg-background'
											}`}
										>
											<div class="flex items-center">
												{#if selectedRole === role}
													<svg
														class="text-primary mr-2 h-4 w-4"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path
															fill-rule="evenodd"
															d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
															clip-rule="evenodd"
														/>
													</svg>
												{:else}
													<span class="mr-6"></span>
												{/if}
												{role}
											</div>
										</button>
									{/each}
								</div>
							</div>
						{/if}
					</div>

					<!-- Add User Button -->
					<!-- <button
						class="bg-primary hover:bg-primary-dark focus:ring-primary flex items-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors duration-150 focus:ring-2 focus:ring-offset-2 focus:outline-none"
					>
						<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
						</svg>
						Add User
					</button> -->
				</div>
			</div>
		</div>

		<!-- Users Table -->
		<div class="border-border overflow-hidden rounded-lg border bg-white">
			<!-- Table Header -->
			<div class="border-border border-b bg-white px-6 py-4">
				<h2 class="text-primary-dark text-2xl font-bold">Users ({filteredUsers.length})</h2>
				<p class="text-text/70 mt-1">Manage all platform users</p>
				<p class="text-text/90 mt-1 text-sm">
					{#if searchQuery || selectedRole !== 'All Roles'}
						Showing {filteredUsers.length} of {users.length} users
						{#if searchQuery}
							matching "{searchQuery}"
						{/if}
						{#if selectedRole !== 'All Roles'}
							in {selectedRole}
						{/if}
					{:else}
						Total: {users.length} users
					{/if}
				</p>
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
						{#if filteredUsers.length === 0}
							<tr>
								<td colspan="8" class="px-6 py-12 text-center">
									<div class="flex flex-col items-center">
										<svg
											class="text-text/30 mx-auto h-12 w-12"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="1"
												d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
											/>
										</svg>
										<h3 class="text-text mt-2 text-sm font-medium">No users found</h3>
										<p class="text-text/70 mt-1 text-sm">
											{#if searchQuery || selectedRole !== 'All Roles'}
												Try adjusting your search or filter criteria.
											{:else}
												Get started by adding a new user.
											{/if}
										</p>
									</div>
								</td>
							</tr>
						{/if}
						{#each filteredUsers as user}
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
					<span>
						{#if searchQuery || selectedRole !== 'All Roles'}
							Showing {filteredUsers.length} of {users.length} users
						{:else}
							Showing all {users.length} users
						{/if}
					</span>
					<div class="flex space-x-4">
						<span>Active: {filteredUsers.filter((u) => u.status === 'Active').length}</span>
						<span>Pending: {filteredUsers.filter((u) => u.status === 'Pending').length}</span>
						<span>Inactive: {filteredUsers.filter((u) => u.status === 'Inactive').length}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
