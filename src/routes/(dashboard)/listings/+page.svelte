<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Listing interface
	interface Listing {
		id: string;
		title: string;
		productImage: string;
		quantityKg: number;
		pricePerKg: number;
		description: string;
		deliveryMethods: string[];
		status: 'Pending' | 'Approved' | 'Rejected' | 'Draft';
		farmerName: string;
		farmerLocation: string;
		dateCreated: string;
		category: string;
	}

	// Hardcoded listings data - will be replaced with API call
	let listings: Listing[] = $state([
		{
			id: 'LST001',
			title: 'Fresh Organic Tomatoes',
			productImage:
				'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=150&h=150&fit=crop&crop=center',
			quantityKg: 500,
			pricePerKg: 120,
			description:
				'<h3>Premium Quality Tomatoes</h3><p>Fresh, organically grown tomatoes from our farm in Kiambu. Perfect for cooking, salads, and processing. Harvested daily to ensure maximum freshness.</p><ul><li>100% Organic</li><li>No pesticides used</li><li>Rich in vitamins and minerals</li></ul>',
			deliveryMethods: ['Farm Pickup', 'Local Delivery', 'County Transport'],
			status: 'Approved',
			farmerName: 'John Kamau',
			farmerLocation: 'Kiambu County',
			dateCreated: '2024-06-10',
			category: 'Vegetables'
		},
		{
			id: 'LST002',
			title: 'Grade A Maize (Corn)',
			productImage:
				'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=150&h=150&fit=crop&crop=center',
			quantityKg: 2000,
			pricePerKg: 45,
			description:
				'<h3>High Quality Yellow Maize</h3><p>Freshly harvested yellow maize, properly dried and stored. Suitable for human consumption, animal feed, and processing.</p><p><strong>Storage:</strong> Kept in dry, well-ventilated conditions.</p>',
			deliveryMethods: ['Farm Pickup', 'Wholesale Transport'],
			status: 'Approved',
			farmerName: 'Mary Wanjiku',
			farmerLocation: 'Nyeri County',
			dateCreated: '2024-06-08',
			category: 'Grains'
		},
		{
			id: 'LST003',
			title: 'Premium Coffee Beans (AA Grade)',
			productImage:
				'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop&crop=center',
			quantityKg: 100,
			pricePerKg: 850,
			description:
				'<h3>AA Grade Arabica Coffee</h3><p>Premium quality coffee beans from the highlands of Kenya. Carefully handpicked and processed using traditional methods.</p><p><em>Tasting notes: Bright acidity, wine-like flavor, full body</em></p>',
			deliveryMethods: ['Farm Pickup', 'Express Delivery', 'Export Shipping'],
			status: 'Pending',
			farmerName: 'Peter Ochieng',
			farmerLocation: 'Kisumu County',
			dateCreated: '2024-06-12',
			category: 'Beverages'
		},
		{
			id: 'LST004',
			title: 'Fresh Passion Fruits',
			productImage:
				'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=150&h=150&fit=crop&crop=center',
			quantityKg: 300,
			pricePerKg: 180,
			description:
				'<h3>Sweet Purple Passion Fruits</h3><p>Naturally ripened passion fruits with intense flavor and aroma. Perfect for juice making, desserts, and fresh consumption.</p>',
			deliveryMethods: ['Farm Pickup', 'Local Delivery'],
			status: 'Approved',
			farmerName: 'Grace Akinyi',
			farmerLocation: 'Homa Bay County',
			dateCreated: '2024-06-05',
			category: 'Fruits'
		},
		{
			id: 'LST005',
			title: 'Organic Spinach (Sukuma Wiki)',
			productImage:
				'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=150&h=150&fit=crop&crop=center',
			quantityKg: 150,
			pricePerKg: 80,
			description:
				'<h3>Fresh Leafy Greens</h3><p>Organically grown spinach, harvested fresh daily. Rich in iron, vitamins, and minerals. Perfect for traditional Kenyan dishes.</p>',
			deliveryMethods: ['Farm Pickup', 'Local Delivery'],
			status: 'Draft',
			farmerName: 'David Mwangi',
			farmerLocation: 'Meru County',
			dateCreated: '2024-06-14',
			category: 'Vegetables'
		},
		{
			id: 'LST006',
			title: 'Fresh Avocados (Hass Variety)',
			productImage:
				'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=150&h=150&fit=crop&crop=center',
			quantityKg: 800,
			pricePerKg: 220,
			description:
				'<h3>Export Quality Avocados</h3><p>Premium Hass avocados, carefully selected for size and quality. Rich, creamy texture perfect for export markets and local consumption.</p>',
			deliveryMethods: ['Farm Pickup', 'Export Shipping', 'County Transport'],
			status: 'Rejected',
			farmerName: 'Sarah Njeri',
			farmerLocation: 'Nakuru County',
			dateCreated: '2024-06-01',
			category: 'Fruits'
		}
	]);

	// State for managing dropdowns and modals
	let activeDropdown: string | null = $state(null);
	let showDescriptionModal: string | null = $state(null);

	// Toggle dropdown for specific listing
	function toggleDropdown(listingId: string) {
		activeDropdown = activeDropdown === listingId ? null : listingId;
	}

	// Close dropdown when clicking outside
	function closeDropdown() {
		activeDropdown = null;
	}

	// Handle listing actions
	function manageListing(listing: Listing) {
		console.log('Managing listing:', listing);
		// TODO: Implement listing management modal/page
		activeDropdown = null;
	}

	function deleteListing(listing: Listing) {
		console.log('Deleting listing:', listing);
		// TODO: Implement delete confirmation and API call
		listings = listings.filter((l) => l.id !== listing.id);
		activeDropdown = null;
	}

	function approveListing(listing: Listing) {
		console.log('Approving listing:', listing);
		// TODO: Implement approval API call
		const index = listings.findIndex((l) => l.id === listing.id);
		if (index !== -1) {
			listings[index].status = 'Approved';
		}
		activeDropdown = null;
	}

	// Get status badge class
	function getStatusClass(status: string): string {
		switch (status) {
			case 'Approved':
				return 'bg-green-100 text-green-800';
			case 'Pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'Rejected':
				return 'bg-red-100 text-red-800';
			case 'Draft':
				return 'bg-gray-100 text-gray-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}

	// Format currency
	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-KE', {
			style: 'currency',
			currency: 'KES',
			minimumFractionDigits: 0
		}).format(amount);
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

	// Truncate text for display
	function truncateText(text: string, maxLength: number): string {
		const plainText = text.replace(/<[^>]*>/g, ''); // Remove HTML tags
		return plainText.length > maxLength ? plainText.substring(0, maxLength) + '...' : plainText;
	}

	// Toggle description modal
	function toggleDescriptionModal(listingId: string | null) {
		showDescriptionModal = showDescriptionModal === listingId ? null : listingId;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bg-background min-h-screen flex-1 p-6" onclick={closeDropdown}>
	<div class="mx-auto max-w-8xl">
		<!-- Page Header -->
		<div class="mb-8">
			<h1 class="text-primary-dark mb-2 text-3xl font-bold">Product Listings</h1>
			<p class="text-gray-600">Manage agricultural product listings from farmers and vendors</p>
		</div>

		<!-- Listings Table -->
		<div class="border-border overflow-hidden rounded-lg border bg-white">
			<!-- Table Header -->
			<div class="border-border border-b bg-gray-50 px-6 py-4">
				<h2 class="text-primary-dark text-lg font-semibold">All Listings</h2>
				<p class="mt-1 text-sm text-gray-600">Total: {listings.length} listings</p>
			</div>

			<!-- Table -->
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="border-border border-b bg-gray-50">
						<tr>
							<th
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Product
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Farmer
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Quantity (KG)
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Price/KG
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Description
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Delivery Methods
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Status
							</th>
							<th
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Actions
							</th>
						</tr>
					</thead>
					<tbody class="divide-border divide-y bg-white">
						{#each listings as listing}
							<tr class="transition-colors duration-150 hover:bg-gray-50">
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<div class="h-12 w-12 flex-shrink-0">
											<img
												class="border-border h-12 w-12 rounded-lg border object-cover"
												src={listing.productImage}
												alt={listing.title}
												loading="lazy"
											/>
										</div>
										<div class="ml-4">
											<div class="max-w-[200px] text-sm font-medium text-gray-900">
												{listing.title}
											</div>
											<div class="text-sm text-gray-500">{listing.category}</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm font-medium text-gray-900">{listing.farmerName}</div>
									<div class="text-sm text-gray-500">{listing.farmerLocation}</div>
								</td>
								<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
									{listing.quantityKg.toLocaleString()} kg
								</td>
								<td class="text-primary-dark px-6 py-4 text-sm font-medium whitespace-nowrap">
									{formatCurrency(listing.pricePerKg)}
								</td>
								<td class="px-6 py-4">
									<div class="max-w-[200px]">
										<div class="text-sm text-gray-900">
											{truncateText(listing.description, 100)}
										</div>
										<button
											onclick={() => toggleDescriptionModal(listing.id)}
											class="text-primary hover:text-primary-dark mt-1 text-xs"
										>
											View Full Description
										</button>
									</div>
								</td>
								<td class="px-6 py-4">
									<div class="flex max-w-[150px] flex-wrap gap-1">
										{#each listing.deliveryMethods as method}
											<span
												class="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
											>
												{method}
											</span>
										{/each}
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span
										class={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusClass(listing.status)}`}
									>
										{listing.status}
									</span>
								</td>
								<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
									<div class="relative">
										<button
											onclick={(e) => {
												e.stopPropagation();
												toggleDropdown(listing.id);
											}}
											class="rounded-full p-2 transition-colors duration-150 hover:bg-gray-100"
											aria-label="Listing actions"
										>
											<i class="bi-three-dots-vertical text-gray-400"></i>
										</button>

										{#if activeDropdown === listing.id}
											<div
												class="border-border absolute right-0 z-10 mt-2 w-48 rounded-md border bg-white shadow-lg"
											>
												<div class="py-1">
													<button
														onclick={(e) => {
															e.stopPropagation();
															manageListing(listing);
														}}
														class="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-100"
													>
														<i class="bi-gear mr-3 text-gray-400"></i>
														Manage
													</button>
													{#if listing.status === 'Pending'}
														<button
															onclick={(e) => {
																e.stopPropagation();
																approveListing(listing);
															}}
															class="flex w-full items-center px-4 py-2 text-left text-sm text-green-600 transition-colors duration-150 hover:bg-green-50"
														>
															<i class="bi-check-circle mr-3 text-green-400"></i>
															Approve
														</button>
													{/if}
													<button
														onclick={(e) => {
															e.stopPropagation();
															deleteListing(listing);
														}}
														class="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 transition-colors duration-150 hover:bg-red-50"
													>
														<i class="bi-trash mr-3 text-red-400"></i>
														Flag/Delete
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
			<div class="border-border border-t bg-gray-50 px-6 py-4">
				<div class="flex items-center justify-between text-sm text-gray-600">
					<span>Showing all {listings.length} listings</span>
					<div class="flex space-x-4">
						<span>Approved: {listings.filter((l) => l.status === 'Approved').length}</span>
						<span>Pending: {listings.filter((l) => l.status === 'Pending').length}</span>
						<span>Draft: {listings.filter((l) => l.status === 'Draft').length}</span>
						<span>Rejected: {listings.filter((l) => l.status === 'Rejected').length}</span>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</div>



<!-- Description Modal -->
{#if showDescriptionModal}
	{@const listing = listings.find((l) => l.id === showDescriptionModal)}
	{#if listing}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4"
			onclick={() => toggleDescriptionModal(null)}
		>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl"
				onclick={(e) => e.stopPropagation()}
			>
				<div class="border-border flex items-center justify-between border-b p-6">
					<h3 class="text-lg font-semibold text-gray-900">{listing.title} - Description</h3>
					<button
						onclick={() => toggleDescriptionModal(null)}
						class="text-xl text-gray-400 hover:text-gray-600"
						aria-label="Close description modal"
					>
						<i class="bi-x"></i>
					</button>
				</div>
				<div class="overflow-y-auto p-6">
					<div class="prose prose-sm max-w-none">
						{@html listing.description}
					</div>
				</div>
				<div class="border-border flex justify-end border-t p-6">
					<button
						onclick={() => toggleDescriptionModal(null)}
						class="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-200"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	{/if}
{/if}
