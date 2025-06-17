<script lang="ts">
	import RichTextEditor from '$lib/Components/RichTextEditor.svelte';

	let editorContent = $state('');
	let showPreview = $state(false);

	function handleTextChange(html: string, text: string) {
		editorContent = html;
		console.log('Content changed:', { html, text });
	}

	function togglePreview() {
		showPreview = !showPreview;
	}
</script>

<div class="mx-auto max-w-4xl p-6">
	<h2 class="text-primary-dark mb-6 text-2xl font-bold">Rich Text Editor Demo</h2>

	<div class="space-y-4">
		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700"> Product Description </label>
			<RichTextEditor
				placeholder="Enter a detailed product description..."
				onTextChange={handleTextChange}
				class="w-full"
			/>
		</div>

		<div class="flex space-x-4">
			<button
				onclick={togglePreview}
				class="bg-primary hover:bg-primary-dark rounded-md px-4 py-2 text-white transition-colors"
			>
				{showPreview ? 'Hide Preview' : 'Show Preview'}
			</button>
		</div>

		{#if showPreview && editorContent}
			<div class="border-border mt-6 rounded-md border bg-gray-50 p-4">
				<h3 class="text-primary-dark mb-3 text-lg font-semibold">Preview:</h3>
				<div class="prose prose-sm max-w-none rounded border bg-white p-4">
					{@html editorContent}
				</div>
			</div>
		{/if}
	</div>
</div>
