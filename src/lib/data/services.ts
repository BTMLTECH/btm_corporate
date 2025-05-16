import Visa from '$lib/images/services/visa.webp';
import Hotel from '$lib/images/services/hotel-accomodation.webp';

const services = [
    {
        title: 'Aviation Consultancy',
        href: '/services/aviation-consultancy',
        img: {
            alt: 'Aviation Consultancy',
            src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/epqfsjnwqzzgrjfgog1i'
        },
        description:
            "BTM parades an array of Consultants who are highly experienced and trained to supply end-to-end consultancy and professional training. Our expertise in aviation transcends beyond local aviation, it also comes with global valued proposition services which centre around different aviation markets' specifications and we are able to provide a high level of aviation management services to our Clients' engagements."
    },
    {
        title: 'Visa Assistance & Consultation',
        href: '/services/visa-assistance-consultation',
        img: {
            alt: 'Visa Assistance & Consultation',
            src: "https://res.cloudinary.com/dafsjzwqf/image/upload/v1747383981/visa-assistance_mbb8zt.jpg"
        },
        description:
                  "As an extension of Business Travel Management (BTM) Limited, BTM Ghana offers a comprehensive range of products and services tailored to meet the specific needs of each client. Included in our bouquet of services is the BTM Ghana Visa and Immigration services, BTM Ghana's dedicated team provides efficient visa and immigration support to clients. Our Visa and Immigration department is wholly owned and operated by BTM, ensuring seamless integration with our broader travel management services. Utilizing the resources and expertise of BTM Limited, BTM Ghana delivers customized solutions to clients in Ghana, combining local knowledge with the strengths of the BTM network.",
    },
    {
        title: 'Tourism Consultancy',
        href: '/services/tourism-consultancy',
        img: {
            alt: 'Tourism Consultancy',
            src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/v1747384081/tourism-consultancy_xmxs9s.jpg'
        },
        description:
            "BTM’s Tourism Consultancy Service offers expert guidance and strategic support to help clients successfully navigate the dynamic and complex tourism industry. Our consultancy provides tailored solutions, in-depth market analysis, and innovative strategies designed to enhance travel experiences, boost customer satisfaction, streamline travel program management, and ensure compliance with evolving industry trends and regulations.",
    },
    {
        title: 'Hotel Booking',
        href: '/services/hotel-booking',
        img: {
            alt: 'Hotel Booking',
            src: "https://res.cloudinary.com/dafsjzwqf/image/upload/v1747384148/hotel-booking_qzryrt.jpg"
        },
        description:
            "BTM offers a sophisticated and efficient hotel booking system designed to meet the diverse needs of our clients. Through our extensive directory, we provide access to a wide selection of hotels—ranging from local favorites to renowned international chains—ensuring options that suit every preference and budget. Over the years, we have cultivated strong partnerships with leading hotel brands globally, allowing us to consistently secure the best available rates. Our system searches across all major destinations to deliver deals that balance exceptional comfort with outstanding value.",
    },
    // {
    //     title: 'Industrial Training',
    //     href: '/services/industrial-training',
    //     img: {
    //         alt: 'Industrial Training',
    //         src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/f_auto,q_auto/v1/BTM-Website/ykpnleajkaitlwue0wrf'
    //     },
    //     description:
    //         'Industrial training provided by the BTM offers specialized programs designed to equip professionals within the travel industry with essential skills and knowledge. These training sessions cover various aspects of travel management, including industry-specific tools, technology utilization, compliance with regulations, customer service excellence, crisis management, and efficient operational practices.'
    // },
    {
        title: 'Airport Concierge',
        href: '/services/airport-concierge',
        img: {
            alt: 'Airport Concierge & Transfer',
            src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/v1747385081/airport-concierge_txl8ig.jpg'
        },
        description:
            "BTM offers a premium range of Airport Concierge and Transfer Services designed to ensure a seamless, stress-free travel experience from arrival to final destination. Our personalized concierge services include meet and greet, baggage assistance, fast-track security clearance, airport lounge access, and VIP terminal handling—delivering exceptional comfort and efficiency at every stage of your airport journey. In addition, our Airport Transfer Services provide reliable, pre-arranged transportation from the airport to your preferred destination—whether a hotel, cruise port, business location, or local attraction. With a diverse fleet and flexible options, we tailor each transfer to meet the specific needs of individual travelers or groups. At BTM, we combine professionalism, convenience, and attention to detail to enhance your airport experience and ground transportation with the highest standards of service.",
    },
    {
        title: 'Security & Escort Services',
        href: '/services/security-escort-services',
        img: {
            alt: 'Security & Escort Services',
            src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/v1747385138/security-escort_crmee3.jpg'
        },
        description:
            'We understand global trends and we have invested substantially through alliances, acquisitions, and the development of new products. We can offer our clients on a need-and-request basis Security and Escort services.'
    },
    {
        title: 'SMB Travel Club',
        href: '/services/smb-travel-club',
        img: {
            alt: 'SMB Travel Club',
            src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/v1747385198/smb_hgm9aq.jpg'
        },
        description:
            'The SMB Travel Club, offered by the BTM, is an exclusive membership program tailored for small and medium-sized businesses (SMBs). It provides members with a range of perks, such as access to discounted travel services, specialized packages, priority bookings, dedicated customer support, and tailored solutions designed to meet the unique travel needs of SMBs.'
    },
    {
        title: 'Holidays & Tours',
        href: '/services/holidays-tours',
        img: {
            alt: 'Holidays & Tours',
            src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/v1747385258/holiday-tours_zfevj2.jpg'
        },
        description:
            'BTM is changing the holiday narrative in Nigeria and by extension Africa. From the ambience of different local places like Obudu Mountain ranch and to witnessing the annual migration of wildebeest in the peacefully atmospheric Serengeti. BTM is always delighted to help travellers understand their tour journeys in the most fascinating way they can ever imagine.'
    },
    {
        title: 'Meeting & Event Management',
        href: '/services/meeting-event-management',
        img: {
            alt: 'Meeting & Event Management',
            src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/v1747385450/meeting-event-management-1_rkcpms.jpg'
        },
        description:
            'Over the years, BTM has emerged to provide the most innovative and has successfully been involved in managing, organizing, and facilitating various events and gatherings for corporate and professional purposes. MICE (Meetings, Incentives, Conferences & Events) includes business meetings, conferences, exhibitions, trade shows, product launches, incentive trips, and team-building activities.'
    },
    {
        title: 'Executive Jet Charter & Flight Clearance Services',
        href: '/services/jet-charter-flight-services',
        img: {
            alt: 'Executive Jet Charter & Flight Clearance Services',
            src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/v1747385546/jet-charter-3_pakiat.jpg'
        },
        description:
            'Flight clearance services provided by the BTM involve obtaining the necessary permissions,authorizations, and clearances required for private or charter flights. These services ensure compliance with aviation regulations, secure landing rights, and facilitate smooth passage through international airspaces.'
    },
    {
        title: 'Destination Management',
        href: '/services/destination-management',
        img: {
            alt: 'Destination Management',
            src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/v1747387427/destination-management-1_lazvtf.jpg'
        },
        description:
            'Destination management services offered by the BTM involve comprehensive oversight and coordination of travel activities within specific locations. These services encompass meticulous planning, logistical arrangements, local expertise, and on-the-ground support to ensure seamless and memorable experiences for travelers.'
    },
    {
        title: 'Airport Transfers & Ground Transportation (Globally)',
        href: '/services/airport-transfer-ground-transportation',
        img: {
            alt: 'Airport Transfers & Ground Transportation (Globally)',
            src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/v1747387537/airport-transfer-1_uxhvya.jpg'
        },
        description:
            'Airport transfers are pre-booked methods of transport for picking up travelers from an airport and dropping them off at their chosen destination, whether it be accommodation, cruise port or another local point of interest, for a set price. BTM has an extensive range of products and services, which may be specifically tailored to suit each individual clients’ requirements. Included in our bouquet of services is the BTM Nigeria Airport car transfer services.'
    },
    {
        title: 'Travel Advisory Services',
        href: '/services/travel-advisory-services',
        img: {
            alt: 'Travel Advisory Services',
            src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/v1747387756/travel-advisory-1_de7tfl.jpg'
        },
        description:
            "At BTM, we specialize in providing tailored travel advisory services for both corporate organizations and individual clients. Our goal is to support the development of efficient, cost-effective, and responsive travel programs aligned with each client’s unique travel needs.Through our structured subscription models, we offer expert guidance and real-time insights that help organizations streamline their travel operations.\n Our advisory services include detailed travel reporting and analytics—tracking key metrics such as travel time, booking patterns, and approval delays—to identify inefficiencies and reduce costly last-minute bookings. With BTM's strategic travel advice, clients gain the clarity and control needed to optimize travel planning, improve decision-making, and ensure compliance with internal policies."
    },
    {
        title: 'Group Travel & Airline Seat Blocking',
        href: '/services/group-travel-airline-seat-blocking',
        img: {
            alt: 'Group Travel & Airline Seat Blocking',
            src: 'https://res.cloudinary.com/dafsjzwqf/image/upload/v1747387832/group-travel_zoqfto.jpg'
        },
        description:
            'BTM offers specialized Group Travel and Airline Seat Blocking services for organizations planning travel for events, conferences, or large delegations. We manage end-to-end logistics, including bulk flight bookings and advance seat reservations, ensuring availability, cost-efficiency, and convenience. Our solutions are tailored to meet the specific needs of each group, with dedicated support every step of the way.'
    }
];

export default services