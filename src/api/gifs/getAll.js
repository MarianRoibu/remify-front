const fetchGifsAll = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/gifpublic/all/`);
    const data = await response.json();
    console.log(data); // Log the data to the console for testing
    return data;
  } catch (error) {
    console.error(error);
    return { msg: error.message };
  }
};

export default fetchGifsAll;
