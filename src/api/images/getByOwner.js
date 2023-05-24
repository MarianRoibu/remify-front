const getImageByOwner = async (ownerId, token) => {
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/image/owner/${ownerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await request.json();
  console.log('this is the data', response.data);
      return response.data; // Return the 'data' property of the response
    } catch (error) {
      return { msg: error.message };
    }
  };
  
  export default getImageByOwner;
  