<script lang="ts">
	import { page } from "$app/stores";

    let currentRoute: string

    $: currentRoute = $page.url.pathname
</script>

<nav role="list">
    <ul class="pl-4 mt-8 grid gap-10 text-sm">
        <li class="{currentRoute === '/services/aviation-consultancy' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/aviation-consultancy">Aviation Consultancy</a>
        </li>
        <li class="{currentRoute === '/services/visa-assistance-consultation' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/visa-assistance-consultation">Visa Assistance & Consultation</a>
        </li>
        <li class="{currentRoute === '/services/tourism-consultancy' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/tourism-consultancy">Tourism Consultancy</a>
        </li>
        <li class="{currentRoute === '/services/hotel-accommodation' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/hotel-accommodation">Hotel & Accommodation</a>
        </li>
        <li class="{currentRoute === '/services/industrial-training' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/industrial-training">Industrial Training</a>
        </li>
        <li
            class="{currentRoute === '/services/airport-concierge' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in"
        >
            <a href="/services/airport-concierge">Airport Concierge</a>
        </li>
        <li class="{currentRoute === '/services/security-escort-services' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/security-escort-services">Security & Escort Services</a>
        </li>
        <li class="{currentRoute === '/services/smb-travel-club' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/smb-travel-club">SMB Travel Club</a>
        </li>
        <li class="{currentRoute === '/services/holidays-tours' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/holidays-tours">Holidays & Tours</a>
        </li>
        <li class="{currentRoute === '/services/meeting-event-management' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/meeting-event-management">Meeting & Event Management</a>
        </li>
        <li class="{currentRoute === '/services/jet-charter-flight-services' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/jet-charter-flight-services"
                >Executive Jet Charter & Flight Clearance Services</a
            >
        </li>
        <li class="{currentRoute === '/services/destination-management' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/destination-management">Destination Management</a>
        </li>
        <li class="{currentRoute === '/services/airport-transfer-ground-transportation' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/airport-transfer-ground-transportation"
                >Airport Transfers & Ground Transportation (Globally)</a
            >
        </li>
        <li class="{currentRoute === '/services/travel-consultation-advice' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/travel-consultation-advice">Travel Consultation & Advice</a>
        </li>
        <li class="{currentRoute === '/services/group-travel-airline-seat-blocking' ? "bg-neutral-300 p-3 rounded-full" : ""} font-semibold hover:translate-x-2 transition-all ease-in">
            <a href="/services/group-travel-airline-seat-blocking"
                >Group Travel & Airline Seat Blocking</a
            >
        </li>
    </ul>
</nav>