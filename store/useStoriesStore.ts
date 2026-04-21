import { Story } from '@/app/(tabs)/components/StoriesModal';
import { create } from 'zustand';

type StoriesStore = {
  stories: Story[];
  visible: boolean;
  open: (stories: Story[]) => void;
  close: () => void;
};

const useStoriesStore = create<StoriesStore>((set) => ({
  stories: [],
  visible: false,
  open: (stories) => set({ stories, visible: true }),
  close: () => set({ visible: false }),
}));

export default useStoriesStore;
