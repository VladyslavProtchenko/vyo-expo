import { Nutrient } from '@/store/products';

export type NutrientDescription = {
  general?: string;
  endo?: string;
};

export type NutrientInfo = {
  id: Nutrient | 'b-vitamins';
  name: string;
  description: NutrientDescription;
  dosage: string;
  foodEquivalent: string;
};

export const NUTRIENT_INFO: Record<Nutrient | 'b-vitamins', NutrientInfo> = {
  iron: {
    id: 'iron',
    name: 'Iron',
    description: {
      general: 'Helps maintain healthy iron and hemoglobin levels, preventing iron-deficiency anemia – a common cause of fatigue and weakness after menstruation.',
      endo: 'Since endometriosis is often associated with heavy menstrual bleeding (menorrhagia), which increases the risk of anemia and fatigue, it\'s important to focus on effective iron strategies. Even with normal blood loss, supporting iron absorption remains essential. For women with GI sensitivity related to endometriosis, thermal processing is key to easing digestion and minimizing irritation. Iron sources that retain high content after cooking should be thermally prepared (e.g., stewed beet, boiled lentils). To enhance absorption, consume iron together with vitamin C (e.g., tomato juice, red bell pepper, or broccoli).',
    },
    dosage: '18 mg',
    foodEquivalent: '~150g of beef steak + 1 cup of boiled white beans + a large serving of spinach',
  },
  magnesium: {
    id: 'magnesium',
    name: 'Magnesium',
    description: {
      general: 'Supports relaxation of smooth muscles (including the uterus), effectively reducing menstrual pain. Also contributes to emotional stability by participating in neurotransmitter synthesis.',
      endo: 'Magnesium is essential for reducing cramps, pain, and anxiety — symptoms common regardless of blood loss volume. However, due to increased GI sensitivity in endometriosis, it\'s best to favor cooked or baked vegetables and warm porridges. This supports high absorption and digestive comfort without requiring complete exclusion of raw foods.',
    },
    dosage: '310 mg',
    foodEquivalent: '~2 slices of whole-grain bread + 1/2 cup of pumpkin seeds',
  },
  potassium: {
    id: 'potassium',
    name: 'Potassium',
    description: {
      general: 'As a critical electrolyte, it helps regulate fluid balance within cells and reduces the tendency toward bloating, supporting optimal hydration.',
      endo: 'To counter fluid retention and bloating — often worsened by inflammation — potassium is key. Opt for sources like baked vegetables and bananas (not on an empty stomach). To avoid irritating a sensitive GI lining, it\'s best to limit citrus juices and other raw acidic foods.',
    },
    dosage: '2,600 mg',
    foodEquivalent: '~1 medium banana + 1 cup of cooked spinach + 1 medium potato',
  },
  'vitamin-b1': {
    id: 'vitamin-b1',
    name: 'Vitamin B1 (Thiamine)',
    description: {
      general: 'Essential for energy metabolism — converts carbohydrates into usable energy, helping reduce fatigue during the menstrual phase.',
    },
    dosage: '1.1 mg',
    foodEquivalent: '~1/2 cup of sunflower seeds or a serving of green peas',
  },
  'vitamin-b2': {
    id: 'vitamin-b2',
    name: 'Vitamin B2 (Riboflavin)',
    description: {
      general: 'Supports cellular energy production and helps maintain healthy skin and mucous membranes. Plays a role in reducing oxidative stress.',
    },
    dosage: '1.1 mg',
    foodEquivalent: '~200g of grilled mushrooms + 150g of cooked spinach',
  },
  'vitamin-b6': {
    id: 'vitamin-b6',
    name: 'Vitamin B6 (Pyridoxine)',
    description: {
      general: 'A key cofactor in neurotransmitter synthesis (serotonin, dopamine). Helps stabilize mood fluctuations driven by hormonal changes.',
    },
    dosage: '1.3 mg',
    foodEquivalent: '~1 medium banana + 150g of roasted chicken breast',
  },
  'vitamin-b9': {
    id: 'vitamin-b9',
    name: 'Vitamin B9 (Folic acid)',
    description: {
      general: 'Critical for DNA synthesis and cell repair. Supports red blood cell formation, which is especially important during blood loss.',
    },
    dosage: '400 mcg DFE',
    foodEquivalent: '~1 cup of cooked asparagus and a portion of spinach',
  },
  'vitamin-b12': {
    id: 'vitamin-b12',
    name: 'Vitamin B12 (Cobalamin)',
    description: {
      general: 'Vital for red blood cell production and neurological function. Deficiency can amplify fatigue and mood symptoms during menstruation.',
    },
    dosage: '2.4 mcg',
    foodEquivalent: '~1 salmon fillet or 2 large eggs',
  },
  'vitamin-c': {
    id: 'vitamin-c',
    name: 'Vitamin C',
    description: {
      general: 'Powerful antioxidant that boosts iron absorption from plant sources. Supports immune function and collagen synthesis.',
    },
    dosage: '75 mg',
    foodEquivalent: '~1 medium orange or 1/2 cup of bell pepper',
  },
  'vitamin-e': {
    id: 'vitamin-e',
    name: 'Vitamin E',
    description: {
      general: 'Fat-soluble antioxidant that helps reduce oxidative stress and inflammation. May help ease menstrual pain and breast tenderness.',
    },
    dosage: '15 mg',
    foodEquivalent: '~2 tablespoons of sunflower oil or a handful of almonds',
  },
  'omega-3': {
    id: 'omega-3',
    name: 'Omega-3',
    description: {
      general: 'Essential fatty acids that provide broad anti-inflammatory support by lowering levels of pro-inflammatory eicosanoids, helping ease menstrual discomfort.',
      endo: 'For effective anti-inflammatory action, the body needs ready-to-use forms of EPA and DHA, found in baked fish or specialized supplements. Plant-based sources (like seeds and nuts) contain only alpha-linolenic acid (ALA). Since the body converts ALA to EPA/DHA with low efficiency, it\'s not sufficient to counter the chronic inflammation typical of endometriosis. Flaxseeds and nuts should not be relied on as primary anti-inflammatory tools during this phase.',
    },
    dosage: '500 mg',
    foodEquivalent: '~30g of walnuts or a small piece of mackerel',
  },
  choline: {
    id: 'choline',
    name: 'Choline',
    description: {
      general: 'Supports liver function, neurotransmitter synthesis, and cell membrane integrity. Important for cognitive function and mood regulation.',
    },
    dosage: '425 mg',
    foodEquivalent: '~2 large eggs or 85g of beef liver',
  },
  fiber: {
    id: 'fiber',
    name: 'Fiber',
    description: {
      general: 'Supports gut health and helps regulate estrogen levels by promoting its excretion. Reduces bloating and supports steady energy levels.',
    },
    dosage: '25 g',
    foodEquivalent: '~1 cup of oats + 1 apple + 1 cup of broccoli',
  },
  'b-vitamins': {
    id: 'b-vitamins',
    name: 'B Vitamins',
    description: {
      general: 'The B-complex group is a vital cofactor in energy metabolism and neurotransmitter synthesis. This is critical for managing fatigue and stabilizing mood fluctuations driven by hormonal changes.',
    },
    dosage: 'varies',
    foodEquivalent: '~eggs, whole grains, leafy greens, legumes, and lean meats',
  },
  'methionine-cysteine': {
    id: 'methionine-cysteine',
    name: 'Methionine & Cysteine',
    description: {
      general: 'Sulfur-containing amino acids that support liver detoxification, antioxidant production (glutathione), and hormone metabolism.',
    },
    dosage: '1,100 mg',
    foodEquivalent: '~150g of chicken breast or 2 large eggs + a serving of sunflower seeds',
  },
  antioxidants: {
    id: 'antioxidants',
    name: 'Antioxidants',
    description: {
      general: 'Ovulation creates a mild cellular load, and antioxidants act as internal protection — neutralizing damaging factors and helping the body recover quickly.',
    },
    dosage: 'varies',
    foodEquivalent: '~berries, dark leafy greens, nuts, and colorful vegetables',
  },
};
