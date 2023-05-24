const fetchManyGifById = async (ids, token) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/gif/id/many/${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const response = await request.json();   
      console.log('this is the gif image res',response);
      return response;
   
    } catch (error) {
      console.error(error);
      return { msg: error.message, token };
    }
  };
  
  export default fetchManyGifById;
  