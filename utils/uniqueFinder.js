export const unique = async (value, model) => {
    const ifUnique = await model.findOne({ name: value });
    if (!ifUnique) {
      return true;
    }
    return false;
  };
  