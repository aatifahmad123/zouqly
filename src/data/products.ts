export interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  description: string;
  features: string[];
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 'MIX70',
    name: 'Premium Mix Dryfruits',
    weight: '70 gm',
    price: 120,
    description: 'A balanced mix of Almonds, Cashews, Pistachios & Walnuts – the perfect on-the-go energy pack.',
    features: [
      'Nutritious blend of dry fruits',
      'Perfect for office, travel & gifting',
      'Hygienically sealed for freshness',
      'Balanced source of vitamins & minerals'
    ],
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Mix'
  },
  {
    id: 'CAS100',
    name: 'Premium Cashews',
    weight: '100 gm',
    price: 250,
    description: 'Crunchy, creamy cashews packed with healthy fats, protein, and minerals.',
    features: [
      'Perfect snack & recipe ingredient',
      'Premium vacuum-sealed packaging',
      'No added colors or preservatives',
      'Great for desserts, gravies & gifting'
    ],
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Cashews'
  },
  {
    id: 'PST100',
    name: 'Premium Pistachios',
    weight: '100 gm',
    price: 250,
    description: 'Naturally crunchy pistachios, rich in antioxidants and essential nutrients.',
    features: [
      'Roasted & lightly salted',
      'Heart-healthy & cholesterol-free',
      'Premium resealable pack',
      'Ideal for snacks & garnishing'
    ],
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Pistachios'
  },
  {
    id: 'ALM125',
    name: 'Premium Almonds',
    weight: '125 gm',
    price: 250,
    description: 'Handpicked California almonds, rich in protein, fiber, and antioxidants. Perfect for daily snacking, festive gifting, and healthy recipes.',
    features: [
      '100% Natural & Fresh',
      'Premium food-grade packaging',
      'No preservatives, no artificial flavors',
      'Boosts energy, immunity & brain health'
    ],
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Almonds'
  },
  {
    id: 'WAL150',
    name: 'Premium Walnuts',
    weight: '150 gm',
    price: 325,
    description: 'Brain-boosting superfood rich in Omega-3 fatty acids, antioxidants & proteins.',
    features: [
      'Fresh, crunchy walnut kernels',
      'Great for baking, smoothies & snacking',
      'Premium airtight packaging',
      'No chemicals or preservatives'
    ],
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Walnuts'
  },
  {
    id: 'CAS200',
    name: 'Premium Cashews - Family Pack',
    weight: '200 gm',
    price: 450,
    description: 'Family-size premium pack for regular consumption & gifting.',
    features: [
      '100% Natural & Fresh',
      'Premium food-grade packaging',
      'No preservatives, no artificial flavors',
      'Boosts energy, immunity & brain health'
    ],
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Cashews'
  },
  {
    id: 'PST200',
    name: 'Premium Pistachios - Family Pack',
    weight: '200 gm',
    price: 450,
    description: 'Larger pack for families & gifting occasions.',
    features: [
      '100% Natural & Fresh',
      'Premium food-grade packaging',
      'No preservatives, no artificial flavors',
      'Boosts energy, immunity & brain health'
    ],
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Pistachios'
  },
  {
    id: 'ALM250',
    name: 'Premium Almonds - Family Pack',
    weight: '250 gm',
    price: 425,
    description: 'Handpicked California almonds, rich in protein, fiber, and antioxidants. Perfect for daily snacking, festive gifting, and healthy recipes.',
    features: [
      '100% Natural & Fresh',
      'Premium food-grade packaging',
      'No preservatives, no artificial flavors',
      'Boosts energy, immunity & brain health'
    ],
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Almonds'
  }
];
