// Create post page data
export async function load() {
    return {
        categories: [
            { value: 'agronomic-practices', label: 'Agronomic Practices' },
            { value: 'pests-diseases', label: 'Pests & Diseases' },
            { value: 'organic-farming', label: 'Organic Farming' },
            { value: 'post-harvest', label: 'Post-Harvest' },
            { value: 'marketing', label: 'Marketing' },
            { value: 'financial-management', label: 'Financial Management' }
        ],
        contentTypes: [
            { value: 'article', label: 'Article' },
            { value: 'video', label: 'Video' },
            { value: 'infographic', label: 'Infographic' },
            { value: 'audio', label: 'Audio' },
            { value: 'guide', label: 'Guide' },
            { value: 'tutorial', label: 'Tutorial' }
        ]
    };
}
