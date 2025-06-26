<script lang="ts">
    import { goto } from '$app/navigation';

    const handleDashboardClick = () => {
        goto('/dashboard');
    };
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-background">
    <main class="max-w-4xl px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-primary mb-6">
            Welcome to NOCD
        </h1>
        
        <p class="text-xl text-text mb-8">
            Your comprehensive platform for agricultural commodity management
        </p>
        <a href="/dashboard">
            <button
            class="inline-flex items-center px-6 py-3 text-lg font-semibold 
                   bg-primary-dark  text-white rounded-lg
                   hover:bg-primary-dark
                   focus:outline-none focus:ring-2 focus:ring-accent"
        >
            Go to Dashboard
            <i class="bi bi-arrow-right"></i>
        </button>
    </a>
    </main>
</div>