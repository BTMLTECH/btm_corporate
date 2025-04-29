<script lang="ts">
  import type { SectionItem } from "$lib/types";
  import type { PageData } from "./$types";
  import FixedBar from "./components/FixedBar.svelte";
  import Navigation from "./components/Navigation.svelte";
  import SectionCard from "./components/SectionCard.svelte";
  import TourCard from "./components/TourCard.svelte";

  const itineraryItems: SectionItem[] = [
    {
      day: 1,
      heading: "Arrival in Cairo",
      text: "Arrive at Cairo International Airport...",
    },
    {
      day: 2,
      heading: "Pyramids & Sphinx Tour",
      text: "Visit the Pyramids and Museum...",
    },
  ];

  const inclusions: SectionItem[] = [{ text: "Breakfast included" }];
  const exclusions: SectionItem[] = [{ text: "Visa not included" }];
  const terms: SectionItem[] = [{ text: "25% non-refundable deposit." }];

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

    <!-- <SectionCard
      id="inclusions"
      title="Inclusions"
      color="teal"
      items={[{ text: "All breakfast meals included." }]}
    />

    <SectionCard
      id="exclusions"
      title="Exclusions"
      color="pink"
      items={[{ text: "Visas and optional excursions." }]}
    />

    <SectionCard
      id="terms"
      title="Terms & Conditions"
      color="orange"
      items={[{ text: "25% non-refundable deposit required at booking." }]}
    /> -->
  </div>

  <FixedBar />
</div>
