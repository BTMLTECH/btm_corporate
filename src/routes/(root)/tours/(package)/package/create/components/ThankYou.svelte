<script lang="ts">
    import { goto } from '$app/navigation';
  
    function goToHome() {
      goto('/');
    }
  
    function goToTours() {
      goto('/tours');
    }
  </script>
  
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-xl w-full bg-white p-10 rounded-2xl shadow-lg text-center">
      <div class="flex justify-center mb-6">
        <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
  
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Your package has been created successfully
      </h1>
  
      <p class="text-gray-600 mb-2">
        An email has been sent to you about your newly created package.
      </p>
      <p class="text-gray-600 mb-6">
        An agent will reach out to you shortly.
      </p>
  
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300"
          on:click={goToHome}
        >
          Go to homepage
        </button>
        <button
          class="w-full sm:w-auto border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-xl transition-all duration-300"
          on:click={goToTours}
        >
          Continue to tours
        </button>
      </div>
    </div>
  </div>
  