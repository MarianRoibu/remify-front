const postGif = async (data, token) => {
    if (!data) {
      return {
        status: false,
        msg: "There is no info in post.",
      };
    }
  
    const formData = new FormData();
  
    formData.append("owner", data.owner);
    formData.append("title", data.gifTitle);
    formData.append("artist", data.artist);
    formData.append("gif", data.gifMeme[0]);
    formData.append("release", data.release);
  
    console.log('this is the data:',data);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/gif/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const responseData = await response.json();
  
      return responseData;
    } catch (err) {
      return {
        status: false,
        msg: err.message,
      };
    }
  };
  
  export default postGif;
  