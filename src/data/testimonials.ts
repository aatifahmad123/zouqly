export interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    image: string;
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Aatif Ahmad',
        role: 'Regular Customer',
        content: 'The Premium Mix Dryfruits are a game-changer! Perfectly roasted and so fresh. My family loves the quality and taste. The winter offer was a great deal!',
        rating: 5,
        image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
        id: 2,
        name: 'Hasan Ayaz',
        role: 'Health Enthusiast',
        content: 'I\'ve been ordering the Premium Almonds every month. The quality is consistently excellent, and they stay fresh for weeks. Highly recommended!',
        rating: 5,
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
        id: 3,
        name: 'Fariha Ahmad',
        role: 'Fitness Trainer',
        content: 'The pistachios are the best I\'ve ever had. Perfectly salted and so addictive! My clients love them as a healthy snack option.',
        rating: 4,
        image: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
];
