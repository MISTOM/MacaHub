<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex h-screen items-center justify-center bg-background text-text font-mono text-xl">

	<h1>{page.status}: {page.error?.message}</h1>
</div>
