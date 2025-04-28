<script lang="ts">
  import type { SectionItem } from "$lib/types";
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
</script>

<div class="relative py-8 md:py-16 bg-gray-100">
  <TourCard
    title="Lorem Ipsum"
    price={890}
    nights="5 nights / 6 days"
    imageUrl={"https://images.unsplash.com/photo-1572252009286-268acec5ca0a?..."}
  />

  <Navigation></Navigation>

  <div class="max-w-5xl mx-auto mt-8 space-y-8">
    <SectionCard
      id="itinerary"
      title="Itinerary"
      color="sky"
      items={[
        {
          day: 1,
          heading: "Arrival in Cairo",
          text: "Arrive at Cairo International Airport...",
        },
        {
          day: 2,
          heading: "Pyramids & Sphinx Tour",
          text: "Full-day guided tour of the Pyramids of Giza...",
        },
      ]}
    />

    <SectionCard
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
    />
  </div>

  <FixedBar />
</div>
