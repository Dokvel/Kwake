export function getPronoun(gender) {
  const MALE_PRONOUN = 'he';
  const FEMALE_PRONOUN = 'she';
  if (!gender) {
    return `${MALE_PRONOUN}/${FEMALE_PRONOUN}`
  }
  return gender === 'male' ? MALE_PRONOUN : FEMALE_PRONOUN;
}

export const validateEmail = (email)=> {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
