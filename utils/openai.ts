type PhaseName = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';

export const generateProductVariants = async (
  phase: PhaseName,
  previousLists?: Record<number, string[]>,
  deletedProducts: string[] = [],
  isVegetarian: boolean = false,
  isVegan: boolean = false
): Promise<string[]> => {
  // TEMPORARY: Return mock data for development
  const mockProducts = [
    "Baked salmon",
    "Cooked chickpeas",
    "Cooked spinach",
    "Baked sweet potato",
    "Pumpkin seeds",
    "Boiled egg",
    "Whole milk",
    "Banana",
    "Dark chocolate (70%)"
  ];
  
  console.log('🔵 [OpenAI] Using mock data for development');
  console.log('✅ [OpenAI] Mock products:', mockProducts.length);
  return mockProducts;

  // COMMENTED OUT: OpenAI API call
  /*
  const prompt = createPrompt(phase, previousLists, deletedProducts, isVegetarian, isVegan);

  console.log('🔵 [OpenAI] Starting request for phase:', phase);
  if (previousLists && Object.keys(previousLists).length > 0) {
    console.log(`📚 [OpenAI] Using ${Object.keys(previousLists).length} previous lists for context`);
  }
  const startTime = Date.now();

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert nutritionist specializing in endometriosis and menstrual cycle nutrition. Generate product combinations (9 products each) based on phase-specific nutritional needs. Focus on balanced macros, nutrient synergy, and variety. Return ONLY valid JSON with no additional text or explanations.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 1.0,
        max_completion_tokens: 250,
      }),
    });

    const duration = Date.now() - startTime;

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ [OpenAI] API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    console.log(`✅ [OpenAI] Request completed in ${duration}ms`);

    const data: any = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    const products: string[] = JSON.parse(content);
    console.log('✅ [OpenAI] Parsed products:', products.length);
    return products;
  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`❌ [OpenAI] Request failed after ${duration}ms`);
    console.error('❌ [OpenAI] Error:', error.message);
    throw error;
  }
  */
};

