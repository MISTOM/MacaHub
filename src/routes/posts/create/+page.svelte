<script lang="ts">
	import { goto } from '$app/navigation';
	import RichTextEditor from '$lib/Components/RichTextEditor.svelte';

	// Form data
	let formData = $state({
		title: '',
		category: '',
		contentType: '',
		content: '',
		media: null as File | null,
		tags: [] as string[]
	});

	let richTextEditor: RichTextEditor;
	let fileInputElement = $state<HTMLInputElement>();
	let isSubmitting = $state(false);
	let uploadedFileName = $state('');
	let tagInput = $state('');

	// Options for dropdowns
	const categories = [
		{ value: '', label: 'Select category' },
		{ value: 'agronomic-practices', label: 'Agronomic Practices' },
		{ value: 'pests-diseases', label: 'Pests & Diseases' },
		{ value: 'organic-farming', label: 'Organic Farming' },
		{ value: 'post-harvest', label: 'Post-Harvest' },
		{ value: 'marketing', label: 'Marketing' },
		{ value: 'financial-management', label: 'Financial Management' }
	];

	const contentTypes = [
		{ value: '', label: 'Select type' },
		{ value: 'article', label: 'Article' },
		{ value: 'video', label: 'Video' },
		{ value: 'infographic', label: 'Infographic' },
		{ value: 'audio', label: 'Audio' },
		{ value: 'guide', label: 'Guide' },
		{ value: 'tutorial', label: 'Tutorial' }
	];

	// Form validation
	let formErrors = $derived({
		title: !formData.title.trim() ? 'Title is required' : '',
		category: !formData.category ? 'Category is required' : '',
		contentType: !formData.contentType ? 'Content type is required' : '',
		content: !formData.content.trim() ? 'Content is required' : ''
	});

	let isFormValid = $derived(
		formData.title.trim() && formData.category && formData.contentType && formData.content.trim()
	);

	// Handle rich text editor changes
	function handleContentChange(html: string, text: string) {
		formData.content = html;
	}

	// Handle file upload
	function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			formData.media = file;
			uploadedFileName = file.name;
		}
	}

	// Handle file drop
	function handleFileDrop(event: DragEvent) {
		event.preventDefault();
		const files = event.dataTransfer?.files;
		if (files && files.length > 0) {
			const file = files[0];
			formData.media = file;
			uploadedFileName = file.name;
		}
	}

	// Handle drag over
	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	// Remove uploaded file
	function removeFile() {
		formData.media = null;
		uploadedFileName = '';
		if (fileInputElement) {
			fileInputElement.value = '';
		}
	}

	// Handle form submission
	async function handleSubmit(isDraft: boolean = false) {
		if (!isFormValid && !isDraft) return;

		isSubmitting = true;

		try {
			// Get content from rich text editor
			const editorContent = richTextEditor?.getContent();
			if (editorContent) {
				formData.content = editorContent.html;
			}

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			console.log('Form submitted:', {
				...formData,
				status: isDraft ? 'Draft' : 'Review'
			});

			// Navigate back to extension services
			goto('/posts');
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			isSubmitting = false;
		}
	}

	// Handle cancel
	function handleCancel() {
		goto('/posts');
	}

	// Handle tag addition
	function addTag() {
		const trimmedTag = tagInput.trim();
		if (trimmedTag && !formData.tags.includes(trimmedTag)) {
			formData.tags = [...formData.tags, trimmedTag];
			tagInput = '';
		}
	}

	// Handle tag removal
	function removeTag(tagToRemove: string) {
		formData.tags = formData.tags.filter((tag) => tag !== tagToRemove);
	}

	// Handle Enter key press in tag input
	function handleTagKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			addTag();
		}
	}
</script>

