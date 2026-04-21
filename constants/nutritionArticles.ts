import { ImageSourcePropType } from 'react-native';
import { NUTRIENT_INFO, NutrientDescription, NutrientInfo } from '@/constants/nutrients';

export type NutritionArticle = {
  variant: keyof NutrientDescription;
  id: string;
  title: string;
  readingTime: string;
  heroImage: ImageSourcePropType;
  midImage: ImageSourcePropType;
  author: {
    name: string;
    title: string;
    image: ImageSourcePropType;
  };
  keyTakeaway: string;
  intro: string[];
  quote: string;
  crucialHeading: string;
  crucialBody: string;
  phase: string;
  nutrients: string[];
  nutrientSections: NutrientInfo[];
  whatElse: string[];
  references: { text: string; url?: string }[];
};

const MENSTRUAL_REFERENCES: NutritionArticle['references'] = [
  { text: 'Owen P, Heneghan C, Musgrave H, et al. Oxford Handbook of Obstetrics and Gynaecology. 4th ed. Oxford University Press, 2023.' },
  { text: 'Nillni YI, Rasmusson AM, Paul EL, Pineles SL. The impact of the menstrual cycle and underlying hormones in anxiety and PTSD. Curr Psychiatry Rep. 2021;23(2):8.', url: 'https://link.springer.com/article/10.1007/s11920-020-01221-9' },
  { text: 'Bernal A, Paolieri D. The influence of estradiol and progesterone on neurocognition during the menstrual cycle. Behav Brain Res. 2022;417:113593.', url: 'https://linkinghub.elsevier.com/retrieve/pii/S0166432821004812' },
  { text: 'Barth C, Villringer A, Sacher J. Sex hormones affect neurotransmitters and shape the adult female brain. Front Neurosci. 2015;9:37.', url: 'https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2015.00037/full' },
  { text: 'Rogan MM, Black KE. Dietary energy intake across the menstrual cycle: a narrative review. Nutr Rev. 2023;81(7):869-886.', url: 'https://doi.org/10.1093/nutrit/nuac094' },
  { text: 'Stefaniak M, Dmoch-Gajzlerska E, Jankowska K, Rogowski A, Kajdy A, Maksym RB. Progesterone and its metabolites in affect regulation. Pharmaceuticals. 2023;16:520.', url: 'https://www.mdpi.com/1424-8247/16/4/520' },
  { text: 'Hirschberg AL. Sex hormones, appetite and eating behaviour in women. Maturitas. 2012;71:248-256.', url: 'https://linkinghub.elsevier.com/retrieve/pii/S0378512211004154' },
  { text: 'Burdge GC, Wootton SA. Conversion of alpha-linolenic acid to eicosapentaenoic, docosapentaenoic and docosahexaenoic acids in young women. Br J Nutr. 2002;88(4):411-420. doi:10.1079/BJN2002689.' },
  { text: 'Healthline', url: 'https://www.healthline.com/nutrition/foods-with-choline#vegan-sources' },
  { text: 'Dietary Supplement Fact Sheets', url: 'https://ods.od.nih.gov/factsheets/list-all/' },
  { text: 'FDC USA', url: 'https://fdc.nal.usda.gov/' },
];

