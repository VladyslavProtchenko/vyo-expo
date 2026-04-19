import { STORAGE_URL } from '@/config/supabase';

export type ForestSession = {
  id: number;
  title: string;
  duration: number; // seconds
  audioUrl: string;
  image: string;
};

const BASE = `${STORAGE_URL}/sounds/forest-bathing`;
const BG = `${STORAGE_URL}/content/stress-management/stress-5.webp`;

export const forestSessions: ForestSession[] = [
  { id: 1,  title: 'Rain on Roof',          duration: 920, audioUrl: `${BASE}/rain-on-roof.mp3`,         image: BG },
  { id: 2,  title: 'Rain',                  duration: 100, audioUrl: `${BASE}/rain.mp3`,                  image: BG },
  { id: 3,  title: 'Summer Rain',           duration: 266, audioUrl: `${BASE}/summer-rain.mp3`,           image: BG },
  { id: 4,  title: 'Sound of Rain',         duration: 100, audioUrl: `${BASE}/sound-of-rain.mp3`,         image: BG },
  { id: 5,  title: 'Art of Rain',           duration: 125, audioUrl: `${BASE}/art-of-rain.mp3`,           image: BG },
  { id: 6,  title: 'Tropical Forest Night', duration: 462, audioUrl: `${BASE}/tropical-forest-night.mp3`, image: BG },
  { id: 7,  title: 'Blooming Meadow',       duration: 176, audioUrl: `${BASE}/blooming-meadow.mp3`,       image: BG },
  { id: 8,  title: 'Village Atmosphere',    duration: 334, audioUrl: `${BASE}/village-atmosphere.mp3`,    image: BG },
  { id: 9,  title: 'Evening Crickets',      duration: 537, audioUrl: `${BASE}/evening-crickets.mp3`,      image: BG },
  { id: 10, title: 'Night Owl Sounds',      duration: 182, audioUrl: `${BASE}/night-owl-sounds.mp3`,      image: BG },
  { id: 11, title: 'Tropical Waves',        duration: 205, audioUrl: `${BASE}/tropical-waves.mp3`,        image: BG },
  { id: 12, title: 'Waves and Wind',        duration: 324, audioUrl: `${BASE}/waves-and-wind.mp3`,        image: BG },
  { id: 13, title: 'Surf',                  duration: 433, audioUrl: `${BASE}/surf.mp3`,                  image: BG },
  { id: 14, title: 'Wind',                  duration:  64, audioUrl: `${BASE}/wind.mp3`,                  image: BG },
  { id: 15, title: 'Mountain Silence',      duration: 486, audioUrl: `${BASE}/mountain-silence.mp3`,      image: BG },
  { id: 16, title: 'Summer Field',          duration: 130, audioUrl: `${BASE}/summer-field.mp3`,          image: BG },
  { id: 17, title: 'Dawn',                  duration: 637, audioUrl: `${BASE}/dawn.mp3`,                  image: BG },
  { id: 18, title: 'Calm Piano',            duration: 141, audioUrl: `${BASE}/calm-piano.mp3`,            image: BG },
  { id: 19, title: 'Harmony',               duration: 153, audioUrl: `${BASE}/harmony.mp3`,               image: BG },
  { id: 20, title: 'Constancy',             duration: 158, audioUrl: `${BASE}/constancy.mp3`,             image: BG },
  { id: 21, title: 'One More Dream',        duration: 171, audioUrl: `${BASE}/one-more-dream.mp3`,        image: BG },
  { id: 22, title: 'Sad Moments',           duration: 135, audioUrl: `${BASE}/sad-moments.mp3`,           image: BG },
  { id: 23, title: 'Go to Sleep, My Love',  duration: 143, audioUrl: `${BASE}/go-to-sleep-my-love.mp3`,   image: BG },
];
