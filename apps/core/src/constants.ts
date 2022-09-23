import { Marker } from "cobe";

const homePageImages: string[] = [
  'https://images.unsplash.com/photo-1573162915955-6a8ba9d2fe20?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1769&q=80',
  'https://images.unsplash.com/photo-1573164713347-df1f7d6aeb03?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1769&q=80',
  'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
  'https://images.unsplash.com/photo-1612299273045-362a39972259?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1771&q=80',
  'https://images.unsplash.com/photo-1612299273045-362a39972259?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1771&q=80',
  'https://images.unsplash.com/photo-1612299273045-362a39972259?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1771&q=80',
  'https://images.unsplash.com/photo-1573164574397-dd250bc8a598?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1769&q=80',
  'https://images.unsplash.com/photo-1573496800440-5c9c48a8d0f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
  'https://images.unsplash.com/photo-1573166953836-06864dc70a21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80',
];

const experienceTitles: string[] = [
  'Software Engineer',
  'Junior Developers',
  'Students',
  'Career Switchers',
  'Interns',
  'Cyber Security',
  'Self Taught',
  'Freelancers',
  'Bootcampers',
  'Mentors',
  'Co-Founders',
  'Analysts',
  'Data Engineers',
];

const pillars: { label: string; heading: string; description: string }[] = [
  {
    label: 'EQUITY',
    heading: 'Equality is key',
    description:
      'We respect and value people of all backgrounds no matter the experience level. Together, we create a more equal place to learn and collaborate with others.',

  },
  {
    label: 'EDUCATION',
    heading: 'Knowledge is power',
    description:
      'We believe that knowledge transfer between members within the community is the key to a persons education.',
  },
  {
    label: 'COLLABORATION',
    heading: 'A Common Vision',
    description:
      'Our community thrives as we build and work toward a common goal. To consistently thrive, we promote a culture of collaboration and respect.',
  },
];

const whyUsContent: { heading: string; subHeading: string }[] = [
  {
    heading: '800+',
    subHeading: 'Members',
  },
  {
    heading: '24 / 7',
    subHeading: 'relaxed space',
  },
  {
    heading: '13+',
    subHeading: 'Shared Projects',
  },
  {
    heading: '$0',
    subHeading: 'to join',
  },
];

const markers: Marker[] = [
  { location: [32.776665, -96.796989], size: 0.1 }, // Dallas
  { location: [40.712776, -74.005974], size: 0.1 }, // New York
  { location: [6.524379, 3.379206], size: 0.1 }, // Lagos
  { location: [37.774929, -122.419418], size: 0.1 }, // San Francisco
  { location: [48.856613, 2.352222], size: 0.1 }, // Paris
  { location: [51.507351, -0.127758], size: 0.1 }, // London
  { location: [35.6762, 139.6503], size: 0.1 }, // Tokyo
  { location: [28.6139, 77.209], size: 0.1 }, // New Delhi
  { location: [-33.8688, 151.2093], size: 0.1 }, // Sydney
  { location: [-33.9249, 18.4241], size: 0.1 }, // Cape town
  { location: [18.1096, -77.2975], size: 0.1 }, // Jamaica
  { location: [-15.7975, -47.8919], size: 0.1 }, // Brazil
];


export { homePageImages, experienceTitles, pillars, whyUsContent, markers };
