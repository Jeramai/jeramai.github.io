import Project from '@/types/project';

// Sample Projects Data
const projects: Project[] = [
  {
    title: 'Virtutec Platform',
    category: 'Full Stack',
    description:
      'Virtutec streamlines business processes in sales, production, and service by creating digital applications (VR, AR, apps) from 3D data, enhancing visualization and interaction.',
    image: '/projects/virtutec.png',
    demo: 'https://virtutec.io',
    tags: ['Laravel', 'Next.js', 'Tailwind CSS']
  },
  {
    title: 'SalCon',
    category: 'Full Stack',
    description:
      "SalCon, Virtutec's 3D sales configurator, improves the sales process and customer experience by enabling real-time product visualization and configuration.",
    image: '/projects/salcon.png',
    demo: 'https://viewer.salcon.live/viewer/demo',
    tags: ['Laravel', 'Next.js', 'Tailwind CSS', 'Three.js']
  },
  {
    title: 'ProCon',
    category: 'Full Stack',
    description:
      'Procon optimizes production by providing visual step-by-step instructions, ensuring process consistency, reducing errors, and improving operator efficiency.',
    image: '/projects/procon.png',
    demo: 'https://app.procon.live/viewer/demo',
    tags: ['Laravel', 'Next.js', 'Tailwind CSS', 'Three.js']
  },
  {
    title: 'SerCon',
    category: 'Full Stack',
    description:
      'SerCon streamlines replacement part identification and ordering, enhancing customer service and reducing errors through automated processes and a comprehensive database.',
    image: '/projects/sercon.png',
    demo: 'https://app.sercon.live/viewer/demo',
    tags: ['Laravel', 'Next.js', 'Tailwind CSS', 'Three.js', 'Ionic']
  },
  {
    title: 'Automated Model Converter',
    category: 'Full Stack',
    description:
      'A tool was developed to automatically convert complex 3D files, including CAD formats, into optimized, web-performant formats, enabling seamless integration of 3D models into web applications.',
    image: '/projects/amc.jpg',
    tags: ['Python', 'Laravel'],
    aiImage: true
  },
  {
    title: 'ROCVA Digital Tours',
    category: 'Front-end',
    description:
      'A cross-platform mobile application was developed to provide prospective students with an immersive virtual tour of their future school environments, enhancing their understanding and reducing pre-attendance anxiety.',
    image: '/projects/rocva.webp',
    tags: ['Flutter']
  },
  {
    title: 'Chat bot Dutch Tax Department',
    category: 'Full Stack',
    description: '',
    image: '/projects/chatbot.jpg',
    demo: 'A chatbot was developed and implemented to optimize and streamline workflows within the Dutch Tax Department by automating routine inquiries and providing instant access to information, enhancing efficiency and reducing the workload on human agents.',
    github: '',
    tags: ['Java'],
    aiImage: true
  },
  {
    title: 'Planet Crashers',
    category: 'Game',
    description:
      "My first realeased game, a 'shoot and merge' title with a focus on gravity simulation, providing a unique (and addicting) gameplay experience.",
    image: '/projects/planet-crashers.jpg',
    demo: 'https://jeramai.github.io/Planet-Crashers/',
    github: 'https://github.com/Jeramai/Planet-Crashers',
    tags: ['Next.js', 'Three.js'],
    aiImage: true
  },
  {
    title: 'Ronin NFT Swap',
    category: 'Full Stack',
    description:
      'As my first solo Web3 project, I developed and launched a decentralized application on the Ronin blockchain, enabling users to directly swap NFTs, providing a valuable community tool and demonstrating my blockchain development capabilities.',
    image: '/projects/ronin-nft-swap.png',
    demo: '',
    github: 'https://github.com/Jeramai/RON-NFT-Swap',
    tags: ['Next.js', 'web3.js']
  },
  {
    title: 'SVG to 3D',
    category: 'Full Stack',
    description:
      'Rapidly convert any SVG image into a 3D model, simplifying 3D asset creation and bridging the gap between 2D and 3D design.',
    image: '/projects/svg-3d.png',
    demo: 'https://jeramai.github.io/svg-to-3d/',
    github: 'https://github.com/Jeramai/svg-to-3d',
    tags: ['Node.js'],
    aiImage: true
  }
  // TuinKeur
  // FlashCardFrenzy
  // Christmas Tree
  // Fireworks
  // Measurement tape
  // Out of view Indicator
  // Foodwheel
];

export default projects;
