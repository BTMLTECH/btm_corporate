<script lang="ts">
    import { onMount } from 'svelte';
  
    let visible: boolean = false;
  
    onMount(() => {
      function handleScroll() {
        visible = window.scrollY > 400;
      }
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    });

    export let title: string
    export let price: number
    export let thumbnail: string
  </script>
  
  
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 transition-transform duration-300 ease-in-out" class:translate-y-0={visible} class:translate-y-full={!visible}>
    <div class="max-w-7xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="hidden md:block relative group">
            <img src={thumbnail} alt={title} class="w-12 h-12 object-cover rounded-md shadow-sm" />
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-800">{title}</h4>
            <div class="flex items-baseline gap-1">
              <span class="text-xl font-bold text-blue-600">USD {price}</span>
            </div>
          </div>
        </div>
  
        <button class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3">
          Book Now
        </button>
      </div>
    </div>
  </div>
  