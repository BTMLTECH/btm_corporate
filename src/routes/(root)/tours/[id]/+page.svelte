<script lang="ts">
  import type { PageData } from "./$types";
  import FixedBar from "./components/FixedBar.svelte";
  import Navigation from "./components/Navigation.svelte";
  import SectionCard from "./components/SectionCard.svelte";
  import TourCard from "./components/TourCard.svelte";

  export let data: PageData

  const {tourPackage} = data
  console.log(tourPackage)
</script>

<div class="relative py-8 md:py-16 bg-gray-100">
  <TourCard
    title={tourPackage.title}
    price={tourPackage.price_per_person_usd}
    nights={`${tourPackage.duration_nights} nights / ${tourPackage.duration_days} days`}
    imageUrl={tourPackage.thumbnail_url}
  />

  <Navigation></Navigation>

  <div class="max-w-5xl mx-auto mt-8 space-y-8">
    <SectionCard
      itineraries={tourPackage.itineraries}
      inclusions={tourPackage.inclusions}
      exclusions={tourPackage.exclusions}
      termsAndCondtions={tourPackage.terms_conditions}
    />
  </div>

  <FixedBar title={tourPackage.title} price={tourPackage.price_per_person_usd} />
</div>
