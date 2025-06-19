<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Dashboard stats data
	interface DashboardStats {
		totalUsers: number;
		userGrowth: number;
		activeListings: number;
		listingGrowth: number;
		totalRevenue: number;
		revenueGrowth: number;
		pendingReviews: number;
		reviewGrowth: number;
	}

	// Mock dashboard data
	let dashboardStats: DashboardStats = $state({
		totalUsers: 2847,
		userGrowth: 12.5,
		activeListings: 1234,
		listingGrowth: 8.2,
		totalRevenue: 2400000, // KSh 2.4M
		revenueGrowth: 15.3,
		pendingReviews: 47,
		reviewGrowth: -6.1
	});

	// Recent activity data
	interface ActivityItem {
		id: string;
		type: 'user' | 'listing' | 'article' | 'account' | 'review';
		title: string;
		timeAgo: string;
		icon: string;
	}

	let recentActivity: ActivityItem[] = $state([
		{
			id: '1',
			type: 'user',
			title: 'New farmer registered from Kiambu',
			timeAgo: '2 minutes ago',
			icon: 'bi-person-plus'
		},
		{
			id: '2',
			type: 'listing',
			title: 'Premium macadamia listing approved',
			timeAgo: '15 minutes ago',
			icon: 'bi-check-circle'
		},
		{
			id: '3',
			type: 'article',
			title: 'New extension article published',
			timeAgo: '1 hour ago',
			icon: 'bi-file-text'
		},
		{
			id: '4',
			type: 'account',
			title: 'Buyer account verified',
			timeAgo: '2 hours ago',
			icon: 'bi-shield-check'
		},
		{
			id: '5',
			type: 'review',
			title: 'Listing flagged for review',
			timeAgo: '3 hours ago',
			icon: 'bi-flag'
		}
	]);

	// User growth chart data (simplified for placeholder)
	const chartMonths = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	const chartData = [180, 300, 250, 290, 200, 310, 290, 340, 380, 450, 480, 520];

	// Format currency
	function formatCurrency(amount: number): string {
		if (amount >= 1000000) {
			return `KSh ${(amount / 1000000).toFixed(1)}M`;
		} else if (amount >= 1000) {
			return `KSh ${(amount / 1000).toFixed(1)}K`;
		}
		return `KSh ${amount.toLocaleString()}`;
	}

	// Get growth indicator class
	function getGrowthClass(growth: number): string {
		return growth >= 0 ? 'text-success' : 'text-error';
	}

	// Get growth icon
	function getGrowthIcon(growth: number): string {
		return growth >= 0 ? 'bi-arrow-up' : 'bi-arrow-down';
	}

	// Get activity icon color
	function getActivityIconColor(type: string): string {
		switch (type) {
			case 'user':
				return 'text-primary';
			case 'listing':
				return 'text-success';
			case 'article':
				return 'text-accent';
			case 'account':
				return 'text-primary-dark';
			case 'review':
				return 'text-warning';
			default:
				return 'text-text/60';
		}
	}
</script>

