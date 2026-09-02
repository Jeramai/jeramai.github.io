import Project from '@/types/project';

// Sample Projects Data
const projects: Project[] = [
  {
    title: 'Camera rep engine',
    category: 'AI and vision',
    description:
      'A pure-TypeScript engine that turns a phone camera into a verified rep counter. Pose estimation runs on device with TFLite, and the engine decides what counts as a real repetition rather than trusting raw keypoints. No camera and no clock inside it, so it is testable without either.',
    image: '/projects/rep-engine.svg',
    tags: ['TypeScript', 'TensorFlow.js', 'TFLite', 'Vision Camera', 'Closed source']
  },
  {
    title: 'AI backend-for-frontend',
    category: 'AI and vision',
    description:
      'A NestJS service that puts LLM features in front of a real product: recommendations, extraction and search over live inventory. Schema-validated responses, caching and rate limits, so the front-end can treat a model like any other dependency.',
    image: '/projects/ai-bff.svg',
    tags: ['NestJS', 'Anthropic SDK', 'Zod', 'Closed source']
  },
  {
    title: 'nestjs-doctor',
    category: 'Open source',
    description:
      'A deterministic static-analysis CLI for NestJS that catches the mistakes AI code assistants make. I contributed inline rule suppression, so a team can silence a rule at the exact line instead of switching it off for the whole project.',
    image: '/projects/nestjs-doctor.png',
    demo: 'https://nestjs.doctor',
    github: 'https://github.com/RoloBits/nestjs-doctor',
    tags: ['TypeScript', 'Static analysis', 'Open source']
  },
  {
    title: 'Cast Anything',
    category: 'Full Stack',
    description:
      "A mobile app that casts video, music and photos from a phone to a Samsung TV. Samsung's Tizen does not support Chromecast, so the app uses DLNA: it discovers the TV over SSDP, serves the file from a small HTTP server on the phone, and drives playback with AVTransport.",
    image: '/projects/cast-anything.png',
    github: 'https://github.com/Jeramai/cast-anything',
    tags: ['Expo', 'React Native', 'TypeScript']
  },
  {
    title: 'Sonos Subs',
    category: 'Front-end',
    description:
      'A browser extension that adds synchronised lyrics to the Sonos web app, with karaoke-style highlighting. It also adds scroll-wheel volume control, picture-in-picture album artwork, desktop notifications and OS media key support.',
    image: '/projects/sonos-subs.jpg',
    github: 'https://github.com/Jeramai/sonos-subs-extension',
    tags: ['JavaScript', 'Chrome Extension']
  },
  {
    title: 'Virtutec: SalCon, ProCon, SerCon',
    category: 'Full Stack',
    description:
      'A 3D platform for manufacturers, and the three products built on it: a sales configurator that prices a machine as you build it, step-by-step visual work instructions on the factory floor, and a spare-part finder that lets a customer click the part they need. Laravel and Next.js behind a Three.js viewer.',
    image: '/projects/salcon.png',
    demo: 'https://viewer.salcon.live/viewer/demo',
    tags: ['Laravel', 'Next.js', 'Three.js', 'Ionic', 'AR/VR']
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
    description:
      'A chatbot was developed and implemented to optimize and streamline workflows within the Dutch Tax Department by automating routine inquiries and providing instant access to information, enhancing efficiency and reducing the workload on human agents.',
    image: '/projects/chatbot.jpg',
    github: '',
    demo: '',
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
    demo: 'https://ronin-nft-trading.vercel.app/',
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
