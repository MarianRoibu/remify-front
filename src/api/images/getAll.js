const fetchImagesAll = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/imagepublic/all/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { msg: error.message };
  }
};

export default fetchImagesAll;
