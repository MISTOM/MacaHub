<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	// Post Content statistics
	interface PostStats {
		totalPosts: number;
		totalPostsGrowth: number;
		published: number;
		publishedGrowth: number;
		totalViews: number;
		totalViewsGrowth: number;
		engagement: number;
		engagementGrowth: number;
	}

	// Post Content item interface
	interface Post {
		id: string;
		title: string;
		type: 'Article' | 'Video' | 'Infographic' | 'Audio';
		category: string;
		author: string;
		authorInitials: string;
		status: 'Published' | 'Draft' | 'Review';
		publishedDate?: string;
		views: number;
		likes: number;
		icon: string;
		tags: string[];
	}

	// Mock statistics data
	let extensionStats: PostStats = $state({
		totalPosts: 4,
		totalPostsGrowth: 2,
		published: 2,
		publishedGrowth: 0,
		totalViews: 2103,
		totalViewsGrowth: 12,
		engagement: 156,
		engagementGrowth: 0
	});

	// Mock Post Content data based on the screenshot
	let posts: Post[] = $state([
		{
			id: '1',
			title: 'Macadamia Pruning Techniques for Better Yield',
			type: 'Article',
			category: 'Agronomic Practices',
			author: 'Dr. Jane Mwangi',
			authorInitials: 'DJM',
			status: 'Published',
			publishedDate: '2024-03-15',
			views: 1247,
			likes: 89,
			icon: 'bi-file-text',
			tags: ['macadamia', 'pruning', 'yield-optimization', 'tree-care']
		},
		{
			id: '2',
			title: 'Identifying and Managing Macadamia Pests',
			type: 'Video',
			category: 'Pests & Diseases',
			author: 'Peter Kimani',
			authorInitials: 'PK',
			status: 'Draft',
			views: 0,
			likes: 0,
			icon: 'bi-play-circle',
			tags: ['pest-management', 'macadamia', 'disease-control', 'identification']
		},
		{
			id: '3',
			title: 'Organic Certification Process Guide',
			type: 'Infographic',
			category: 'Organic Farming',
			author: 'Mary Wanjiku',
			authorInitials: 'MW',
			status: 'Published',
			publishedDate: '2024-03-10',
			views: 856,
			likes: 67,
			icon: 'bi-image',
			tags: ['organic', 'certification', 'guidelines', 'standards']
		},
		{
			id: '4',
			title: 'Post-Harvest Handling Best Practices',
			type: 'Audio',
			category: 'Post-Harvest',
			author: 'John Kamau',
			authorInitials: 'JK',
			status: 'Review',
			views: 0,
			likes: 0,
			icon: 'bi-mic',
			tags: ['post-harvest', 'best-practices', 'storage', 'quality-control']
		}
	]);

	// Filter options
	let selectedCategory = $state('All Categories');
	let selectedFilter = $state('More Filters');

	// State for managing dropdowns
	let activeDropdown: string | null = $state(null);

	// Categories
	const categories = [
		'All Categories',
		'Agronomic Practices',
		'Pests & Diseases',
		'Organic Farming',
		'Post-Harvest',
		'Marketing',
		'Financial Management'
	];

	// Functions
	function formatViews(views: number): string {
		if (views >= 1000) {
			return `${(views / 1000).toFixed(1)}k views`;
		}
		return `${views} views`;
	}

	function formatLikes(likes: number): string {
		return `${likes} likes`;
	}

	function getStatusClass(status: string): string {
		switch (status) {
			case 'Published':
				return 'status-approved';
			case 'Draft':
				return 'status-draft';
			case 'Review':
				return 'status-pending';
			default:
				return 'status-draft';
		}
	}

	function getGrowthClass(growth: number): string {
		return growth >= 0 ? 'text-success' : 'text-error';
	}

	function getGrowthIcon(growth: number): string {
		return growth >= 0 ? 'bi-arrow-up' : 'bi-arrow-down';
	}

	function handleCreatePost() {
		goto('/posts/create');
	}

	function handleEditPost(id: string) {
		goto(`/posts/edit/${id}`);
	}

	function handlePreviewPost(id: string) {
		console.log('Preview post:', id);
	}

	function handleDeletePost(id: string) {
		posts = posts.filter((content) => content.id !== id);
	}

	// Toggle dropdown for specific post
	function toggleDropdown(postId: string) {
		activeDropdown = activeDropdown === postId ? null : postId;
	}

	// Close dropdown when clicking outside
	function closeDropdown() {
		activeDropdown = null;
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	role="main"
	class="bg-background min-h-screen flex-1 p-6"
	onclick={closeDropdown}
	onkeypress={(e) => {
		if (e.key === 'Escape') {
			closeDropdown();
		}
	}}
	tabindex="-1"
>
	<!-- Main container -->
	<div class="max-w-8xl mx-auto">
		<!-- Header with Create Post Button -->
		<div class="mb-6 flex items-center justify-between">
			<div class="flex items-center space-x-4">
				<select
					bind:value={selectedCategory}
					class="border-border focus:border-primary focus:ring-primary rounded-lg border bg-white px-4 py-2 text-sm focus:ring-1 focus:outline-none"
				>
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>

				<button
					class="border-border text-text focus:border-primary focus:ring-primary flex items-center space-x-2 rounded-lg border bg-white px-4 py-2 text-sm hover:bg-gray-50 focus:ring-1 focus:outline-none"
				>
					<i class="bi-funnel"></i>
					<span>{selectedFilter}</span>
				</button>
			</div>

			<button
				onclick={handleCreatePost}
				class="bg-primary-dark hover:bg-primary focus:ring-primary flex items-center space-x-2 rounded-lg px-4 py-2 text-white transition-colors duration-150 focus:ring-2 focus:ring-offset-2 focus:outline-none"
			>
				<i class="bi-plus"></i>
				<span>Create Post</span>
			</button>
		</div>

		<!-- Statistics Cards -->
		<div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Total Posts -->
			<div class="border-border rounded-lg border bg-white p-6">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-text/60 text-sm font-medium">Total Posts</p>
						<p class="text-primary-dark mt-1 text-2xl font-bold">{extensionStats.totalPosts}</p>
					</div>
					<i class="bi-file-text text-primary text-2xl"></i>
				</div>
				<div class="mt-4 flex items-center">
					<i
						class={`${getGrowthIcon(extensionStats.totalPostsGrowth)} ${getGrowthClass(extensionStats.totalPostsGrowth)} mr-1 text-sm`}
					></i>
					<span class={`text-sm font-medium ${getGrowthClass(extensionStats.totalPostsGrowth)}`}>
						+{Math.abs(extensionStats.totalPostsGrowth)}
					</span>
					<span class="text-text/60 ml-1 text-sm">this week</span>
				</div>
			</div>

			<!-- Published -->
			<div class="border-border rounded-lg border bg-white p-6">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-text/60 text-sm font-medium">Published</p>
						<p class="text-primary-dark mt-1 text-2xl font-bold">{extensionStats.published}</p>
					</div>
					<i class="bi-check-circle text-success text-2xl"></i>
				</div>
				<div class="mt-4 flex items-center">
					<span class="text-text/60 text-sm">Live content</span>
				</div>
			</div>

			<!-- Total Views -->
			<div class="border-border rounded-lg border bg-white p-6">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-text/60 text-sm font-medium">Total Views</p>
						<p class="text-primary-dark mt-1 text-2xl font-bold">
							{extensionStats.totalViews.toLocaleString()}
						</p>
					</div>
					<i class="bi-eye text-accent text-2xl"></i>
				</div>
				<div class="mt-4 flex items-center">
					<i
						class={`${getGrowthIcon(extensionStats.totalViewsGrowth)} ${getGrowthClass(extensionStats.totalViewsGrowth)} mr-1 text-sm`}
					></i>
					<span class={`text-sm font-medium ${getGrowthClass(extensionStats.totalViewsGrowth)}`}>
						+{Math.abs(extensionStats.totalViewsGrowth)}%
					</span>
					<span class="text-text/60 ml-1 text-sm">this month</span>
				</div>
			</div>

			<!-- Engagement -->
			<div class="border-border rounded-lg border bg-white p-6">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-text/60 text-sm font-medium">Engagement</p>
						<p class="text-primary-dark mt-1 text-2xl font-bold">{extensionStats.engagement}</p>
					</div>
					<i class="bi-star text-warning text-2xl"></i>
				</div>
				<div class="mt-4 flex items-center">
					<span class="text-text/60 text-sm">Total likes</span>
				</div>
			</div>
		</div>

		<!-- Post Content Section -->
		<div class="border-border rounded-lg border bg-white">
			<div class="border-border border-b px-6 py-4">
				<div class="flex items-center justify-between">
					<div>
						<h3 class="text-primary-dark text-lg font-semibold">Post Content</h3>
						<p class="text-text/60 mt-1 text-sm">Manage educational content and resources</p>
					</div>
				</div>
			</div>

			<!-- Content Table Header -->
			<div
				class="bg-background/30 border-border text-text/60 grid grid-cols-12 gap-4 border-b px-6 py-3 text-sm font-medium"
			>
				<div class="col-span-4">Content</div>
				<div class="col-span-2">Category</div>
				<div class="col-span-2">Author</div>
				<div class="col-span-2">Performance</div>
				<div class="col-span-1">Status</div>
				<div class="col-span-1">Actions</div>
			</div>

			<!-- Content List -->
			<div class="divide-border divide-y">
				{#each posts as content}
					<div class="hover:bg-background/30 grid grid-cols-12 gap-4 px-6 py-4">
						<!-- Content Info -->
						<div class="col-span-4 flex items-center space-x-3">
							<div
								class="text-primary bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg"
							>
								<i class={`${content.icon} text-lg`}></i>
							</div>
							<div>
								<h4 class="text-primary-dark font-medium">{content.title}</h4>
								<p class="text-text/60 text-sm">
									{content.type} • {content.publishedDate
										? `Published ${content.publishedDate}`
										: 'Not published'}
								</p>
							</div>
						</div>

						<!-- Category -->
						<div class="col-span-2 flex items-center">
							<span
								class="border-border bg-primary/5 text-primary rounded-full border px-3 py-1 text-sm"
							>
								{content.category}
							</span>
						</div>

						<!-- Author -->
						<div class="col-span-2 flex items-center space-x-2">
							<div
								class="bg-accent flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium text-white"
							>
								{content.authorInitials}
							</div>
							<span class="text-text text-sm">{content.author}</span>
						</div>

						<!-- Performance -->
						<div class="col-span-2 flex items-center">
							<div class="text-sm">
								<div class="text-text font-medium">{formatViews(content.views)}</div>
								<div class="text-text/60">{formatLikes(content.likes)}</div>
							</div>
						</div>

						<!-- Status -->
						<div class="col-span-1 flex items-center">
							<span
								class={`${getStatusClass(content.status)} rounded-full px-3 py-1 text-xs font-medium`}
							>
								{content.status}
							</span>
						</div>

						<!-- Actions -->
						<div class="col-span-1 flex items-center">
							<div class="relative">
								<button
									class="text-text/60 hover:text-text focus:text-text hover:bg-background flex h-8 w-8 items-center justify-center rounded-lg focus:outline-none"
									onclick={(e) => {
										e.stopPropagation();
										toggleDropdown(content.id);
									}}
									aria-label="Post actions"
								>
									<i class="bi-three-dots-vertical"></i>
								</button>

								<!-- Dropdown Menu -->
								{#if activeDropdown === content.id}
									<div
										class="border-border absolute top-8 right-0 z-10 w-32 rounded-lg border bg-white py-1 shadow-lg"
									>
										<button
											onclick={(e) => {
												e.stopPropagation();
												handlePreviewPost(content.id);
												activeDropdown = null;
											}}
											class="text-text hover:bg-background flex w-full items-center space-x-2 px-3 py-2 text-left text-sm"
										>
											<i class="bi-eye"></i>
											<span>Preview</span>
										</button>
										<a href="/posts/edit/${content.id}">
										<button
											onclick={(e) => {
												e.stopPropagation();
												// handleEditPost(content.id);
												activeDropdown = null;
											}}
											class="text-text hover:bg-background flex w-full items-center space-x-2 px-3 py-2 text-left text-sm"
										>
											<i class="bi-pencil"></i>
												<span>Edit</span>
											</button>
										</a>
										<button
											onclick={(e) => {
												e.stopPropagation();
												handleDeletePost(content.id);
												activeDropdown = null;
											}}
											class="text-error hover:bg-background flex w-full items-center space-x-2 px-3 py-2 text-left text-sm"
										>
											<i class="bi-trash"></i>
											<span>Delete</span>
										</button>
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
