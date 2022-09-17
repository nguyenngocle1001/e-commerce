const shortNameGenerate = (name) => {
  const names = name.split(" ");
  return names
    .slice(-2)
    .map((item) => item[0])
    .join("");
};
export default shortNameGenerate;
