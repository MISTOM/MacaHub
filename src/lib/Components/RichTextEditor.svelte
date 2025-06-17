<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import type Quill from 'quill';

	interface Props {
		value?: string;
		placeholder?: string;
		readonly?: boolean;
		theme?: 'snow' | 'bubble';
		onTextChange?: (html: string, text: string) => void;
		class?: string;
	}

	let {
		value = '',
		placeholder = 'Enter description...',
		readonly = false,
		theme = 'snow',
		onTextChange,
		class: className = ''
	}: Props = $props();

	let editorElement: HTMLDivElement;
	let quill: Quill | null = null;

	onMount(async () => {
		if (!browser) return;

		// Dynamically import Quill to avoid SSR issues
		const QuillModule = await import('quill');
		const Quill = QuillModule.default;

		//Import css
		await import('quill/dist/quill.snow.css');
		await import('quill/dist/quill.bubble.css');

		// Custom toolbar configuration
		const toolbarOptions = [
			[{ header: [1, 2, 3, false] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ indent: '-1' }, { indent: '+1' }],
			[{ color: [] }, { background: [] }],
			[{ align: [] }],
			['link'],
			['clean']
		];

		quill = new Quill(editorElement, {
			theme: theme,
			readOnly: readonly,
			placeholder: placeholder,
			modules: {
				toolbar: toolbarOptions
			}
		});

		// Set initial value
		if (value) {
			quill.root.innerHTML = value;
		}

		// Listen for text changes

		quill.on('text-change', () => {
			const html = quill?.root.innerHTML || '';
			const text = quill?.getText() || '';
			if (onTextChange) {
				onTextChange(html, text);
			}
		});
	});

	onDestroy(() => {
		if (quill) {
			quill.off('text-change');
		}
	});

	// Method to get content
	export function getContent() {
		return quill
			? {
					html: quill.root.innerHTML,
					text: quill.getText(),
					delta: quill.getContents()
				}
			: null;
	}

	// Method to set content
	export function setContent(html: string) {
		if (quill) {
			quill.root.innerHTML = html;
		}
	}
</script>

<svelte:head>
	<!-- Quill.js CSS -->
	<!-- <link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.bubble.css" rel="stylesheet">
    <!-- Quill.js JavaScript --
    <script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script> -->
</svelte:head>

<div class="rich-text-editor {className}">
	<div bind:this={editorElement} class="border-border min-h-[200px] rounded-md border"></div>
</div>

<style>
	:global(.ql-editor) {
		min-height: 150px;
		font-family: inherit;
		font-size: 14px;
		line-height: 1.5;
	}

	:global(.ql-toolbar) {
		border-top: 1px solid var(--color-border) !important;
		border-left: 1px solid var(--color-border) !important;
		border-right: 1px solid var(--color-border) !important;
		border-bottom: none !important;
		border-radius: 6px 6px 0 0;
		background: #f9fafb;
	}

	:global(.ql-container) {
		border-bottom: 1px solid var(--color-border) !important;
		border-left: 1px solid var(--color-border) !important;
		border-right: 1px solid var(--color-border) !important;
		border-top: none !important;
		border-radius: 0 0 6px 6px;
		font-family: inherit;
	}

	:global(.ql-snow .ql-picker.ql-expanded .ql-picker-options) {
		border: 1px solid var(--color-border);
		border-radius: 4px;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	:global(.ql-snow .ql-tooltip) {
		border: 1px solid var(--color-border);
		border-radius: 4px;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}
</style>
