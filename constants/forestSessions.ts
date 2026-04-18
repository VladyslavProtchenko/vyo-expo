export type ForestSession = {
  id: number;
  title: string;
  duration: number; // minutes
  audioUrl: string;
  image: number;
};

const TEST_AUDIO = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export const forestSessions: ForestSession[] = [
  {
    id: 1,
    title: 'Forest bathing',
    duration: 15,
    audioUrl: TEST_AUDIO,
    image: require('@/assets/images/stress-management/stress-5.webp'),
  },
  {
    id: 2,
    title: 'Forest bathing',
    duration: 25,
    audioUrl: TEST_AUDIO,
    image: require('@/assets/images/stress-management/stress-5.webp'),
  },
  {
    id: 3,
    title: 'Forest bathing',
    duration: 30,
    audioUrl: TEST_AUDIO,
    image: require('@/assets/images/stress-management/stress-5.webp'),
  },
];
