import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    // This will eventually fetch listings from an API
    // For now, return empty object since we're using hardcoded data
    return {};
};