export const nutritionArticles: NutritionArticle[] = [
  {
    id: 'menstrual-general',
    variant: 'general',
    title: 'The menstrual phase: What your body needs',
    readingTime: '8 min reading',
    heroImage: require('@/assets/images/nutrients/m-article-1.webp'),
    midImage: require('@/assets/images/nutrients/m-article-2.webp'),
    author: {
      name: 'Dr. Tetiana Petryn',
      title: 'Chief scientist, VYO health',
      image: require('@/assets/images/nutrients/author.webp'),
    },
    keyTakeaway:
      'During your period, your body is focused on recovery, which can affect energy, mood, and comfort. Supporting it with the right nutrients and gentle food choices helps reduce discomfort and restore balance – listening to your body is part of the process.',
    intro: [
      'During menstruation, the body loses minerals with blood and reacts to shifts in hydration and hormone levels, which can affect mood and energy. Appetite changes during this period are a natural response – trust your body\'s signals and prioritize comfort over forced eating or restriction.',
      'At this stage, our recommendations focus on replenishing lost nutrients, gently reducing inflammation, and supporting the body in ways that optimize how you feel.',
    ],
    quote: 'focus on replenishing lost nutrients, gently reducing inflammation, and supporting the body',
    crucialHeading: 'Crucial role of nutrition',
    crucialBody:
      'To aid recovery and reduce discomfort, it\'s especially important to ensure adequate intake of key elements that directly affect energy levels, pain sensitivity, and hydration balance:',
    phase: 'Menstrual',
    nutrients: ['Iron', 'Magnesium', 'Omega-3', 'B-vitamins'],
    nutrientSections: [
      NUTRIENT_INFO.iron,
      NUTRIENT_INFO.magnesium,
      NUTRIENT_INFO['b-vitamins'],
      NUTRIENT_INFO['omega-3'],
    ],
    whatElse: [
      'Caffeine on an empty stomach is a trigger that\'s often underestimated: it can interfere with iron absorption – a critical factor during the blood loss phase. If you drink coffee, do it an hour after eating, not within the first hours after waking up. This simple shift can make a noticeable difference in how you feel.',
      'Low-fat products, often marketed as "healthy," don\'t actually satisfy, may lead to overeating, and fail to provide fat-soluble vitamins – A, D, E, and K. Full-fat yogurt, eggs, avocado – these aren\'t "bad," they\'re essential support.',
      'Choose whole foods – meat instead of processed deli, plain yogurt instead of "fitness snacks." This simultaneously reduces the risk of inflammation, nutrient deficiencies, and overeating. It\'s not about restriction – it\'s about choosing what truly supports your body on harder days.',
    ],
    references: MENSTRUAL_REFERENCES,
  },
  {
    id: 'menstrual-endo',
    variant: 'endo',
    title: 'The menstrual phase: What your body needs',
    readingTime: '8 min reading',
    heroImage: require('@/assets/images/nutrients/m-article-1.webp'),
    midImage: require('@/assets/images/nutrients/m-article-2.webp'),
    author: {
      name: 'Dr. Tetiana Petryn',
      title: 'Chief scientist, VYO health',
      image: require('@/assets/images/nutrients/author.webp'),
    },
    keyTakeaway:
      'During your period, your body is focused on recovery, which can affect energy, mood, and comfort. Supporting it with the right nutrients and gentle food choices helps reduce discomfort and restore balance – listening to your body is part of the process.',
    intro: [
      'During menstruation, the body loses minerals with blood and reacts to shifts in hydration and hormone levels, which can affect mood and energy. Given the elevated levels of inflammation and the common sensitivity of the gastrointestinal tract, the nutrient strategy for women with suspected or confirmed endometriosis requires targeted adaptation to maximize absorption and minimize discomfort.',
      'At this stage, our recommendations focus on replenishing lost nutrients, gently reducing inflammation, and supporting the body in ways that optimize how you feel.',
    ],
    quote: 'focus on replenishing lost nutrients, gently reducing inflammation, and supporting the body',
    crucialHeading: 'Crucial role of nutrition',
    crucialBody:
      'To aid recovery and reduce discomfort, it\'s especially important to ensure adequate intake of key elements that directly affect energy levels, pain sensitivity, and hydration balance:',
    phase: 'Menstrual',
    nutrients: ['Iron', 'Magnesium', 'Omega-3', 'Potassium', 'B-vitamins'],
    nutrientSections: [
      NUTRIENT_INFO.iron,
      NUTRIENT_INFO.magnesium,
      NUTRIENT_INFO.potassium,
      NUTRIENT_INFO['b-vitamins'],
      NUTRIENT_INFO['omega-3'],
    ],
    whatElse: [
      'During menstruation, when symptoms may worsen, raw vegetables, citrus fruits, and excess fiber often trigger bloating, pain, or diarrhea. This doesn\'t mean they should be excluded entirely, but on flare days, it\'s better to choose stewed, baked, or boiled options. Warm meals — especially during menstrual days — aren\'t just a culinary preference: they help soothe the GI tract, improve nutrient absorption, and reduce the risk of cramps and bloating.',
      'Caffeine on an empty stomach is a trigger that\'s often underestimated — especially for iron absorption, which is critical during the blood loss phase — and can provoke unwanted GI reactions, especially in endometriosis. If you drink coffee, do so an hour after eating, not within the first hours after waking. This single shift can make a meaningful difference in how you feel.',
      'Low-fat products, often marketed as "healthy," don\'t satisfy, may cause overeating, and fail to provide fat-soluble vitamins — A, D, E, and K. For women with endometriosis, this is especially important, as deficiencies in these vitamins can worsen inflammation, fatigue, and hormonal instability. Full-fat yogurt, eggs, avocado — these aren\'t "bad," they\'re essential support.',
      'Choose whole foods — meat instead of processed deli, plain yogurt instead of "fitness snacks." This choice lowers the risk of inflammation, nutrient deficiencies, and overeating. It\'s not about restriction — it\'s about choosing what truly supports your body on harder days.',
    ],
    references: MENSTRUAL_REFERENCES,
  },
  {
    id: 'follicular-endo',
    variant: 'endo',
    title: 'The follicular phase: What your body needs',
    readingTime: '8 min reading',
    heroImage: require('@/assets/images/nutrients/f-article-1.webp'),
    midImage: require('@/assets/images/nutrients/m-article-2.webp'),
    author: {
      name: 'Dr. Tetiana Petryn',
      title: 'Chief scientist, VYO health',
      image: require('@/assets/images/nutrients/author.webp'),
    },
    keyTakeaway:
      'Because estrogen can stimulate endometriotic lesion growth, prioritizing nutrients like magnesium, B vitamins, and choline helps support efficient estrogen metabolism, liver function, and inflammation balance.',
    intro: [
      'Estrogen also stimulates the growth of endometriotic lesions. That\'s why a targeted nutrient strategy should focus on supporting efficient estrogen metabolism and minimizing underlying inflammation, which often remains active.',
    ],
    quote: 'the priority is to maximize energy and support key metabolic pathways',
    crucialHeading: 'Crucial role of nutrition',
    crucialBody: '',
    phase: 'Follicular',
    nutrients: ['Choline', 'Magnesium', 'B vitamins'],
    nutrientSections: [
      {
        ...NUTRIENT_INFO.magnesium,
        description: {
          endo: 'As a key electrolyte and cofactor, magnesium is essential for effective energy utilization and emotional resilience. During the estrogen rise phase, magnesium helps channel the natural surge in energy, supporting stable nervous system function and helping you stay focused and balanced.',
        },
      },
      {
        ...NUTRIENT_INFO['b-vitamins'],
        description: {
          endo: 'These vitamins are indispensable for cellular energy production. They\'re needed to restore vitality, support alertness, and maintain emotional equilibrium. They also play a crucial role in supporting liver function for efficient estrogen clearance. Since endometriosis is an estrogen-dependent condition, effective elimination of estrogen via the liver and gut helps reduce hormonal stimulation of lesion growth.',
        },
      },
      {
        ...NUTRIENT_INFO.choline,
        description: {
          endo: 'This nutrient plays a critical role in maintaining healthy liver function — the primary organ responsible for metabolizing and safely clearing estrogen. Optimal choline levels help stabilize estrogen and reduce the risk of excess accumulation, which is especially important for your condition. Rich sources of choline include eggs, broccoli, cauliflower, cultured cottage cheese, potatoes, mushrooms, and red fish.',
        },
      },
    ],
    whatElse: [],
    references: MENSTRUAL_REFERENCES,
  },
  {
    id: 'follicular-general',
    variant: 'general',
    title: 'The follicular phase: What your body needs',
    readingTime: '8 min reading',
    heroImage: require('@/assets/images/nutrients/f-article-1.webp'),
    midImage: require('@/assets/images/nutrients/m-article-2.webp'),
    author: {
      name: 'Dr. Tetiana Petryn',
      title: 'Chief scientist, VYO health',
      image: require('@/assets/images/nutrients/author.webp'),
    },
    keyTakeaway:
      'During the follicular phase, rising estrogen enhances energy, metabolic efficiency, and nutrient use — making it an ideal time to support your body with balanced nutrition and key nutrients like magnesium, B vitamins, and choline.',
    intro: [
      'Balanced nutrition matters at every phase — but in the follicular phase, your body responds especially well. Estrogen boosts insulin sensitivity and the efficient use of glucose and fats, helping maintain stable energy levels.',
      'According to review studies, energy intake is typically lower during this phase, especially right before ovulation — a natural response to hormonal shifts, not a sign of deficiency. If appetite drops, follow your body\'s cues without forcing yourself to overeat or restrict unnecessarily.',
      'This phase, driven by rising estrogen levels, brings a natural boost in energy and improved metabolic efficiency. Your body is primed for action and makes effective use of nutrients. The priority is to maximize energy and support key metabolic pathways — including estrogen metabolism.',
    ],
    quote: 'the priority is to maximize energy and support key metabolic pathways',
    crucialHeading: 'Crucial role of nutrition',
    crucialBody: '',
    phase: 'Follicular',
    nutrients: ['Choline', 'Magnesium', 'B vitamins'],
    nutrientSections: [
      {
        ...NUTRIENT_INFO.magnesium,
        description: {
          general: 'As a key electrolyte and cofactor, magnesium is essential for efficient energy utilization and emotional resilience. During the estrogen rise phase, magnesium helps channel the natural surge in energy, supporting stable nervous system function and helping you stay focused and balanced.',
        },
      },
      {
        ...NUTRIENT_INFO['b-vitamins'],
        description: {
          general: 'These vitamins are indispensable cofactors in cellular energy metabolism. They\'re crucial for effective recovery after menstruation, mood stability, and supporting regenerative processes.',
        },
      },
      {
        ...NUTRIENT_INFO.choline,
        description: {
          general: 'Choline is necessary for optimal liver function, which plays a central role in metabolizing and detoxifying excess estrogen. This supports healthy and stable hormonal growth. Rich sources of choline include eggs, broccoli, cauliflower, cultured cottage cheese, potatoes, mushrooms, and red fish.',
        },
      },
    ],
    whatElse: [],
    references: MENSTRUAL_REFERENCES,
  },
  {
    id: 'ovulation-general',
    variant: 'general',
    title: 'The ovulatory phase: What your body needs',
    readingTime: '8 min reading',
    heroImage: require('@/assets/images/nutrients/o-article-1.webp'),
    midImage: require('@/assets/images/nutrients/m-article-2.webp'),
    author: {
      name: 'Dr. Tetiana Petryn',
      title: 'Chief scientist, VYO health',
      image: require('@/assets/images/nutrients/author.webp'),
    },
    keyTakeaway:
      'Around ovulation, appetite may dip while estrogen peaks — making antioxidant support and efficient estrogen clearance (through choline, sulfur-containing amino acids, fiber, and magnesium) key priorities for hormonal balance and recovery.',
    intro: [
      'Appetite may naturally dip during ovulation compared to the second half of the cycle — this is a normal response to hormonal shifts, not a sign of imbalance.',
      'During these days, estrogen reaches its peak, triggering a surge in energy. However, this hormonal peak also coincides with the release of an egg — a microinflammatory process.',
      'The current priority is antioxidant protection and support for the pathways that help the body quickly and efficiently metabolize peak estrogen levels.',
    ],
    quote: 'The priority is antioxidant protection and support for the pathways of estrogen metabolizing',
    crucialHeading: 'Crucial role of nutrition',
    crucialBody: '',
    phase: 'Ovulation',
    nutrients: ['Choline', 'Magnesium', 'Antioxidants', 'Fiber'],
    nutrientSections: [
      {
        ...NUTRIENT_INFO.magnesium,
        description: {
          general: 'Magnesium supports ATP energy production and helps regulate the nervous system during peak hormonal pressure. It has a relaxing effect on muscles and blood vessels, reducing potential discomfort associated with ovulation.',
        },
      },
      {
        ...NUTRIENT_INFO.antioxidants,
        description: {
          general: 'Ovulation creates a mild cellular load, and antioxidants act as internal protection — neutralizing damaging factors and helping the body recover quickly.',
        },
      },
      {
        ...NUTRIENT_INFO.choline,
        description: {
          general: 'During these days, the liver works at full capacity to clear peak estrogen levels. Choline initiates this process, while sulfur-containing amino acids (found in garlic, onions, and eggs) are essential for the next phase. Together, they accelerate the elimination of estrogen once it has fulfilled its role, supporting hormonal balance.',
        },
      },
      {
        ...NUTRIENT_INFO.fiber,
        description: {
          general: 'Fiber binds spent estrogen in the gut and ensures its removal from the body. This is critical to prevent the hormone from re-entering the bloodstream.',
        },
      },
    ],
    whatElse: [],
    references: MENSTRUAL_REFERENCES,
  },
  {
    id: 'ovulation-endo',
    variant: 'endo',
    title: 'The ovulatory phase: What your body needs',
    readingTime: '8 min reading',
    heroImage: require('@/assets/images/nutrients/o-article-1.webp'),
    midImage: require('@/assets/images/nutrients/m-article-2.webp'),
    author: {
      name: 'Dr. Tetiana Petryn',
      title: 'Chief scientist, VYO health',
      image: require('@/assets/images/nutrients/author.webp'),
    },
    keyTakeaway:
      'During ovulation, high estrogen can intensify inflammation in endometriosis — so prioritizing gentle antioxidant support, efficient estrogen clearance, gut-friendly fiber, magnesium, and reduced histamine exposure helps minimize flare-ups and hormonal overload.',
    intro: [
      'You\'re experiencing a peak in energy thanks to high estrogen levels. However, because endometriosis is an estrogen-dependent and inflammatory condition, this hormonal peak calls for special attention to efficient hormone clearance and anti-inflammatory support — without irritating the gut.',
    ],
    quote: 'The priority is anti-inflammatory support without irritating the gut',
    crucialHeading: 'Crucial role of nutrition',
    crucialBody: '',
    phase: 'Ovulation',
    nutrients: ['Choline', 'Magnesium', 'Antioxidants', 'Fiber'],
    nutrientSections: [
      {
        ...NUTRIENT_INFO.magnesium,
        description: {
          endo: 'Magnesium supports energy production and helps regulate the nervous system during peak hormonal pressure. It has a relaxing effect on muscles and blood vessels, easing potential discomfort associated with ovulation.',
        },
      },
      {
        ...NUTRIENT_INFO.antioxidants,
        description: {
          endo: 'Ovulation creates a mild cellular load, and antioxidants act as internal protection — neutralizing damaging factors and helping the body recover quickly. It\'s important to avoid raw sources that may trigger histamine responses or irritate the gut. Prioritize cooked options: steamed broccoli, roasted bell pepper, pumpkin porridge, braised carrots or sweet potato, and baked peeled apples.',
        },
      },
      {
        ...NUTRIENT_INFO.choline,
        description: {
          endo: 'During these days, the liver works at full capacity to clear peak estrogen levels. Choline initiates this process, while sulfur-containing amino acids (found in garlic, onions, and eggs) are essential for the next phase. Together, they accelerate the elimination of estrogen once it has fulfilled its role, supporting hormonal balance.',
        },
      },
      {
        ...NUTRIENT_INFO.fiber,
        description: {
          endo: 'Fiber binds metabolized estrogen in the gut and ensures its removal from the body. This is essential to prevent the hormone from re-entering the bloodstream. In endometriosis, it\'s important to avoid raw sources that may irritate the gut. Choose thermally processed fiber — braised vegetables, baked pumpkin porridge, boiled buckwheat — to reduce the risk of bloating and pain.',
        },
      },
    ],
    whatElse: [
      'Histamine sensitivity may be elevated in women with endometriosis — especially during ovulation, when estrogen levels peak.',
      'Estrogen can stimulate histamine release from cells and suppress the activity of diamine oxidase (DAO), the enzyme responsible for breaking it down. This creates conditions for histamine accumulation in tissues, which may trigger inflammatory flare-ups, increased pain, headaches, nausea, bloating, or other systemic reactions.',
      'During periods of heightened sensitivity (particularly around ovulation) it is advisable to limit intake of exogenous histamine sources. Fermented foods, aged cheeses, canned meats, and alcohol can further burden the metabolic pathways responsible for histamine clearance.',
      'This isn\'t a strict contraindication — it\'s a strategic adaptation to help reduce the risk of symptom escalation.',
    ],
    references: MENSTRUAL_REFERENCES,
  },
  {
    id: 'luteal-general',
    variant: 'general',
    title: 'The luteal phase: What your body needs',
    readingTime: '8 min reading',
    heroImage: require('@/assets/images/nutrients/l-article-1.webp'),
    midImage: require('@/assets/images/nutrients/m-article-2.webp'),
    author: {
      name: 'Dr. Tetiana Petryn',
      title: 'Chief scientist, VYO health',
      image: require('@/assets/images/nutrients/author.webp'),
    },
    keyTakeaway:
      'During the luteal phase, rising progesterone naturally increases appetite and fluid retention — so regular meals and supportive nutrients like magnesium, B6, fiber, vitamin E, and omega-3s help stabilize mood, digestion, and inflammation.',
    intro: [
      'Progesterone can affect appetite, promote fluid retention, and alter glucose regulation. According to review studies, energy intake increases during the luteal phase — by an average of 150–300 kcal per day (roughly equivalent to a banana with a spoonful of peanut butter — around 200 kcal, several pieces of dark chocolate — 2 to 4 squares of 10 g each, or a whole-grain sandwich with butter and slice of cheese — approximately 250 kcal). This often manifests as a desire to snack or cravings for sweet or fatty foods.',
      'A rising appetite is not a disruption — it\'s a variant of normal physiology. Maintain a consistent eating routine — ideally every 3–4 hours — and stay hydrated, since hunger is often confused with thirst. To prevent less healthy snacking, keep nutrient-dense options close at hand: dates, dark chocolate, baked apples with cinnamon. And practice mindful eating — assess genuine hunger before meals to avoid automatic emotional eating.',
      'This phase isn\'t about battling appetite — it\'s about supporting yourself in sync with hormonal dynamics.',
    ],
    quote: 'the priority is supporting yourself in sync with hormonal dynamics',
    crucialHeading: 'Crucial role of nutrition',
    crucialBody: '',
    phase: 'Luteal',
    nutrients: ['Omega-3', 'Vitamin E', 'Fiber', 'Vitamin B', 'Magnesium'],
    nutrientSections: [
      {
        ...NUTRIENT_INFO.magnesium,
        description: {
          general: 'Magnesium helps reduce fluid retention, which causes bloating, and plays a key role in calming the nervous system.',
        },
      },
      {
        ...NUTRIENT_INFO['b-vitamins'],
        description: {
          general: 'Vitamin B6 is essential for serotonin regulation and helps ease emotional fluctuations, supporting your emotional balance.',
        },
      },
      {
        ...NUTRIENT_INFO['omega-3'],
        description: {
          general: 'Omega-3 fatty acids (from fish and seeds) are powerful agents for reducing background inflammation and help keep your mood steady.',
        },
      },
      {
        ...NUTRIENT_INFO['vitamin-e'],
        description: {
          general: 'Vitamin E works synergistically: it supports healthy progesterone levels (the dominant hormone in this phase) and further helps reduce bloating, which often occurs before menstruation.',
        },
      },
      {
        ...NUTRIENT_INFO.fiber,
        description: {
          general: 'Fiber supports regular digestion, helps regulate appetite, and stabilizes blood sugar levels — especially important when carb cravings increase.',
        },
      },
    ],
    whatElse: [],
    references: MENSTRUAL_REFERENCES,
  },
  {
    id: 'luteal-endo',
    variant: 'endo',
    title: 'The luteal phase: What your body needs',
    readingTime: '8 min reading',
    heroImage: require('@/assets/images/nutrients/l-article-1.webp'),
    midImage: require('@/assets/images/nutrients/m-article-2.webp'),
    author: {
      name: 'Dr. Tetiana Petryn',
      title: 'Chief scientist, VYO health',
      image: require('@/assets/images/nutrients/author.webp'),
    },
    keyTakeaway:
      'In the luteal phase, progesterone naturally raises appetite and fluid retention — so steady meals and nutrients like magnesium, B6, fiber, vitamin E, and omega-3s help ease cravings, support hormonal balance, reduce inflammation, and minimize discomfort.',
    intro: [
      'Progesterone can affect appetite, promote fluid retention, and alter glucose regulation. According to review studies, energy intake increases during the luteal phase — by an average of 150–300 kcal per day (roughly equivalent to a banana with a spoonful of peanut butter — around 200 kcal, several pieces of dark chocolate — 2 to 4 squares of 10 g each, or a whole-grain sandwich with butter and slice of cheese — approximately 250 kcal). This often manifests as a desire to snack or cravings for sweet or fatty foods.',
      'A rising appetite is not a disruption — it\'s a variant of normal physiology. Maintain a consistent eating routine — ideally every 3–4 hours — and stay hydrated, since hunger is often confused with thirst. To prevent less healthy snacking, keep nutrient-dense options close at hand: dates, dark chocolate, baked apples with cinnamon. And practice mindful eating — assess genuine hunger before meals to avoid automatic emotional eating.',
      'This phase isn\'t about battling appetite — it\'s about supporting yourself in sync with hormonal dynamics.',
    ],
    quote: 'the priority is supporting yourself in sync with hormonal dynamics',
    crucialHeading: 'Crucial role of nutrition',
    crucialBody: '',
    phase: 'Luteal',
    nutrients: ['Omega-3', 'Vitamin E', 'Fiber', 'Vitamin B', 'Magnesium'],
    nutrientSections: [
      {
        ...NUTRIENT_INFO.magnesium,
        description: {
          endo: 'Magnesium helps reduce fluid retention, which causes bloating, and plays a key role in calming the nervous system. It also has an antispasmodic effect, which is important for relieving potential pain.',
        },
      },
      {
        ...NUTRIENT_INFO['b-vitamins'],
        description: {
          endo: 'Vitamin B6 is essential for serotonin regulation and helps ease emotional fluctuations, supporting your emotional balance. Consume these nutrients from cooked sources — such as steamed green vegetables, boiled buckwheat, or baked bananas — to avoid additional strain on a sensitive digestive system.',
        },
      },
      {
        ...NUTRIENT_INFO['omega-3'],
        description: {
          endo: 'Omega-3 fatty acids are powerful agents for lowering background inflammation, which directly helps reduce pain associated with endometriosis and supports emotional stability.',
        },
      },
      {
        ...NUTRIENT_INFO['vitamin-e'],
        description: {
          endo: 'Vitamin E helps maintain healthy progesterone levels — critical for hormonal balance in this phase — and reduces bloating. Choose high-quality, minimally processed sources: baked fish (Omega-3), small portions of nuts, seeds, and cold-pressed oils (Vitamin E) to maximize anti-inflammatory benefits without irritating the gut.',
        },
      },
      {
        ...NUTRIENT_INFO.fiber,
        description: {
          endo: 'Fiber supports regular digestion, helps manage increased appetite during the luteal phase, and stabilizes blood sugar levels — reducing cravings for sweets.',
        },
      },
    ],
    whatElse: [],
    references: MENSTRUAL_REFERENCES,
  },
];
