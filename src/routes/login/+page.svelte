<script lang="ts">
    import { goto } from '$app/navigation';


    // State management with Svelte 5 $state
    let email = $state('');
    let password = $state('');
    let rememberMe = $state(false);
    let isLoading = $state(false);

    /**
     * Handles the form submission for user login
     * @param {Event} e - The submit event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        isLoading = true;

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Replace with actual authentication logic
            console.log('Login attempt:', { email, password, rememberMe });

            // Navigate to dashboard on success
            goto('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            // Handle login errors here
        } finally {
            isLoading = false;
        }
    };

    /**
     * Handles forgotten password flow
     * @returns {void}
     */
    const handleForgotPassword = () => {
        // Implement forgot password logic
        console.log('Forgot password clicked');
    };

    /**
     * Handles social login through Google
     * @returns {void}
     */
    const handleGoogleLogin = () => {
        console.log('Google login clicked');
        // Implement Google OAuth logic
    };

    /**
     * Handles social login through GitHub
     * @returns {void}
     */
    const handleGithubLogin = () => {
        console.log('GitHub login clicked');
        // Implement GitHub OAuth logic
    };
</script>
<svelte:head>
    <title>Login | NOCD</title>
    <meta name="description" content="Sign in to your NOCD account to access your dashboard." />
    <link rel="preload" href="/images/cashew-nut-close-up.jpg" as="image" />
</svelte:head>

<div class="flex min-h-screen flex-col md:flex-row text-text">
    <!-- Login form section -->
    <div class="flex flex-1 items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <!-- Logo - Wave design matching the image -->
            <div class="flex justify-center">
               <i class="bi bi-leaf"></i>
            </div>

            <!-- Header -->
            <div class="text-center">
                <h2 class="text-primary-dark text-3xl font-bold">Sign in to your account</h2>
                <!-- <p class="mt-2 text-sm text-text">
                    Not a member?
                    <a href="/#" class="text-primary hover:text-primary-light font-medium">
                        Start a 14 day free trial
                    </a>
                </p> -->
            </div>

            <!-- Login Form -->
            <form class="mt-8 space-y-6" onsubmit={handleSubmit}>
                <div class="space-y-4">
                    <!-- Email field -->
                    <div>
                        <label for="email" class="block text-sm font-medium">Email address</label>
                        <div class="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                class="block w-full appearance-none rounded-md border border-border px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-primary"
                                bind:value={email}
                            />
                        </div>
                    </div>

                    <!-- Password field -->
                    <div>
                        <div class="flex justify-between">
                            <label for="password" class="block text-sm font-medium "
                                >Password</label
                            >
                        </div>
                        <div class="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                class="block w-full appearance-none rounded-md border border-border px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-primary"
                                bind:value={password}
                            />
                        </div>
                    </div>

                    <!-- Remember me and forgot password -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                class=" h-4 w-4 rounded border-gray-300 focus:ring-primary"
                                bind:checked={rememberMe}
                            />
                            <label for="remember-me" class="ml-2 block text-sm">
                                Remember me
                            </label>
                        </div>

                        <div class="text-sm">
                            <button
                                type="button"
                                class=" hover:text-primary-light font-medium"
                                onclick={handleForgotPassword}
                            >
                                Forgot password?
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Sign in button -->
                <div>
                    <button
                        type="submit"
                        class="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        disabled={isLoading}
                    >
                        {#if isLoading}
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <i class="bi text-lg bi-arrow-clockwise animate-spin mr-2"></i>
                            </span>
                            Processing...
                        {:else}
                            Sign in
                        {/if}
                    </button>
                </div>
            </form>

            <!-- Divider -->
            <!-- <div class="relative mt-6">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-border"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                    <span class="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
            </div> -->

            <!-- Social login buttons -->
            <!-- <div class="mt-6 grid grid-cols-2 gap-3">
                <div>
                    <button
                        type="button"
                        class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        onclick={handleGoogleLogin}
                    >
                        <svg class="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                                fill="currentColor"
                            />
                        </svg>
                        <span class="ml-2">Google</span>
                    </button>
                </div>

                <div>
                    <button
                        type="button"
                        class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        onclick={handleGithubLogin}
                    >
                        <svg class="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                fill="currentColor"
                            />
                        </svg>
                        <span class="ml-2">GitHub</span>
                    </button>
                </div>
            </div> -->
        </div>
    </div>

    <!-- Desktop image section (hidden on mobile) -->
    <div class="hidden md:block md:flex-1">
        <div
            class="h-full w-full bg-cover bg-center"
            style="background-image: url('/images/cashew-nut-close-up.jpg');"
        >
            <div class="h-full w-full bg-black/25"></div>
        </div>
    </div>
</div>