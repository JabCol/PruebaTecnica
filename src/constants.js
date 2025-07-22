export const SortBy = {
  NAME: 'name',
  REGION: 'region',
  NONE: 'none',
}

export const compareAttribute = {
  [SortBy.NAME]: (country) => country.name.common,
  [SortBy.REGION]: (country) => country.region,
}
