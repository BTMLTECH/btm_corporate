<script lang="ts">
  import TourCard from "./components/TourCard.svelte";
  import type { PageData } from "./$types";
  import FixedBar from "./components/FixedBar.svelte";
  import Navigation from "./components/Navigation.svelte";
  import SectionCard from "./components/SectionCard.svelte";

  export let data: PageData;

  const { tourPackage } = data;
</script>

<div class="relative py-8 md:py-16 bg-gray-100">
  <TourCard
    title={tourPackage.title}
    price={tourPackage.price_per_person_usd ??
      tourPackage.price_per_family_usd ??
      0}
    days={tourPackage.duration_days}
    nights={tourPackage.duration_nights}
    imageUrl={tourPackage.thumbnail_url}
    packageType={tourPackage.package_type}
  />

  <Navigation />

  <div
    class="max-w-5xl mx-auto text-white bg-blue-950 rounded-2xl px-7 py-4 mt-8 h-[170px] flex flex-col justify-center"
  >
    <h1 class="font-bold text-2xl">How to make a booking?</h1>
    <p class="pt-5 text-md">
      To make the booking, simply fill in the form , call <strong
        >+233598117590</strong
      >
      or email us at <strong>info@btmghana.net</strong>
    </p>
  </div>

  <div class="max-w-5xl mx-auto mt-8 space-y-8">
    <SectionCard
      overview={tourPackage.description ?? ""}
      itineraries={tourPackage.itineraries}
      inclusions={tourPackage.inclusions}
      exclusions={tourPackage.exclusions}
      termsAndCondtions={tourPackage.terms_conditions}
    />
  </div>

  <FixedBar
    title={tourPackage.title}
    price={tourPackage.price_per_person_usd ??
      tourPackage.price_per_family_usd ??
      0}
    thumbnail={tourPackage.thumbnail_url}
  />
</div>
