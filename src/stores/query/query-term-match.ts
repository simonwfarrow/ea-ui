const NB_CHARS_BEFORE_AND_AFTER = 20;

export default class QueryTermMatch {
  propertyName: string;
  propertyValue;
  textBeforeMatch: string;
  termMatched: string;
  textAfterMatch: string;

  constructor(queryTerm: string, regExMatchResult: string[]) {
    this.propertyName = regExMatchResult[1];
    this.propertyValue = regExMatchResult[2];

    const allTextBefore = regExMatchResult[3];
    if (allTextBefore.length <= NB_CHARS_BEFORE_AND_AFTER) {
      this.textBeforeMatch = allTextBefore;
    } else {
      this.textBeforeMatch = allTextBefore.substring(allTextBefore.length - NB_CHARS_BEFORE_AND_AFTER, allTextBefore.length);
    }

    const allTextAfter = regExMatchResult[4];
    if (allTextAfter.length <= NB_CHARS_BEFORE_AND_AFTER) {
      this.textAfterMatch = allTextAfter;
    } else {
      this.textAfterMatch = allTextAfter.substring(0, NB_CHARS_BEFORE_AND_AFTER);
    }

    this.termMatched = queryTerm;
  }
}
