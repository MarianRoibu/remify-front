import React, { useState } from "react";
import getImageByTitle from "../../../api/images/getByTItle";
import getGifByTitle from "../../../api/gifs/getByTitle";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled, { keyframes } from "styled-components";

const SearchBarContainer = styled.div`
  width: 300px;
position: relative;
  
`;

const SearchInput = styled.input`
  width: 50%;
  padding: 10px;
  font-size: 16px;
  position: absolute;
  border: none;
  border-radius: 5px;
  transition: width 0.3s ease;
background-color: #263849;
  &:focus {
    width: 400px;
    outline: none;
  }
`;

const DropAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ResultsContainer = styled.div`
  margin-top: 3.7vh;
  position: absolute;
  width: 133%;
  background-color: #263849;
  animation: ${DropAnimation} 0.3s ease;
  z-index: 6;
`;

const ResultCategory = styled.h2`
  font-size: 2.3vh;

`;

const ResultItem = styled.div`

  font-size: 2vh;
`;


const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ images: [], gifs: [] });
    const { getAccessTokenSilently } = useAuth0();
  
    const handleSearch = async (title) => {
      try {
        // Fetch the search results
        const token = await getAccessTokenSilently();
        const imageResults = await getImageByTitle(title, token);
        const gifResults = await getGifByTitle(title, token);
  
        return {
          images: imageResults.data || [],
          gifs: gifResults.data || []
        };
      } catch (error) {
        console.error(error);
        return {
          images: [],
          gifs: []
        };
      }
    };
  
    const handleChange = async (e) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
  
      // Perform the search and update the results
      if (newQuery.length >= 3) {
        const searchResults = await handleSearch(newQuery);
        setResults(searchResults);
      } else {
        setResults({ images: [], gifs: [] });
      }
    };
  
    console.log(results);
  
    return (
        <SearchBarContainer>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
          />
          {query.length >= 3 && (
            <ResultsContainer>
              {results.images && results.images.length > 0 && (
                <div>
                  <ResultCategory>Images</ResultCategory>
                  {results.images.map((result) => (
                    <NavLink to={`/imagefull/${result._id}`}>
                    <ResultItem key={result._id}>{result.title}</ResultItem>
                  </NavLink>
                  ))}
                </div>
              )}
              {results.gifs && results.gifs.length > 0 && (
                <div>
                  <ResultCategory>GIFs</ResultCategory>
                  {results.gifs.map((result) => (
                    <NavLink to={`/giffull/${result._id}`}>
                    <ResultItem key={result._id}>{result.title}</ResultItem>
                 </NavLink>
                  ))}
                </div>
              )}
            </ResultsContainer>
          )}
        </SearchBarContainer>
      );
    };
  
  export default SearchBar;