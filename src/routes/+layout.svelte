<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/Components/Sidebar.svelte';

	let { children } = $props();
</script>

<div class="bg-background h-screen flex">
	<Sidebar />

	{@render children()}
</div>	
