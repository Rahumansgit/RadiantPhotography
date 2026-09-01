export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
];

const img = (id, orientation = 'landscape') =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=85&${orientation === 'portrait' ? 'h=2100' : 'h=1100'}`;

export const portfolio = [
  { id: 1, category: 'Wedding', title: 'The quiet yes', location: 'Pokolbin, NSW', image: img('1519741497674-611481863552', 'portrait'), alt: 'Newlyweds embracing in a sunlit field' },
  { id: 2, category: 'Maternity', title: 'A beginning', location: 'Byron Bay, NSW', image: img('1544005313-94ddf0286df2', 'portrait'), alt: 'Woman in a flowing dress outdoors at golden hour' },
  { id: 3, category: 'Kids', title: 'Wild-hearted', location: 'Melbourne, VIC', image: img('1503454537195-1dcabb73ffb9'), alt: 'Child laughing in a warm sunlit room' },
  { id: 4, category: 'Models', title: 'After light', location: 'Sydney, NSW', image: img('1483985988355-763728e1935b', 'portrait'), alt: 'Fashion portrait in a sculptural black outfit' },
  { id: 5, category: 'Wedding', title: 'Before the music', location: 'Mudgee, NSW', image: img('1511285560929-80b456fea0bc'), alt: 'Bride and groom walking through a garden' },
  { id: 6, category: 'Maternity', title: 'Soft architecture', location: 'Surry Hills, NSW', image: img('1490481651871-ab68de25d43d', 'portrait'), alt: 'Editorial maternity portrait against a cream wall' },
  { id: 7, category: 'Kids', title: 'Sunday colour', location: 'Newcastle, NSW', image: img('1516627145497-ae6968895b74'), alt: 'Two children playing together outside' },
  { id: 8, category: 'Models', title: 'Still / moving', location: 'Brunswick, VIC', image: img('1539109136881-3be0616acf4b', 'portrait'), alt: 'Model in red editorial fashion styling' },
  { id: 9, category: 'Wedding', title: 'Golden hour', location: 'Orange, NSW', image: img('1519225421980-715cb0215aed'), alt: 'Couple holding hands beneath a veil' },
  { id: 10, category: 'Kids', title: 'Small worlds', location: 'Geelong, VIC', image: img('1472162072942-cd5147eb3902'), alt: 'Child looking through a window' },
  { id: 11, category: 'Models', title: 'The in-between', location: 'Sydney, NSW', image: img('1529139574466-a303027c1d8b', 'portrait'), alt: 'Model posing in a warm studio' },
  { id: 12, category: 'Maternity', title: 'Held close', location: 'Noosa, QLD', image: img('1531995811006-35cb42e1a022'), alt: 'Expectant mother walking by the ocean' },
];

export const services = [
  { number: '01', name: 'Weddings', short: 'The whole, beautiful day.', image: img('1519741497674-611481863552', 'portrait'), description: 'Not just the grand gestures. The hands under the table, your father trying not to cry, the room before everyone arrives. We make an honest, artful record of the day as it actually felt.', details: ['Full day and intimate coverage', 'Two photographers available', 'A considered heirloom album', 'Private online gallery'] },
  { number: '02', name: 'Maternity', short: 'A body becoming a story.', image: img('1531995811006-35cb42e1a022', 'portrait'), description: 'A quiet session made around you. At home, in the landscape, or in our light-filled studio — we keep things unhurried, comfortable, and entirely yours.', details: ['Studio, home or location sessions', 'Styling guidance before we meet', 'Film-inspired digital edit', 'Fine art print options'] },
  { number: '03', name: 'Kids', short: 'The magic in the mess.', image: img('1503454537195-1dcabb73ffb9'), description: 'Children do not need to perform for a photograph. We follow the energy, notice the little things, and leave room for the real personality to show up.', details: ['Family and milestone sessions', 'Play-led, gentle direction', 'Indoor and outdoor locations', 'Gallery of 50+ photographs'] },
  { number: '04', name: 'Models', short: 'Presence, in every frame.', image: img('1539109136881-3be0616acf4b', 'portrait'), description: 'Editorial portraiture for people and brands with something to say. We bring a calm set, a sharp eye, and images with enough life to stay with you.', details: ['Lookbook and campaign work', 'Creative direction available', 'Studio or location production', 'Web-ready and print files'] },
];

export const testimonials = [
  { quote: 'There is a stillness to Radiant photographs. Looking at them feels like being back inside the day, not looking at it from the outside.', name: 'Mia & Tom', detail: 'Wedding, Mudgee' },
  { quote: 'We forgot we were being photographed. That is the highest compliment I can give anyone with a camera.', name: 'The Hart family', detail: 'Family session, Newcastle' },
  { quote: 'The images have a pulse. They gave our little collection a point of view, not just a catalogue of clothes.', name: 'Elise, Founder', detail: 'Campaign, Sydney' },
];
