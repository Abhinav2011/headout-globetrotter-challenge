import axios from 'axios';

// This is a mock database
const destinationsData = [
  {
    "city": "Paris",
    "country": "France",
    "clues": [
      "This city is home to a famous tower that sparkles every night.",
      "Known as the 'City of Love' and a hub for fashion and art."
    ],
    "fun_fact": [
      "The Eiffel Tower was supposed to be dismantled after 20 years but was saved because it was useful for radio transmissions!",
      "Paris has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules."
    ],
    "trivia": [
      "This city is famous for its croissants and macarons. Bon appétit!",
      "Paris was originally a Roman city called Lutetia."
    ]
  },
  {
    "city": "Tokyo",
    "country": "Japan",
    "clues": [
      "This city has the busiest pedestrian crossing in the world.",
      "You can visit an entire district dedicated to anime, manga, and gaming."
    ],
    "fun_fact": [
      "Tokyo was originally a small fishing village called Edo before becoming the bustling capital it is today!",
      "More than 14 million people live in Tokyo, making it one of the most populous cities in the world."
    ],
    "trivia": [
      "The city has over 160,000 restaurants, more than any other city in the world.",
      "Tokyo's subway system is so efficient that train delays of just a few minutes come with formal apologies."
    ]
  },
  {
    "city": "New York",
    "country": "USA",
    "clues": [
      "Home to a green statue gifted by France in the 1800s.",
      "Nicknamed 'The Big Apple' and known for its Broadway theaters."
    ],
    "fun_fact": [
      "The Statue of Liberty was originally a copper color before oxidizing to its iconic green patina.",
      "Times Square was once called Longacre Square before being renamed in 1904."
    ],
    "trivia": [
      "New York City has 468 subway stations, making it one of the most complex transit systems in the world.",
      "The Empire State Building has its own zip code: 10118."
    ]
  },
  {
    "city": "London",
    "country": "UK",
    "clues": [
      "Home to Big Ben and the Houses of Parliament.",
      "Famous for its double-decker buses and red telephone booths."
    ],
    "fun_fact": [
      "The Great Fire of London in 1666 destroyed much of the city, but also helped to eradicate the plague.",
      "London has over 170 museums, many of which are free to enter."
    ],
    "trivia": [
      "The London Underground, or 'the Tube', was the world's first underground railway.",
      "London is home to people speaking over 300 languages."
    ]
  },
  {
    "city": "Rome",
    "country": "Italy",
    "clues": [
      "Home to the Colosseum and the Vatican City.",
      "Known for its ancient ruins and delicious pasta."
    ],
    "fun_fact": [
      "Rome has over 2,000 fountains, more than any other city in the world.",
      "The Trevi Fountain collects around €3,000 in coins every day."
    ],
    "trivia": [
      "The Pantheon, a Roman temple, is nearly 2,000 years old and still has the world's largest unreinforced concrete dome.",
      "Romans used to clean their teeth with urine."
    ]
  },
  {
    "city": "Sydney",
    "country": "Australia",
    "clues": [
      "Home to the iconic Opera House and Harbour Bridge.",
      "Known for its beautiful beaches and laid-back lifestyle."
    ],
    "fun_fact": [
      "The Sydney Opera House's roof is made of over 1 million tiles.",
      "Sydney has more than 100 beaches."
    ],
    "trivia": [
      "The Harbour Bridge is nicknamed 'The Coathanger'.",
      "Sydney was originally called Sydney Cove."
    ]
  },
  {
    "city": "Beijing",
    "country": "China",
    "clues": [
      "Home to the Forbidden City and the Great Wall of China.",
      "Known for its historical landmarks and Peking duck."
    ],
    "fun_fact": [
      "The Forbidden City has 9,999 rooms.",
      "Beijing is one of the oldest continuously inhabited cities in the world."
    ],
    "trivia": [
      "The Great Wall of China is visible from space, but only under ideal conditions.",
      "Hutongs are traditional alleyways in Beijing."
    ]
  },
  {
    "city": "Cairo",
    "country": "Egypt",
    "clues": [
      "Home to the Pyramids of Giza and the Sphinx.",
      "Known for its ancient history and bustling markets."
    ],
    "fun_fact": [
      "The Great Pyramid of Giza was built as a tomb for Pharaoh Khufu.",
      "Cairo is the largest city in Africa."
    ],
    "trivia": [
      "The Nile River is the longest river in the world.",
      "Ancient Egyptians used hieroglyphics for writing."
    ]
  },
  {
    "city": "Rio de Janeiro",
    "country": "Brazil",
    "clues": [
      "Home to the Christ the Redeemer statue and Copacabana beach.",
      "Known for its vibrant Carnival celebrations."
    ],
    "fun_fact": [
      "The Christ the Redeemer statue is made of soapstone and concrete.",
      "Rio's Carnival is one of the largest festivals in the world."
    ],
    "trivia": [
      "The Sugarloaf Mountain can be reached by a cable car.",
      "The national drink of Brazil is the caipirinha."
    ]
  },
  {
    "city": "Amsterdam",
    "country": "Netherlands",
    "clues": [
      "Known for its canals, bicycles, and tulips.",
      "Home to the Anne Frank House and the Rijksmuseum."
    ],
    "fun_fact": [
      "Amsterdam has more bicycles than people.",
      "The canals of Amsterdam are a UNESCO World Heritage Site."
    ],
    "trivia": [
      "The city is built on wooden piles.",
      "Haring (herring) is a popular street food."
    ]
  },
  {
    "city": "Barcelona",
    "country": "Spain",
    "clues": [
      "Home to the Sagrada Familia and Park Güell.",
      "Known for its unique architecture by Antoni Gaudí."
    ],
    "fun_fact": [
      "The Sagrada Familia has been under construction for over 100 years.",
      "Barcelona has beaches within the city limits."
    ],
    "trivia": [
      "La Rambla is a famous pedestrian street.",
      "Paella is a traditional Spanish dish."
    ]
  },
  {
    "city": "Dubai",
    "country": "UAE",
    "clues": [
      "Home to the Burj Khalifa, the tallest building in the world.",
      "Known for its luxury shopping and modern architecture."
    ],
    "fun_fact": [
      "Dubai is built on reclaimed land.",
      "The Dubai Mall is one of the largest shopping malls in the world."
    ],
    "trivia": [
      "Falconry is a popular sport.",
      "The Palm Jumeirah is a man-made island in the shape of a palm tree."
    ]
  },
  {
    "city": "Istanbul",
    "country": "Turkey",
    "clues": [
      "Straddles two continents: Europe and Asia.",
      "Home to the Hagia Sophia and the Blue Mosque."
    ],
    "fun_fact": [
      "Istanbul was once known as Constantinople.",
      "The Grand Bazaar is one of the oldest and largest covered markets in the world."
    ],
    "trivia": [
      "Turkish coffee is a strong and flavorful drink.",
      "Cats are considered sacred in Istanbul."
    ]
  },
  {
    "city": "Bangkok",
    "country": "Thailand",
    "clues": [
      "Known for its ornate temples and floating markets.",
      "Home to the Grand Palace and Wat Arun."
    ],
    "fun_fact": [
      "Bangkok's official name is one of the longest city names in the world.",
      "The city has numerous rooftop bars with stunning views."
    ],
    "trivia": [
      "The tuk-tuk is a popular mode of transportation.",
      "Thai cuisine is known for its balance of sweet, sour, salty, and spicy flavors."
    ]
  },
  {
    "city": "Los Angeles",
    "country": "USA",
    "clues": [
      "Home to Hollywood and the Walk of Fame.",
      "Known for its film industry and beaches."
    ],
    "fun_fact": [
      "The Hollywood sign originally read 'Hollywoodland'.",
      "Los Angeles is the entertainment capital of the world."
    ],
    "trivia": [
      "The city has hosted the Summer Olympics twice.",
      "In-N-Out Burger is a popular fast-food chain."
    ]
  },
  {
    "city": "Moscow",
    "country": "Russia",
    "clues": [
      "Home to the Kremlin and Red Square.",
      "Known for its historical landmarks and ballet."
    ],
    "fun_fact": [
      "The Kremlin is the largest active fortress in Europe.",
      "Moscow has a metro system known for its ornate stations."
    ],
    "trivia": [
      "St. Basil's Cathedral is famous for its colorful onion domes.",
      "Borscht is a traditional Russian soup."
    ]
  },
  {
    "city": "Seoul",
    "country": "South Korea",
    "clues": [
      "Home to the Gyeongbokgung Palace and the N Seoul Tower.",
      "Known for its K-pop culture and technology."
    ],
    "fun_fact": [
      "Seoul has been the capital of Korea for over 600 years.",
      "The city has a vibrant nightlife scene."
    ],
    "trivia": [
      "Kimchi is a staple food in Korean cuisine.",
      "Taekwondo is a Korean martial art."
    ]
  },
  {
    "city": "Singapore",
    "country": "Singapore",
    "clues": [
      "Known for its cleanliness and strict laws.",
      "Home to the Gardens by the Bay and Marina Bay Sands."
    ],
    "fun_fact": [
      "Singapore is a city-state.",
      "Chewing gum is banned in Singapore."
    ],
    "trivia": [
      "The Merlion is a mythical creature with the head of a lion and the body of a fish.",
      "Hawker centers offer a variety of affordable food."
    ]
  },
  {
    "city": "Toronto",
    "country": "Canada",
    "clues": [
      "Home to the CN Tower and the Royal Ontario Museum.",
      "Known for its multiculturalism and friendly people."
    ],
    "fun_fact": [
      "The CN Tower was the tallest freestanding structure in the world for 32 years.",
      "Toronto has a large underground pedestrian network."
    ],
    "trivia": [
      "Poutine is a popular Canadian dish.",
      "Toronto is home to the Hockey Hall of Fame."
    ]
  },
  {
    "city": "Berlin",
    "country": "Germany",
    "clues": [
      "Known for its history and vibrant art scene.",
      "Home to the Brandenburg Gate and the Reichstag Building."
    ],
    "fun_fact": [
      "The Berlin Wall divided the city for 28 years.",
      "Berlin has more bridges than Venice."
    ],
    "trivia": [
      "Currywurst is a popular street food.",
      "The city has numerous museums and galleries."
    ]
  },
  {
    "city": "Mumbai",
    "country": "India",
    "clues": [
      "Home to the Gateway of India and Bollywood.",
      "Known for its bustling markets and street food."
    ],
    "fun_fact": [
      "Mumbai was originally an archipelago of seven islands.",
      "The city is home to the world's largest slum, Dharavi."
    ],
    "trivia": [
      "Vada pav is a popular street food.",
      "Mumbai is the financial capital of India."
    ]
  },
  {
    "city": "Mexico City",
    "country": "Mexico",
    "clues": [
      "Built on the ruins of the Aztec capital, Tenochtitlan.",
      "Known for its historical landmarks and vibrant culture."
    ],
    "fun_fact": [
      "Mexico City is sinking at a rate of 10 inches per year.",
      "The city has a large number of museums and art galleries."
    ],
    "trivia": [
      "Tacos al pastor are a popular street food.",
      "The Day of the Dead is a major celebration."
    ]
  },
  {
    "city": "São Paulo",
    "country": "Brazil",
    "clues": [
      "The largest city in the Southern Hemisphere.",
      "Known for its diverse population and vibrant nightlife."
    ],
    "fun_fact": [
      "São Paulo has the largest Japanese population outside of Japan.",
      "The city is a major financial and cultural center."
    ],
    "trivia": [
      "Feijoada is a traditional Brazilian stew.",
      "São Paulo has a large number of parks and green spaces."
    ]
  },
  {
    "city": "Shanghai",
    "country": "China",
    "clues": [
      "Known for its futuristic skyline and bustling port.",
      "Home to the Oriental Pearl Tower and the Bund."
    ],
    "fun_fact": [
      "Shanghai is one of the fastest-growing cities in the world.",
      "The city has a magnetic levitation train."
    ],
    "trivia": [
      "Xiaolongbao (soup dumplings) are a local delicacy.",
      "Shanghai is a major center for finance and trade."
    ]
  },
  {
    "city": "Delhi",
    "country": "India",
    "clues": [
      "Home to the Red Fort and Jama Masjid.",
      "Known for its rich history and Mughal architecture."
    ],
    "fun_fact": [
      "Delhi has been the capital of India for over 1,000 years.",
      "The city is home to the Qutub Minar, the tallest brick minaret in the world."
    ],
    "trivia": [
      "Chaat is a popular street food.",
      "Delhi is a major political and cultural center."
    ]
  },
  {
    "city": "Jakarta",
    "country": "Indonesia",
    "clues": [
      "The capital of Indonesia and the largest city in Southeast Asia.",
      "Known for its traffic jams and diverse culture."
    ],
    "fun_fact": [
      "Jakarta is sinking at a rate of 10 inches per year.",
      "The city has a large number of shopping malls."
    ],
    "trivia": [
      "Nasi goreng is a popular Indonesian dish.",
      "Jakarta is home to the National Monument."
    ]
  }
];

