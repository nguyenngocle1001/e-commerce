const generateSearchObject = (value, fields = []) => {
  if (!value || !fields.length) return {};

  const search = {
    $or: fields.map((field) => ({
      [field]: { $regex: value, $options: 'i' },
    })),
  };

  return search;
};

module.exports = generateSearchObject;
