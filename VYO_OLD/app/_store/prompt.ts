// type PhaseName = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
// export const createPrompt = (phase:PhaseName) => {

//   const productsList : Record<PhaseName, string> = {
//     menstrual: `Menstrual Phase (Fe, Mg, Ω3, K, B1, B2, B6, B9, B12):Beef liver, cooked; Chicken liver; Stewed beef; Cooked pork; Roast turkey; Boiled chicken breast; Baked salmon; Cooked Atlantic salmon; Raw Atlantic mackerel; Pacific herring, cooked; Cooked bluefin tuna; Canned tuna; Canned sardines; Cooked mussels; Baked trout; Salmon fish oil; Boiled egg; Whole milk; Plain yogurt; Cottage cheese; Cheddar cheese; Brie cheese; Fortified nutritional yeast; Tofu; Cooked lentils; Cooked chickpeas; Cooked white beans; Cooked kidney beans; Cooked green peas; Cooked beans; Cooked buckwheat; Cooked oats; Cooked millet; Cooked brown rice; Cooked pearl barley; Durum wheat pasta; Whole grain bread; Wheat bread; Boiled potato; Baked sweet potato; Cooked spinach; Cooked broccoli; Cooked cauliflower; Cooked asparagus; Cooked Brussels sprouts; Avocado; Banana; Orange; Orange juice; Raisins; Dates; Dried figs; Dried apricots; Pumpkin seeds; Sunflower seeds; Sesame seeds; Almonds; Cashews; Pistachios; Peanuts; Walnuts; Dark chocolate 70%`,
//     follicular: `Follicular Phase (Mg, B1, B2, B6, B9, B12, Ch): Baked salmon; Boiled egg; Whole milk; Plain yogurt; Cottage cheese; Beef liver, cooked; Chicken liver; Stewed beef; Roast turkey; Boiled chicken breast; Canned tuna; Tofu; Cooked lentils; Cooked chickpeas; Cooked white beans; Cooked green peas; Cooked beans; Cooked buckwheat; Cooked oats; Cooked millet; Cooked brown rice; Whole grain bread; Baked sweet potato; Cooked spinach; Cooked broccoli; Avocado; Banana; Orange; Dates; Dried figs; Dried apricots; Pumpkin seeds; Sunflower seeds; Sesame seeds; Almonds; Cashews; Pistachios; Peanuts; Fortified cereal; Fortified plant milk`,
//     ovulation: `Ovulatory Phase (Mg, B1, B2, B6, B9, B12, Ch, Fib, AO, S):Baked salmon; Boiled egg; Whole milk; Plain yogurt; Cottage cheese; Beef liver, cooked; Chicken liver; Stewed beef; Roast turkey; Boiled chicken breast; Canned tuna; Cooked lentils; Cooked chickpeas; Cooked white beans; Cooked green peas; Cooked beans; Cooked buckwheat; Cooked oats; Cooked millet; Cooked brown rice; Whole grain bread; Baked sweet potato; Cooked spinach; Cooked broccoli; Cooked cauliflower; Cooked Brussels sprouts; Raw cabbage; White cabbage; Raw carrot; Avocado; Banana; Apple; Pear with skin; Raspberries; Strawberries; Black currant; Kiwifruit; Acerola cherry; Rose hips; Orange; Dates; Dried figs; Dried apricots; Pumpkin seeds; Sunflower seeds; Sesame seeds; Almonds; Cashews; Pistachios; Peanuts; Walnuts; Flaxseed ground; Chia seeds; Dark chocolate 70%; Fortified cereal; Fortified plant milk`,
//     luteal: `Luteal Phase (Mg, B6, Fib, Ω3, E):Baked salmon; Boiled egg; Whole milk; Plain yogurt; Cooked lentils; Cooked chickpeas; Cooked white beans; Cooked buckwheat; Cooked oats; Cooked millet; Cooked brown rice; Baked sweet potato; Cooked spinach; Avocado; Banana; Dates; Dried figs; Dried apricots; Pumpkin seeds; Sunflower seeds; Sesame seeds; Almonds; Cashews; Pistachios; Peanuts; Walnuts; Flaxseed ground; Flaxseed oil; Chia seeds; Canola oil; Soybean oil; Dark chocolate 70%`,
//   }

//   const actualProducts = productsList[phase as keyof typeof productsList];
//  return(
//   `
// You are an expert Clinical Nutritionist specializing in women's hormonal health and endometriosis management.

// PHASE: ${phase}
// AVAILABLE PRODUCTS: ${actualProducts}

// ### YOUR TASK:
// Generate ONLY 1 optimal set of 9 products maximally balanced for the ${phase} phase.

// CRITICAL: Return ONLY ONE list. Select the most diverse and synergistic combination possible.

// ### SELECTION CRITERIA (in priority order):
// 1. **Nutrient Density**: Maximum coverage of phase-specific nutrients (Fe, Mg, Ω3, B vitamins, etc.)
// 2. **Bioavailability**: heme iron > non-heme iron, pair plant iron with Vitamin C sources
// 3. **Food Synergy**: Choose products that work well together and enhance each other's absorption
// 4. **Variety**: Mix different food groups (proteins, vegetables, fruits, nuts, grains)
// 5. **Anti-inflammatory**: For endometriosis management
// 6. **Digestive Tolerance**: Prefer cooked/warm foods during menstrual; avoid high-histamine during ovulation

// ### PHASE-SPECIFIC PHYSIOLOGY:
// - **Menstrual**: Blood replenishment (Iron, B12), muscle relaxation (Magnesium). Prefer cooked foods.
// - **Follicular**: Energy rebuilding (B vitamins), gut health (Choline). Light proteins + complex carbs.
// - **Ovulatory**: Estrogen metabolism (Fiber, Sulfur amino acids), antioxidant protection.
// - **Luteal**: Blood sugar stability (Magnesium, B6, Fiber), inflammation control (Omega-3, Vitamin E).

// ### COMPOSITION (must include):
// - 2-3 Protein sources (meat/fish/eggs/legumes/tofu)
// - 3-4 Fiber/Vitamin sources (vegetables/fruits/greens)
// - 1-2 Healthy fats (seeds/nuts/avocado/oils)
// - 1-2 Complex carbs (grains/potatoes/bread)

// ### STRICT CONSTRAINTS:
// ✓ Use ONLY products from the AVAILABLE PRODUCTS list
// ✓ Exactly 9 unique products
// ✓ All names in lowercase exactly as shown in the list
// ✓ Products must complement each other nutritionally
// ✓ Return ONLY ONE JSON array

// ### OUTPUT FORMAT:
// ["product1", "product2", "product3", "product4", "product5", "product6", "product7", "product8", "product9"]

// Return ONLY the JSON array with the single most optimal combination. No additional text or multiple variants.`
//  )
// }