// Mock user database
const users = {};

// Helper functions to simulate API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Fetch random destinations for the game (excluding current one if provided)
  getGameDestinations: async (currentId, count = 4) => {
    try {
      const response = await axios.get(`http://localhost:8080/headout/v1/places/random/three`, {
        params: {
          excludeId: currentId
        }
      });
      // Transform the API response to match the expected format
      return response.data.map(dest => ({
        id: dest.id,
        name: dest.city,
        country: dest.country,
        clues: dest.clues,
        funFacts: dest.fun_fact,
        image: ""
      }));

    } catch (error) {
      console.error('Error fetching other destinations:', error);
      // Fallback to local data if API fails  
      console.log("I am coming here");
      const availableDestinations = currentId 
        ? destinationsData.filter(dest => dest.city.toLowerCase() !== currentId.toLowerCase())
        : [...destinationsData];
      
      const shuffled = availableDestinations.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3).map(dest => ({
        id: dest.city.toLowerCase(),
        name: dest.city,
        country: dest.country,
        clues: dest.clues,
        funFacts: dest.fun_fact,
        image: ""
      }));
    }
  },
  
  // Get a single random destination  
  getRandomDestination: async () => {
    try {
      const response = await axios.get('http://localhost:8080/headout/v1/places/random');
      console.log(response.data);
      // Transform API response 
      return {
        id: response.data.id,
        name: response.data.city,
        country: response.data.country,
        clues: response.data.clues,
        funFacts: response.data.fun_fact,
        image: ""
      };
    } catch (error) {
      console.error('Error fetching random destination:', error);
      const randomIndex = Math.floor(Math.random() * destinationsData.length);
      return destinationsData[randomIndex];
    }
  },
  
  // Create or update a user
  saveUser: async (username, score) => {
    await delay(400); // Simulate network delay
    
    if (!users[username]) {
      // Create new user if it doesn't exist
      users[username] = {
        username,
        score: score || { correct: 0, incorrect: 0, total: 0 }
      };
    } else if (score) {
      // Update score if provided
      users[username].score = score;
    }
    
    return users[username];
  },
  
  // Get a user by username
  getUser: async (username) => {
    await delay(300); // Simulate network delay
    return users[username] || null;
  },
  
  // Update user score
  updateUserScore: async (username, correct) => {
    await delay(300); // Simulate network delay
    
    if (!users[username]) {
      throw new Error("User not found");
    }
    
    const user = users[username];
    if (correct) {
      user.score.correct += 1;
    } else {
      user.score.incorrect += 1;
    }
    user.score.total += 1;
    
    return user;
  }
};
