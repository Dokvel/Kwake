export function getPronoun(gender) {
  const MALE_PRONOUN = 'he';
  const FEMALE_PRONOUN = 'she';
  if (!gender) {
    return `${MALE_PRONOUN}/${FEMALE_PRONOUN}`
  }
  return gender === 'male' ? MALE_PRONOUN : FEMALE_PRONOUN;
}
