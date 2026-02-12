import { create } from 'zustand';
import { CurrentPhaseInfo, PhaseName } from './phase';

type menstrualNutrients = 'iron' | 'magnesium' | 'potassium' | 'omega-3' | 'vitamin-b';
type follicularNutrients = 'magnesium' | 'choline' | 'vitamin-b';
type ovulationNutrients = 'antioxidants' | 'magnesium' | 'fiber' | 'choline' | 'methionine-cysteine';
type lutealNutrients = 'vitamin-b6' | 'fiber' | 'omega-3' | 'vitamin-e' | 'magnesium';

export interface nutrientsInfo {
  nutrients: string[];
  tips: string[];
}

export interface ProductsInfo {
  menstrual: {
    tips: string[];
    nutrients: menstrualNutrients[];
  };
  follicular: {
    tips: string[];
    nutrients: follicularNutrients[];
  };
  ovulation: {
    tips: string[];
    nutrients: ovulationNutrients[];
  };
  luteal: {
    tips: string[];
    nutrients: lutealNutrients[];
  };
}

interface IProductsStore {
  productsInfo: ProductsInfo;
  nutrientsTips: Record<string, string[] | null>;
  getInfo: () => { tips: string[]; nutrients: string[] };
}

const useProductsStore = create<IProductsStore>()((set, get) => ({
  productsInfo: {
    menstrual: {
      tips: [
        "Avoid raw vegetables, citrus, and too much fiber, which are healthy but during menstruation can cause bloating, pain, or diarrhea for women with endo. Choose cooked or baked veggies instead — easier to digest and gentler on the gut.",
        "Avoid coffee on an empty stomach — it can block iron and irritate the gut, which is especially sensitive in women with endo. Drink after meals, especially during your period.",
        "Low-fat foods may leave you hungry and lack fat-soluble vitamins A, D, E, and K. For women with endo, lack of these vitamins can worsen inflammation, fatigue, and hormonal imbalance. Eggs, avocado, and full-fat yogurt strongly support the body during menstruation.",
        "Cooked food reduces gut irritation, improves nutrient absorption, and lowers bloating risk. Warm foods, especially during your period, ease cramps, are gentler on digestion, and provide comfort. Choosing whole foods — meat instead of processed meats like sausage, yogurt instead of \"fitness snacks\" — helps reduce inflammation, nutrient deficiencies, and overeating.",
      ],
      nutrients: [
        'iron', 'magnesium', 'omega-3', 'potassium', 'vitamin-b' ],
    },
    follicular: {
      tips: [
        "In this phase our bodies shift from a state of depletion into rebuilding. B Vitamins in the follicular phase help restore energy after menstruation, stabilize mood, and support cellular regeneration. Magnesium calms the nervous system and helps rebalance energy levels.",
        "Perfect time to try smth new - new veggie, fruit or grain."
      ],
      nutrients: ['magnesium', 'choline', 'vitamin-b'],
    },
    ovulation: {
      tips: [
        "Women with endometriosis may have increased histamine sensitivity, especially during ovulation when estrogen peaks. Estrogen can raise histamine levels and slow its breakdown, which may worsen inflammation, pain, headaches, nausea, or bloating.",
        "During this phase, it's helpful to limit high-histamine foods like fermented foods, aged cheeses, smoked meats, and alcohol to reduce symptom flare-ups.",
      ],
      nutrients: ['antioxidants', 'fiber', 'magnesium', 'choline', 'methionine-cysteine'],
    },
    luteal: {
      tips: [],
      nutrients: ['vitamin-b6', 'fiber', 'omega-3', 'vitamin-e', 'magnesium']
    },
  },
  nutrientsTips: {
    'iron': [
      'Women with endo often experience heavy periods that may increase iron loss.',
      'Choose well-cooked, easy-to-digest iron-rich foods, pair them with vitamin C–rich foods. Avoid them on an empty stomach.',
    ],
    'magnesium': [
      'Magnesium helps reduce inflammation, supports nervous system regulation, and lowers anxiety in the ovulatory phase.',
      'With endometriosis, choose magnesium from warm foods — cooked green vegetables, buckwheat, and pumpkin seeds added to porridge — and avoid raw salads that may trigger gut reactions.',
    ],
    'omega-3': [
      'Seeds and nuts fats are healthy but less anti-inflammatory*. Fried fish may irritate the gut.',
      'For endo, prefer baked fish and/or Omega 3 supplements.',
      '*Inflammation: pain and swelling caused by the body\'s immune response, common in endometriosis.',
    ],
    'potassium': [
      'Potassium helps reduce fluid retention and swelling, which can worsen pain and inflammation in women with endo.',
      'Choose baked veggies like potatoes or zucchini, bananas are good (not on an empty stomach), and avoid citrus juices.',
    ],
    'vitamin-b': null,
    'fiber': [
      'Fiber helps remove excess estrogen through the gut.',
      'With endometriosis, avoid raw fiber and choose cooked sources like stewed vegetables, pumpkin porridge, or boiled buckwheat to reduce bloating and pain.',
      'Cooked fiber (buckwheat, stewed veggies, baked apples) helps remove estrogen metabolites and reduces bloating, supporting women with endometriosis.',
      'Excess estrogen metabolites can worsen inflammation and pain in women with endo.'
    ],
    'methionine-cysteine': [
      'Liver detoxification of estrogen is critical in endometriosis, especially during the ovulatory phase when hormone peaks can increase inflammation.',
      'Support estrogen metabolism and liver function with choline (from boiled eggs, stewed liver) and sulfur-containing amino acids (from cabbage, onions, broccoli). Choose cooked or baked forms to reduce gut irritation and bloating'
    ],
    'antioxidants': [
      'Antioxidants are needed not only to protect cells from oxidative stress, but also to support estrogen metabolism, which can be overactive in women with endometriosis.',
      'Choose low-histamine sources*— instead of citrus juices, opt for cooked broccoli, baked sweet pepper, pumpkin porridge, stewed carrots or sweet potato, and baked apples without the skin.',
      '*Low-histamine sources are foods that are less likely to trigger a histamine reaction, such as bloating, headaches, flushing, or pain — which can be more common in women with endometriosis.'
    ],
  },
  getInfo: (phase?: PhaseName) => {
    const currentPhaseName = phase || CurrentPhaseInfo().phaseName;
    const phaseData = get().productsInfo[currentPhaseName];
    return {
      tips: phaseData.tips,
      nutrients: phaseData.nutrients,
    };
  },
}));

export default useProductsStore;