<div class="bg-background min-h-screen flex-1 p-6">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<div class="mb-8">
			<div class="mb-4 flex items-center space-x-2">
				<button
					onclick={handleCancel}
					class="text-text/60 hover:text-text flex items-center space-x-1 text-sm transition-colors"
				>
					<i class="bi-arrow-left"></i>
					<span>Back to Posts</span>
				</button>
			</div>
			<h1 class="text-primary-dark text-3xl font-bold">Create Post</h1>
			<p class="text-text/60 mt-2">Create educational content for farmers and stakeholders.</p>
		</div>

		<!-- Form -->
		<div class="border-border rounded-lg border bg-white p-8">
			<form onsubmit={() => handleSubmit(false)}>
				<!-- Title -->
				<div class="mb-6">
					<label for="title" class="text-primary-dark mb-2 block text-sm font-medium">
						Title <span class="text-error">*</span>
					</label>
					<input
						id="title"
						type="text"
						bind:value={formData.title}
						placeholder="Post title"
						class={`border-border text-text placeholder-text/50 focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-3 focus:ring-1 focus:outline-none ${
							formErrors.title ? 'border-error' : ''
						}`}
					/>
					{#if formErrors.title}
						<p class="text-error mt-1 text-sm">{formErrors.title}</p>
					{/if}
				</div>

				<!-- Category and Content Type Row -->
				<div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
					<!-- Category -->
					<div>
						<label for="category" class="text-primary-dark mb-2 block text-sm font-medium">
							Category <span class="text-error">*</span>
						</label>
						<div class="relative">
							<select
								id="category"
								bind:value={formData.category}
								class={`border-border text-text focus:border-primary focus:ring-primary w-full appearance-none rounded-lg border px-4 py-3 focus:ring-1 focus:outline-none ${
									formErrors.category ? 'border-error' : ''
								}`}
							>
								{#each categories as category}
									<option value={category.value}>{category.label}</option>
								{/each}
							</select>
							<i
								class="bi-chevron-down text-text/60 pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
							></i>
						</div>
						{#if formErrors.category}
							<p class="text-error mt-1 text-sm">{formErrors.category}</p>
						{/if}
					</div>

					<!-- Content Type -->
					<div>
						<label for="contentType" class="text-primary-dark mb-2 block text-sm font-medium">
							Content Type <span class="text-error">*</span>
						</label>
						<div class="relative">
							<select
								id="contentType"
								bind:value={formData.contentType}
								class={`border-border text-text focus:border-primary focus:ring-primary w-full appearance-none rounded-lg border px-4 py-3 focus:ring-1 focus:outline-none ${
									formErrors.contentType ? 'border-error' : ''
								}`}
							>
								{#each contentTypes as type}
									<option value={type.value}>{type.label}</option>
								{/each}
							</select>
							<i
								class="bi-chevron-down text-text/60 pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
							></i>
						</div>
						{#if formErrors.contentType}
							<p class="text-error mt-1 text-sm">{formErrors.contentType}</p>
						{/if}
					</div>
				</div>

				<!-- Tags -->
				<div class="mb-6">
					<label for="tags" class="text-primary-dark mb-2 block text-sm font-medium"> Tags </label>
					<div class="flex space-x-2">
						<div class="flex-1">
							<input
								id="tags"
								type="text"
								bind:value={tagInput}
								onkeypress={handleTagKeyPress}
								placeholder="Enter tags to categorize your post"
								class="border-border text-text placeholder-text/50 focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-3 focus:ring-1 focus:outline-none"
							/>
						</div>
						<button
							type="button"
							onclick={addTag}
							disabled={!tagInput.trim()}
							class="bg-primary-dark hover:bg-primary disabled:bg-text/30 flex items-center rounded-lg px-4 py-3 text-white transition-colors disabled:cursor-not-allowed"
						>
							<i class="bi-plus mr-1"></i>
							Add
						</button>
					</div>

					<!-- Tags Display -->
					{#if formData.tags.length > 0}
						<div class="mt-3 flex flex-wrap gap-2">
							{#each formData.tags as tag}
								<div
									class="bg-primary/10 text-primary flex items-center space-x-2 rounded-full px-3 py-1 text-sm"
								>
									<span>{tag}</span>
									<button
									aria-label="Remove tag"
										type="button"
										onclick={() => removeTag(tag)}
										class="text-primary/60 hover:text-primary hover:bg-primary/20 flex h-4 w-4 items-center justify-center rounded-full transition-colors"
									>
										<i class="bi-x text-xs"></i>
									</button>
								</div>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Content -->
				<div class="mb-6">
					<label for="content" class="text-primary-dark mb-2 block text-sm font-medium">
						Content <span class="text-error">*</span>
					</label>
					<RichTextEditor
						bind:this={richTextEditor}
						value={formData.content}
						placeholder="Write your content here..."
						onTextChange={handleContentChange}
						class={formErrors.content ? 'ring-error ring-1' : ''}
					/>
					{#if formErrors.content}
						<p class="text-error mt-1 text-sm">{formErrors.content}</p>
					{/if}
				</div>

				<!-- Media Upload -->
				<div class="mb-8">
					<label for="fileInput" class="text-primary-dark mb-2 block text-sm font-medium">Media</label>

					{#if uploadedFileName}
						<!-- File uploaded -->
						<div
							class="border-border bg-success/5 flex items-center justify-between rounded-lg border p-4"
						>
							<div class="flex items-center space-x-3">
								<i class="bi-file-earmark text-success text-xl"></i>
								<div>
									<p class="text-success font-medium">{uploadedFileName}</p>
									<p class="text-text/60 text-sm">File uploaded successfully</p>
								</div>
							</div>
							<button
								type="button"
								onclick={removeFile}
								aria-label="Remove file"
								class="text-text/60 hover:text-error hover:bg-error/10 flex h-8 w-8 items-center justify-center rounded-lg"
							>
								<i class="bi-x-lg"></i>
							</button>
						</div>
					{:else}
						<!-- Upload area -->
						<div
						role="button"
						tabindex="0"
							class="border-border hover:border-primary/50 hover:bg-primary/5 rounded-lg border-2 border-dashed p-8 text-center transition-colors"
							ondrop={handleFileDrop}
							ondragover={handleDragOver}
						>
							<i class="bi-cloud-upload text-text/60 mb-4 text-4xl"></i>
							<p class="text-text mb-2 font-medium">Upload images, videos, or documents</p>
							<p class="text-text/60 mb-4 text-sm">Drag and drop files here, or click to browse</p>
							<input
								bind:this={fileInputElement}
								type="file"
								onchange={handleFileSelect}
								class="hidden"
								id="fileInput"
								accept="image/*,video/*,.pdf,.doc,.docx"
							/>
							<button
								type="button"
								onclick={() => fileInputElement?.click()}
								class="border-border text-text hover:bg-background rounded-lg border px-4 py-2 text-sm transition-colors"
							>
								Choose Files
							</button>
						</div>
					{/if}
				</div>

				<!-- Form Actions -->
				<div class="border-border flex items-center justify-between border-t pt-6">
					<button
						type="button"
						onclick={handleCancel}
						class="border-border text-text hover:bg-background rounded-lg border px-6 py-2 transition-colors"
						disabled={isSubmitting}
					>
						Cancel
					</button>

					<div class="flex items-center space-x-3">
						<button
							type="button"
							onclick={() => handleSubmit(true)}
							class="border-border text-text hover:bg-background rounded-lg border px-6 py-2 transition-colors"
							disabled={isSubmitting}
						>
							{#if isSubmitting}
								<i class="bi-arrow-repeat mr-2 animate-spin"></i>
							{/if}
							Save as Draft
						</button>

						<button
							type="submit"
							class="bg-primary-dark hover:bg-primary disabled:bg-text/30 rounded-lg px-6 py-2 text-white transition-colors disabled:cursor-not-allowed"
							disabled={!isFormValid || isSubmitting}
						>
							{#if isSubmitting}
								<i class="bi-arrow-repeat mr-2 animate-spin"></i>
							{/if}
							Publish
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
