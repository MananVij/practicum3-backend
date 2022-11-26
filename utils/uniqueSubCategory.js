export const uniqueSubCategory = async (value, model) => {
  const ifUnique = await model.findOne({ title: value });
  if (!ifUnique) {
    return true;
  }
  return false;
};
