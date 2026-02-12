import useProfileStore from "@/store/useProfileStore";

const range = (age: number, min: number, max: number): boolean => {
  return age >= min && age <= max;
};

export const useDiagnosis = () => {
  const { age, diagnoses, symptoms, flow, isRegularPeriod, intensity, painType, painPeriod, painLocation, painDuration, painCase, isMedicine, isPainChange } = useProfileStore();

  let primary = 0
  let secondary = 0
  let menstrualPain = 0

  //AGE S1 - S - step 1 
  if (range(age, 13, 20)) {
      primary += 3
      menstrualPain += 2
    } else if (range(age, 21, 25)) {
      primary += 2
      secondary += 1
      menstrualPain += 2
    } else if (range(age, 26, 35)) {
      primary += 1
      secondary += 2
      menstrualPain += 1
    } else if (range(age, 36, 45)) {
      secondary += 3
    } else if(age > 45) {
      primary -= 1
      secondary += 3
      menstrualPain -= 2
  }


  //DIAGNOSES S3
  if(diagnoses.includes('Normal')) {
      primary += 3
      menstrualPain += 2
    } else if(
      diagnoses.includes('Endometriosis') 
      || diagnoses.includes('Adenomyosis')
      || diagnoses.includes('Fibroids')
      || diagnoses.includes('Infertillity')
      || diagnoses.includes('Polycystic ovary syndrome')
    ) {
      primary -= 1
      secondary += 3
      menstrualPain -= 2
    } else if(diagnoses.includes("Cysts")) {
      secondary += 2
      menstrualPain -= 1
    } else if(diagnoses.includes("Hyperplasia")) {
      secondary += 3
      menstrualPain -= 2
  }


  //SYMPTOMS S4
  if(symptoms.includes("Nausea")) {
      primary += 2
      secondary += 1
    } else if(symptoms.includes("Diarrhea")) {
      secondary += 3
      menstrualPain += 1
    } else if(symptoms.includes("Headache")) {
      primary += 1
    } else if(symptoms.includes("Dizziness")) {
      primary += 1
      secondary += 1
    } else if(symptoms.includes("Intermenstrual bleeding")) {
      secondary -= 1
      secondary += 3
      menstrualPain -= 2
  }


  //FLOW S5
  if(flow === 'Medium') {
      secondary += 1
      menstrualPain += 3
    } else if(flow === 'Moderately elevated') {
      secondary += 2
      secondary += 2
    } else if(flow === 'Heavy / Clots') {
      secondary += 3
      menstrualPain -= 2
    } else if(flow === 'Light / Spotting') {
      secondary += 2
      menstrualPain -= 1
  }


  //REGULAR PERIOD S5
  if(isRegularPeriod.includes('Regular')) {
      primary += 1
      menstrualPain += 3
    }
    if(isRegularPeriod.includes('Not regular')) {
      primary += 3
      secondary += 2
      menstrualPain -= 1
    }
    if(isRegularPeriod.includes('Long delays/Amenorrhea')) {
      secondary += 3
      menstrualPain -= 2
  }


  //PAIN TYPE S6
  if(painType === 'Cramping') {
      primary += 3
      menstrualPain += 1
    } else if(painType === 'Aching') {
      secondary += 3
    } else if(painType === 'Sharp') {
      primary += 2
      secondary += 1
      menstrualPain -= 1
    } else if(painType === 'Dull') {
      secondary += 3
  }
  

  //PAIN INTENSITY S6
  if( intensity <= 3) {
      menstrualPain += 3
    } else if(intensity >= 4 && intensity <= 6) {
      primary += 2
      secondary += 1
    } else if(intensity > 6 ) {
      primary += 3
      secondary += 2
      menstrualPain -= 2
  }


  //PAIN PERIOD S7
  if(painPeriod === 'Before period') {
      primary += 3
      secondary += 2
      menstrualPain += 1
    } else if(painPeriod === 'During period') {
      primary += 2
      secondary += 1
      menstrualPain += 2
    } else if(painPeriod === 'Ovulation') {
      secondary += 2
    } else if(painPeriod === 'Not phase-dependent') {
      primary -= 1
      secondary += 3
      menstrualPain -= 1
    } else if(painPeriod === 'Inconsistent') {
      secondary += 1
  }


  //PAIN LOCATION S7
  if(painLocation.includes('Lower abdomen')) {
      primary += 3
      secondary += 2
    }
    if(painLocation.includes('Lower back')) {
      primary += 2
      secondary += 2
    }
    if(painLocation.includes('Legs')) {
      primary += 1
      secondary += 3
    }
    if(painLocation.includes('Pelvic area')) {
      secondary += 3
  }


  //PAIN DURATION S7
  if(painDuration === '1-2 days') {
      primary += 1
      menstrualPain += 3
    } else if(painDuration === 'Few hours') {
      primary += 3
      secondary += 1
      menstrualPain += 1
    } else if(painDuration === '>2 days') {
      primary += 1
      secondary += 3
      menstrualPain -= 2
  }

  //PAIN CASE S8
  if(painCase === 'Physical activity') {
      primary -= 1
      secondary += 2
    } else if(painCase === 'Intercourse') {
      secondary += 3
      menstrualPain += 1
    } else if(painCase === 'Bowel movement') {
      secondary += 3
      menstrualPain -= 1
    } else if(painCase === 'Urination') {
      secondary += 2
      menstrualPain -= 1
    } else if(painCase === 'No connection with actions') {
      primary += 2
      menstrualPain += 2
  }

  //MEDICINE EFFECT S8
  if(isMedicine === 'Weel relieve') {
      primary += 3
      menstrualPain += 3
    } else if(isMedicine === 'Partially help') {
      primary += 1
      secondary += 2
      menstrualPain += 1
    } else if(isMedicine === "Don't help") {
      primary -= 1
      secondary += 3
      menstrualPain -= 2
  }

  //PAIN CHANGES S9
  if(isPainChange === 'No') {
      primary += 2
      menstrualPain += 2
    } else if(isPainChange === 'A little') {
      primary += 1
      secondary += 1
    } else if(isPainChange === 'Nocitably') {
      secondary += 3
      menstrualPain -= 1
    } else if(isPainChange === 'Strongly') {
      primary -= 1
      secondary += 3
      menstrualPain -= 2
    } else if(isPainChange === 'The pain is new') {
      primary -= 2
      secondary += 3
      menstrualPain -= 2
  }


  //BONUSE POINTS
  if(painType === 'Cramping'  && isMedicine === 'Well relieve') primary += 2;
  if(isRegularPeriod.includes('Not regular') && painCase === 'Bowel movement') secondary += 2;
  if(isPainChange !== 'No'  && age > 25) primary -= 2;
  if(flow === 'Heavy / Clots' && isRegularPeriod.includes('Not regular')) secondary += 2;
  if(symptoms.includes("Diarrhea") && symptoms.includes("Nausea")) primary += 2;

  if(painLocation.includes('Legs') && painLocation.includes('Pelvic area')) secondary += 2;
  if(isRegularPeriod.includes('Regular') && flow === 'Medium')  menstrualPain += 2;
  if(isRegularPeriod.includes('Not regular') && flow === 'Light / Spotting')  secondary += 2;
  if(painPeriod === 'During period' && painDuration === '1-2 days')  secondary += 2;

  if(isRegularPeriod.includes('Not regular') && isRegularPeriod.includes('Long delays/Amenorrhea')) {
    secondary += 2;
    menstrualPain -= 1;
  }
  if(painLocation.includes('Lower abdomen') && painLocation.includes('Lower back') && painLocation.includes('Legs')) secondary += 2;
  if(symptoms.includes("Nausea") && symptoms.includes("Headache") && symptoms.includes("Dizziness")) primary += 2;

  if(isMedicine === 'Well relieve' && painDuration === 'Few hours') menstrualPain += 2;
  if(painCase === 'Bowel movement' && flow === 'Heavy / Clots') {
    secondary += 2;
    menstrualPain -= 1;
  } 
  if(isPainChange !== 'No' && isRegularPeriod.includes('Not regular') && (
    !diagnoses.includes('Normal')
    && !diagnoses.includes("Haven't done it")
  )) {
    secondary += 3;
    menstrualPain -= 2;
  }

  const winner = Math.max(primary, secondary, menstrualPain);

  const titles: Record<string, string> = {
    "primary": 'Primary dysmenorrhea',
    "secondary": 'Secondary dysmenorrhea',
    "menstrualPain": 'Menstrual pain',
  }


  return { primary, secondary, menstrualPain, diagnosis: titles[winner] }; 
};
