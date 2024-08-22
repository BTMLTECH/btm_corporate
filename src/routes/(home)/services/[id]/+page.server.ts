import { error } from '@sveltejs/kit';
import Visa from '$lib/images/services/visa.webp';
import Hotel from '$lib/images/services/hotel-accomodation.webp';

const services: {
	[x: string]: {
		title: string;
		img: {
			src: string;
			alt: string;
		};
		description: string;
	};
} = {
	'aviation-consultancy': {
		title: 'Aviation Consultancy',
		img: {
			src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/epqfsjnwqzzgrjfgog1i',
			alt: 'BTM Aviation Consultancy'
		},
		description:
			"BTM parades an array of Consultants who are highly experienced and trained to supply end-to-end consultancy and professional training. Our expertise in aviation transcends beyond local aviation, it also comes with global valued proposition services which centre around different aviation markets' specifications and we are able to provide a high level of aviation management services to our Clients' engagements."
	},
	'visa-assistance-consultation': {
		title: 'Visa Assistance & Consultation',
		img: {
			alt: 'Visa Assistance & Consultation',
			src: Visa
		},
		description:
			'BTM has an extensive range of products and services, which may be specifically tailored to suit each individual clients’ requirements. Included in our bouquet of services is the BTM Nigeria Protocol BTM Nigeria has a team who are trained to offer efficient visa and immigration services to our clients. BTM Nigeria’s Visa and Immigration department is wholly owned and operated by BTM.'
	},
	'tourism-consultancy': {
		title: 'Tourism Consultancy',
		img: {
			alt: 'Tourism Consultancy',
			src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/okhcxc9uoak6kde39qsv'
		},
		description:
			'Tourism Consultancy Service as offered by BTM, provides expert guidance and strategic support in navigating the complexities of the tourism industry. This consultancy entails tailored solutions, market analyses, and innovative strategies to optimize travel experiences, enhance customer satisfaction, manage travel programs efficiently, and stay abreast of industry trends and regulations.'
	},
	'hotel-accommodation': {
		title: 'Hotel & Accommodation',
		img: {
			alt: 'Hotel & Accommodation',
			src: Hotel
		},
		description:
			'BTM Team has an extensive hotel booking mechanism in place. Our hotel booking directories provide a comprehensive and unrivaled selection of hotel options for all our clients. Over the years, BTM has established a robust relationship with both local and global chains of hotels which we have sustained till now. Our hotel booking system combs all city destinations for the best deals that combine service and comfort.'
	},
	'industrial-training': {
		title: 'Industrial Training',
		img: {
			alt: 'Industrial Training',
			src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/ykpnleajkaitlwue0wrf'
		},
		description:
			'Industrial training provided by the BTM offers specialized programs designed to equip professionals within the travel industry with essential skills and knowledge. These training sessions cover various aspects of travel management, including industry-specific tools, technology utilization, compliance with regulations, customer service excellence, crisis management, and efficient operational practices.'
	},
	'airport-concierge': {
		title: 'Airport Concierge',
		img: {
			alt: 'Airport Concierge',
			src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/b0ytqemclwuu8vmxgl4x'
		},
		description:
			'The BTM Airport concierge services are personalized travel services that offer assistance and support to travelers at the airport. These services include meet and greet, baggage handling, airport lounge access, fast-track security clearance, and VIP Terminal access.'
	},
	'security-escort-services': {
		title: 'Security & Escort Services',
		img: {
			alt: 'Security & Escort Services',
			src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/bbo82cpyhsqmpzm1n1k8'
		},
		description:
			'We understand global trends and we have invested substantially through alliances, acquisitions, and the development of new products. We can offer our clients on a need-and-request basis Security and Escort services.'
	},
	'smb-travel-club': {
		title: 'SMB Travel Club',
		img: {
			alt: 'SMB Travel Club',
			src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/services/cgvvvq6zbtyocchra185'
		},
		description:
			'The SMB Travel Club, offered by the BTM, is an exclusive membership program tailored for small and medium-sized businesses (SMBs). It provides members with a range of perks, such as access to discounted travel services, specialized packages, priority bookings, dedicated customer support, and tailored solutions designed to meet the unique travel needs of SMBs.'
	},
	'holidays-tours': {
		title: 'Holidays & Tours',
		img: {
			alt: 'Holidays & Tours',
			src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/b4v8hgpiucqkfrm1rsjs'
		},
		description:
			'BTM is changing the holiday narrative in Nigeria and by extension Africa. From the ambience of different local places like Obudu Mountain ranch and to witnessing the annual migration of wildebeest in the peacefully atmospheric Serengeti. BTM is always delighted to help travellers understand their tour journeys in the most fascinating way they can ever imagine.'
	},
	'meeting-event-management': {
		title: 'Meeting & Event Management',
		img: {
			alt: 'Meeting & Event Management',
			src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/services/blr4qenizcixuado29y9'
		},
		description:
			'Over the years, BTM has emerged to provide the most innovative and has successfully been involved in managing, organizing, and facilitating various events and gatherings for corporate and professional purposes. MICE (Meetings, Incentives, Conferences & Events) includes business meetings, conferences, exhibitions, trade shows, product launches, incentive trips, and team-building activities.'
	},
	'jet-charter-flight-services': {
		title: 'Executive Jet Charter & Flight Clearance Services',
		img: {
			alt: 'Executive Jet Charter & Flight Clearance Services',
			src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/services/mfiberxyzwnu9ajhd0wz'
		},
		description:
			'Flight clearance services provided by the BTM involve obtaining the necessary permissions,authorizations, and clearances required for private or charter flights. These services ensure compliance with aviation regulations, secure landing rights, and facilitate smooth passage through international airspaces.'
	},
	'destination-management': {
		title: 'Destination Management',
		img: {
			alt: 'Destination Management',
			src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/uno8youadfpye6hlw7le'
		},
		description:
			'Destination management services offered by the BTM involve comprehensive oversight and coordination of travel activities within specific locations. These services encompass meticulous planning, logistical arrangements, local expertise, and on-the-ground support to ensure seamless and memorable experiences for travelers.'
	},
	'airport-transfer-ground-transportation': {
		title: 'Airport Transfers & Ground Transportation (Globally)',
		img: {
			alt: 'Airport Transfers & Ground Transportation (Globally)',
			src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/braxuh0grnf5l3btug7a'
		},
		description:
			'Airport transfers are pre-booked methods of transport for picking up travelers from an airport and dropping them off at their chosen destination, whether it be accommodation, cruise port or another local point of interest, for a set price. BTM has an extensive range of products and services, which may be specifically tailored to suit each individual clients’ requirements. Included in our bouquet of services is the BTM Nigeria Airport car transfer services.'
	},
	'travel-consultation-advice': {
		title: 'Travel Consultation & Advice',
		img: {
			alt: 'Travel Consultation & Advice',
			src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/lbnhphsn3hjpv3zfywjy'
		},
		description:
			'One of our goals at BTM is to curate specific travel services for corporate organisations and individuals that will align with their distinctive travel programmes. We can create an optimised travel service structure through our subscription models which have been designed to help your organisations with detailed travel reports to get real-time updates on travel time, booking time, and approval bottlenecks—which are leading to (costly) last-minute bookings.'
	},
	'group-travel-airline-seat-blocking': {
		title: 'Group Travel & Airline Seat Blocking',
		img: {
			alt: 'Group Travel & Airline Seat Blocking',
			src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/psexhvqza7xhlgnqxeiq'
		},
		description:
			'Group Travel and Airline Blocking services as offered by BTM have been designed purposely to cater to organizations planning travel for large groups or events. This specialized service involves coordinating and managing the logistics of group travel, including arranging flights, securing bulk bookings, and blocking seats on airlines to accommodate the specific needs of the group.'
	}
};

export async function load({ params }) {
	const pageName: string = params.id;

	const service = services[pageName];

	if (!service) throw error(404, 'Page not found!');

	return service;
}
