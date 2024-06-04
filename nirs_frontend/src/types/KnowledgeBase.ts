export type Parameter = {
  id: string;
  shortName: string;
  description: string;
  createdDate: string;
  modifiedDate: string;
  tags: string[];
  type: string;
  defaultValue: string;
  isSecret: boolean;
};

export type RuleParameter = {
  shortName: string;
  parameterID: string;
};

export type Rule = {
  id: string;
  shortName: string;
  description: string;
  createdDate: string;
  modifiedDate: string;
  tags: string[];
  patternID: string;
  inputParameters: RuleParameter[];
  outputParameters: RuleParameter[];
};

export type PatternParameter = {
  shortName: string;
  type: string;
};

export type PatternProgramFields = {
  language: string;
  script: string;
};

export type Pattern = {
  id: string;
  shortName: string;
  description: string;
  createdDate: string;
  modifiedDate: string;
  type: string;
  inputParameters: PatternParameter[];
  outputParameters: PatternParameter[];
  programFields: PatternProgramFields;
};

export type Tag = {
  id: string;
  shortName: string;
  description: string;
  createdDate: string;
  modifiedDate: string;
};

export type KnowledgeBase = {
  version: string;
  id: string;
  shortName: string;
  description: string;
  createdDate: string;
  modifiedDate: string;
  parameters: Parameter[];
  rules: Rule[];
  patterns: Pattern[];
  tags: Tag[];
};
