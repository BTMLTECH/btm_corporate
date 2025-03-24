<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
</script>

<section class="w-full px-10">
	<div
		class="error grid gap-5 items-center justify-center place-items-center pt-32 text-neutral-500"
	>
		<div class="grid items-center justify-center gap-y-4">
			<Loading class="w-20 h-20" />
			<h3>Please wait...</h3>
		</div>
	</div>
</section>