<div class="bg-background min-h-screen flex-1 p-6">
	<div class="max-w-8xl mx-auto">
		<!-- Stats Cards -->
		<div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Total Users -->
			<div class="border-border rounded-lg border bg-white p-6">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-text/60 text-sm font-medium">Total Users</p>
						<p class="text-primary-dark mt-1 text-2xl font-bold">
							{dashboardStats.totalUsers.toLocaleString()}
						</p>
					</div>

					<i class="bi-people text-primary"></i>
				</div>
				<div class="mt-4 flex items-center">
					<i
						class={`${getGrowthIcon(dashboardStats.userGrowth)} ${getGrowthClass(dashboardStats.userGrowth)} mr-1 text-sm`}
					></i>
					<span class={`text-sm font-medium ${getGrowthClass(dashboardStats.userGrowth)}`}>
						{Math.abs(dashboardStats.userGrowth)}%
					</span>
					<span class="text-text/60 ml-1 text-sm">from last month</span>
				</div>
			</div>

			<!-- Active Listings -->
			<div class="border-border rounded-lg border bg-white p-6">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-text/60 text-sm font-medium">Active Listings</p>
						<p class="text-primary-dark mt-1 text-2xl font-bold">
							{dashboardStats.activeListings.toLocaleString()}
						</p>
					</div>

					<i class="bi-grid text-success"></i>
				</div>
				<div class="mt-4 flex items-center">
					<i
						class={`${getGrowthIcon(dashboardStats.listingGrowth)} ${getGrowthClass(dashboardStats.listingGrowth)} mr-1 text-sm`}
					></i>
					<span class={`text-sm font-medium ${getGrowthClass(dashboardStats.listingGrowth)}`}>
						{Math.abs(dashboardStats.listingGrowth)}%
					</span>
					<span class="text-text/60 ml-1 text-sm">from last month</span>
				</div>
			</div>

			<!-- Total Revenue -->
			<div class="border-border rounded-lg border bg-white p-6">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-text/60 text-sm font-medium">Total Revenue</p>
						<p class="text-primary-dark mt-1 text-2xl font-bold">
							{formatCurrency(dashboardStats.totalRevenue)}
						</p>
					</div>
					<i class="bi bi-cash text-accent"></i>
				</div>
				<div class="mt-4 flex items-center">
					<i
						class={`${getGrowthIcon(dashboardStats.revenueGrowth)} ${getGrowthClass(dashboardStats.revenueGrowth)} mr-1 text-sm`}
					></i>
					<span class={`text-sm font-medium ${getGrowthClass(dashboardStats.revenueGrowth)}`}>
						{Math.abs(dashboardStats.revenueGrowth)}%
					</span>
					<span class="text-text/60 ml-1 text-sm">from last month</span>
				</div>
			</div>

			<!-- Pending Reviews -->
			<div class="border-border rounded-lg border bg-white p-6">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-text/60 text-sm font-medium">Pending Reviews</p>
						<p class="text-primary-dark mt-1 text-2xl font-bold">{dashboardStats.pendingReviews}</p>
					</div>
					<i class="bi-clock text-warning"></i>
				</div>
				<div class="mt-4 flex items-center">
					<i
						class={`${getGrowthIcon(dashboardStats.reviewGrowth)} ${getGrowthClass(dashboardStats.reviewGrowth)} mr-1 text-sm`}
					></i>
					<span class={`text-sm font-medium ${getGrowthClass(dashboardStats.reviewGrowth)}`}>
						{Math.abs(dashboardStats.reviewGrowth)}%
					</span>
					<span class="text-text/60 ml-1 text-sm">from last month</span>
				</div>
			</div>
		</div>

		<!-- Charts and Activity Grid -->
		<div class="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
			<!-- User Growth Chart -->
			<div class="border-border rounded-lg border bg-white p-6 lg:col-span-2">
				<div class="mb-6 flex items-center justify-between">
					<div>
						<h3 class="text-primary-dark text-lg font-semibold">User Growth</h3>
						<p class="text-text/60 mt-1 text-sm">Monthly user registrations over the past year</p>
					</div>
				</div>

				<!-- Placeholder Chart with Icons -->
				<div class="bg-background/30 flex h-64 items-end justify-between space-x-2 rounded-lg p-4">
					{#each chartData as value, index}
						<div class="flex flex-1 flex-col items-center">
							<div
								class="bg-primary flex w-full items-end justify-center rounded-t-sm pb-2"
								style="height: {(value / Math.max(...chartData)) * 100}%"
							>
								<i class="bi-bar-chart text-xs text-white opacity-70"></i>
							</div>
							<span class="text-text/60 mt-2 text-xs">{chartMonths[index]}</span>
						</div>
					{/each}
				</div>

				<!-- Chart Legend -->
				<div class="mt-4 flex items-center justify-center">
					<div class="flex items-center space-x-4">
						<div class="flex items-center">
							<div class="bg-primary mr-2 h-3 w-3 rounded-full"></div>
							<span class="text-text/70 text-sm">New Users</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Recent Activity -->
			<div class="border-border rounded-lg border bg-white p-6">
				<div class="mb-6 flex items-center justify-between">
					<h3 class="text-primary-dark text-lg font-semibold">Recent Activity</h3>
				</div>
				<p class="text-text/60 mb-4 text-sm">Latest system activities and updates</p>

				<div class="space-y-4">
					{#each recentActivity as activity}
						<div class="flex items-start space-x-3">
							<div class="bg-background flex-shrink-0 rounded-full p-2">
								<i class={`${activity.icon} ${getActivityIconColor(activity.type)} text-sm`}></i>
							</div>
							<div class="min-w-0 flex-1">
								<p class="text-text text-sm font-medium">{activity.title}</p>
								<p class="text-text/60 mt-1 text-xs">{activity.timeAgo}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Quick Actions -->
		<div class="border-border rounded-lg border bg-white p-6">
			<div class="mb-6">
				<h3 class="text-primary-dark text-lg font-semibold">Quick Actions</h3>
				<p class="text-text/60 mt-1 text-sm">Common administrative tasks</p>
			</div>

			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<!-- Add User -->
				<!-- <button
					class="bg-primary-dark hover:bg-primary focus:ring-primary rounded-lg p-6 text-center text-white transition-colors duration-150 focus:ring-2 focus:ring-offset-2 focus:outline-none"
				>
					<div class="flex flex-col items-center space-y-3">
						<i class="bi-person-plus text-2xl"></i>
						<span class="text-sm font-medium">Add User</span>
					</div>
				</button> -->

				<!-- Create Post -->
				<button
					class="hover:bg-background border-border cursor-pointer text-text focus:ring-primary/50 rounded-lg border bg-white p-6 text-center transition-colors duration-150 focus:ring-2 focus:ring-offset-2 focus:outline-none"
					onclick={() => goto('/posts/create')}
				>
					<div class="flex flex-col items-center space-y-3">
						<i class="bi-file-earmark-plus text-text/70 text-2xl"></i>
						<span class="text-sm font-medium">Create Post</span>
					</div>
				</button>

				<!-- Review Listings -->
				<button
					class="hover:bg-background border-border cursor-pointer text-text focus:ring-primary rounded-lg border bg-white p-6 text-center transition-colors duration-150 focus:ring-2 focus:ring-offset-2 focus:outline-none"
					onclick={() => goto('/listings')}
					>
					<div class="flex flex-col items-center space-y-3">
						<i class="bi-eye text-text/70 text-2xl"></i>
						<span class="text-sm font-medium">Review Listings</span>
					</div>
				</button>

				<!-- View Reports -->
				<button
					class="hover:bg-background border-border cursor-pointer text-text focus:ring-primary rounded-lg border bg-white p-6 text-center transition-colors duration-150 focus:ring-2 focus:ring-offset-2 focus:outline-none"
					onclick={() => goto('/reports')}
					>
					<div class="flex flex-col items-center space-y-3">
						<i class="bi-graph-up text-text/70 text-2xl"></i>
						<span class="text-sm font-medium">View Reports</span>
					</div>
				</button>
			</div>
		</div>
	</div>
</div>
