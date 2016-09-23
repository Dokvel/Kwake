export function getPronoun(gender, person = 'third', pronoun_case = 'subjective') {
  var PRONOUNS = {
    'first': {
      'subjective': 'I',
      'objective': 'me',
      'possessive': 'my',
      'reflexive': 'myself'
    },
    'second': {
      'subjective': 'you',
      'objective': 'you',
      'possessive': 'your',
      'reflexive': 'yourself'
    },
    'third': {
      'neutral': {
        'subjective': 'they',
        'objective': 'them',
        'possessive': 'their',
        'reflexive': 'themself'
      },
      'female': {
        'subjective': 'she',
        'objective': 'her',
        'possessive': 'her',
        'reflexive': 'herself'
      },
      'male': {
        'subjective': 'he',
        'objective': 'him',
        'possessive': 'his',
        'reflexive': 'himself'
      },
      'unknown': {
        'subjective': 'he/she',
        'objective': 'him/her',
        'possessive': 'his/her',
        'reflexive': 'himself/herself'
      }
    }
  };

  if (person) {
    if (person === 'third' && gender) {
      return PRONOUNS[person][gender][pronoun_case];
    } else {
      return PRONOUNS[person][pronoun_case] || PRONOUNS[person]['unknown'][pronoun_case];
    }
  } else {
    return PRONOUNS.first.subjective;
  }
}

export const validateEmail = (email)=> {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const indefiniteArticle = (phrase) => {

  // Getting the first word
  var match = /\w+/.exec(phrase);
  if (match)
    var word = match[0];
  else
    return "an";

  var l_word = word.toLowerCase();
  // Specific start of words that should be preceeded by 'an'
  var alt_cases = ["honest", "hour", "hono"];
  for (var i in alt_cases) {
    if (l_word.indexOf(alt_cases[i]) == 0)
      return "an";
  }

  // Single letter word which should be preceeded by 'an'
  if (l_word.length == 1) {
    if ("aedhilmnorsx".indexOf(l_word) >= 0)
      return "an";
    else
      return "a";
  }

  // Capital words which should likely be preceeded by 'an'
  if (word.match(/(?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z]/)) {
    return "an";
  }

  // Special cases where a word that begins with a vowel should be preceeded by 'a'
  let regexes = [/^e[uw]/, /^onc?e\b/, /^uni([^nmd]|mo)/, /^u[bcfhjkqrst][aeiou]/]
  for (var i in regexes) {
    if (l_word.match(regexes[i]))
      return "a"
  }

  // Special capital words (UK, UN)
  if (word.match(/^U[NK][AIEO]/)) {
    return "a";
  }
  else if (word == word.toUpperCase()) {
    if ("aedhilmnorsx".indexOf(l_word[0]) >= 0)
      return "an";
    else
      return "a";
  }

  // Basic method of words that begin with a vowel being preceeded by 'an'
  if ("aeiou".indexOf(l_word[0]) >= 0)
    return "an";

  // Instances where y follwed by specific letters is preceeded by 'an'
  if (l_word.match(/^y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)/))
    return "an";

  return "a";
};
