// Extension services page data
export async function load() {
    // In a real application, this would fetch data from an API
    return {
        extensionContent: [],
        categories: [
            'Agronomic Practices',
            'Pests & Diseases',
            'Organic Farming',
            'Post-Harvest',
            'Marketing',
            'Financial Management'
        ]
    };
}
