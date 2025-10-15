export const getWorkTypesText = (workTypes) => {
  if (!Array.isArray(workTypes)) return '';
  return workTypes.map(type => type.name).join(', ');
};

export const getLocalCost = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(price);
}