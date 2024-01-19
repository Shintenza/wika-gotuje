const strToArray = (str) => {
  if (str.length == 0) return [];
  const withoutBrackets = str.replace('{', '').replace('}', '');
  const elementsArray = withoutBrackets
    .split(',')
    .map((element) => element.trim());
  return elementsArray;
};

export default strToArray;