export const createPrompt = (
  phase: PhaseName, 
  previousLists?: Record<number, string[]>, 
  deletedProducts: string[] = [],
  isVegetarian: boolean = false,
  isVegan: boolean = false
) => {
  const meatProducts = [
    'Beef liver, cooked', 'Chicken liver', 'Stewed beef', 'Cooked pork', 'Roast turkey', 'Boiled chicken breast'
  ];

  const fishProducts = [
    'Baked salmon', 'Cooked Atlantic salmon', 'Raw Atlantic mackerel', 'Pacific herring, cooked', 
    'Cooked bluefin tuna', 'Canned tuna', 'Canned sardines', 'Cooked mussels', 'Baked trout', 'Salmon fish oil'
  ];

  const dairyAndEggs = [
    'Boiled egg', 'Whole milk', 'Plain yogurt', 'Cottage cheese', 'Cheddar cheese', 'Brie cheese'
  ];

  const productsArrays: Record<PhaseName, string[]> = {
    menstrual: [
      'Beef liver, cooked', 'Chicken liver', 'Stewed beef', 'Cooked pork', 'Roast turkey', 'Boiled chicken breast',
      'Baked salmon', 'Cooked Atlantic salmon', 'Raw Atlantic mackerel', 'Pacific herring, cooked', 'Cooked bluefin tuna',
      'Canned tuna', 'Canned sardines', 'Cooked mussels', 'Baked trout', 'Salmon fish oil', 'Boiled egg', 'Whole milk',
      'Plain yogurt', 'Cottage cheese', 'Cheddar cheese', 'Brie cheese', 'Fortified nutritional yeast', 'Tofu',
      'Cooked lentils', 'Cooked chickpeas', 'Cooked white beans', 'Cooked kidney beans', 'Cooked green peas', 'Cooked beans',
      'Cooked buckwheat', 'Cooked oats', 'Cooked millet', 'Cooked brown rice', 'Cooked pearl barley', 'Durum wheat pasta',
      'Whole grain bread', 'Wheat bread', 'Boiled potato', 'Baked sweet potato', 'Cooked spinach', 'Cooked broccoli',
      'Cooked cauliflower', 'Cooked asparagus', 'Cooked Brussels sprouts', 'Avocado', 'Banana', 'Orange', 'Orange juice',
      'Raisins', 'Dates', 'Dried figs', 'Dried apricots', 'Pumpkin seeds', 'Sunflower seeds', 'Sesame seeds', 'Almonds',
      'Cashews', 'Pistachios', 'Peanuts', 'Walnuts', 'Dark chocolate (70%)'
    ],
    follicular: [
      'Baked salmon', 'Boiled egg', 'Whole milk', 'Plain yogurt', 'Cottage cheese', 'Beef liver, cooked', 'Chicken liver',
      'Stewed beef', 'Roast turkey', 'Boiled chicken breast', 'Canned tuna', 'Tofu', 'Cooked lentils', 'Cooked chickpeas',
      'Cooked white beans', 'Cooked green peas', 'Cooked beans', 'Cooked buckwheat', 'Cooked oats', 'Cooked millet',
      'Cooked brown rice', 'Whole grain bread', 'Baked sweet potato', 'Cooked spinach', 'Cooked broccoli', 'Avocado',
      'Banana', 'Orange', 'Dates', 'Dried figs', 'Dried apricots', 'Pumpkin seeds', 'Sunflower seeds', 'Sesame seeds',
      'Almonds', 'Cashews', 'Pistachios', 'Peanuts', 'Fortified cereal', 'Fortified plant milk'
    ],
    ovulation: [
      'Baked salmon', 'Boiled egg', 'Whole milk', 'Plain yogurt', 'Cottage cheese', 'Beef liver, cooked', 'Chicken liver',
      'Stewed beef', 'Roast turkey', 'Boiled chicken breast', 'Canned tuna', 'Cooked lentils', 'Cooked chickpeas',
      'Cooked white beans', 'Cooked green peas', 'Cooked beans', 'Cooked buckwheat', 'Cooked oats', 'Cooked millet',
      'Cooked brown rice', 'Whole grain bread', 'Baked sweet potato', 'Cooked spinach', 'Cooked broccoli', 'Cooked cauliflower',
      'Cooked Brussels sprouts', 'Raw cabbage', 'White cabbage', 'Raw carrot', 'Avocado', 'Banana', 'Apple with skin',
      'Pear with skin', 'Raspberries', 'Fresh strawberries', 'Black currant', 'Kiwifruit', 'Acerola cherry', 'Rose hips, raw',
      'Orange', 'Dates', 'Dried figs', 'Dried apricots', 'Pumpkin seeds', 'Sunflower seeds', 'Sesame seeds', 'Almonds',
      'Cashews', 'Pistachios', 'Peanuts', 'Walnuts', 'Ground flaxseed', 'Chia seeds', 'Dark chocolate (70%)',
      'Fortified cereal', 'Fortified plant milk'
    ],
    luteal: [
      'Baked salmon', 'Boiled egg', 'Whole milk', 'Plain yogurt', 'Cooked lentils', 'Cooked chickpeas', 'Cooked white beans',
      'Cooked buckwheat', 'Cooked oats', 'Cooked millet', 'Cooked brown rice', 'Baked sweet potato', 'Cooked spinach',
      'Avocado', 'Banana', 'Dates', 'Dried figs', 'Dried apricots', 'Pumpkin seeds', 'Sunflower seeds', 'Sesame seeds',
      'Almonds', 'Cashews', 'Pistachios', 'Peanuts', 'Walnuts', 'Flaxseed ground', 'Flaxseed oil', 'Chia seeds',
      'Canola oil', 'Soybean oil', 'Dark chocolate (70%)'
    ],
  };

  const phaseHeaders: Record<PhaseName, string> = {
    menstrual: 'Menstrual Phase (Fe, Mg, Ω3, K, B1, B2, B6, B9, B12)',
    follicular: 'Follicular Phase (Mg, B1, B2, B6, B9, B12, Ch)',
    ovulation: 'Ovulatory Phase (Mg, B1, B2, B6, B9, B12, Ch, Fib, AO, S)',
    luteal: 'Luteal Phase (Mg, B6, Fib, Ω3, E)',
  };

  let filteredProducts = productsArrays[phase];
  
  if (isVegan) {
    filteredProducts = filteredProducts.filter(p => 
      !meatProducts.includes(p) && 
      !fishProducts.includes(p) && 
      !dairyAndEggs.includes(p)
    );
  } else if (isVegetarian) {
    filteredProducts = filteredProducts.filter(p => 
      !meatProducts.includes(p) && 
      !fishProducts.includes(p)
    );
  }

  if (deletedProducts.length > 0) {
    filteredProducts = filteredProducts.filter(p => !deletedProducts.includes(p));
  }

  const actualProducts = `${phaseHeaders[phase]}: ${filteredProducts.join('; ')}`;

  const dietaryNote = isVegan 
    ? '\n\n⚠️ DIETARY RESTRICTION: User is VEGAN. All meat, fish, dairy, and eggs have been excluded from the available products list.'
    : isVegetarian 
    ? '\n\n⚠️ DIETARY RESTRICTION: User is VEGETARIAN. All meat and fish have been excluded from the available products list.'
    : '';

  let previousListsText = '';
  if (previousLists && Object.keys(previousLists).length > 0) {
    previousListsText = '\n\n### PREVIOUSLY RECOMMENDED LISTS:\n';
    Object.entries(previousLists).forEach(([num, products]) => {
      previousListsText += `List #${num}: ${products.join(', ')}\n`;
    });
    previousListsText += `\n⚠️ IMPORTANT: These lists were already recommended. You can reuse individual products, but try to create a DIFFERENT combination. Avoid repeating the exact same list or very similar combinations. Aim for variety and diversity while maintaining nutritional balance.\n`;
  }

  return `
You are an expert Clinical Nutritionist specializing in women's hormonal health and endometriosis management.

PHASE: ${phase}
AVAILABLE PRODUCTS LIST (COMPLETE AND FINAL):
${actualProducts}${dietaryNote}${previousListsText}

### YOUR TASK:
Generate ONLY 1 optimal set of 9 products maximally balanced for the ${phase} phase.

⚠️ CRITICAL RULES - MUST FOLLOW:
1. You MUST use ONLY products from the AVAILABLE PRODUCTS LIST above
2. DO NOT add, invent, or suggest ANY products not in the list
3. DO NOT use similar products (e.g., if "quinoa" is not listed, you CANNOT use it)
4. Copy product names EXACTLY as written (including capitalization: "Baked salmon", "Boiled egg", etc.)
5. Return ONLY ONE list of exactly 9 unique products
6. Return ONLY a JSON array, no explanations or additional text

### SELECTION CRITERIA (in priority order):
1. **Nutrient Density**: Maximum coverage of phase-specific nutrients (Fe, Mg, Ω3, B vitamins, etc.)
2. **Bioavailability**: heme iron > non-heme iron, pair plant iron with Vitamin C sources
3. **Food Synergy**: Choose products that work well together and enhance each other's absorption
4. **Variety**: Mix different food groups (proteins, vegetables, fruits, nuts, grains)
5. **Anti-inflammatory**: For endometriosis management
6. **Digestive Tolerance**: Prefer cooked/warm foods during menstrual; avoid high-histamine during ovulation
7. **Diversity from previous lists**: If previous lists exist, create a different combination

### PHASE-SPECIFIC PHYSIOLOGY:
- **Menstrual**: Blood replenishment (Iron, B12), muscle relaxation (Magnesium). Prefer cooked foods.
- **Follicular**: Energy rebuilding (B vitamins), gut health (Choline). Light proteins + complex carbs.
- **Ovulatory**: Estrogen metabolism (Fiber, Sulfur amino acids), antioxidant protection.
- **Luteal**: Blood sugar stability (Magnesium, B6, Fiber), inflammation control (Omega-3, Vitamin E).

### COMPOSITION (must include):
- 2-3 Protein sources (meat/fish/eggs/legumes/tofu)
- 3-4 Fiber/Vitamin sources (vegetables/fruits/greens)
- 1-2 Healthy fats (seeds/nuts/avocado/oils)
- 1-2 Complex carbs (grains/potatoes/bread)

### STRICT CONSTRAINTS:
✓ Use ONLY products from the AVAILABLE PRODUCTS list
✓ Exactly 9 unique products
✓ All names in lowercase exactly as shown in the list
✓ Products must complement each other nutritionally
✓ Return ONLY ONE JSON array

### OUTPUT FORMAT:
["product1", "product2", "product3", "product4", "product5", "product6", "product7", "product8", "product9"]

REMINDER: Use ONLY products from the list above. Match names EXACTLY (with capital letters). Return ONLY the JSON array.`;
};
