import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  const [recipes, setRecipes] = useState([]); // emtpy array for the recipes
  const [search, setSearch] = useState(""); // empty string for the search
  const [query, setQuery] = useState("banana"); // I want to fetch the data only after I've hit the search button - links to line 25

  //const [counter, setCounter] = useState(0);

  // useEffect(() =>{
  //   // console.log('Effect has been run')
  // }, []); // adding an empty set of squared brackets helps us run tge request only once and not every time that we click on the counter. If we add a value, eg counter then this is going to fetch data every time we run the counter

  useEffect(() => {
    getRecipes(); // we can get new recipes every time we eg. hit search, although every time we write a letter then it keeps on making requests to the below fetch link, so we don't want to fetch that much data
  }, [query]); //this is going to run only when we click the submit button and this is the time that the 'chicken ' value is going to change, line 11

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json(); //because we are requesting data from an external API we need to add "await" on every promise
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault(); // prevents the page from refreshing
    setQuery(search); // after we finished typing and hit the search button we can get what we have written in the search = text, so our state can be equal to search
    setSearch(""); // if you want the search field to reset after you've hit the search button
  }; // adding an event so whenever I submit the form line 43 I want the getSearch to run

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label} // this is making every prop unique,so if we delete one recipe react doesn't have to re-render the rest of them
            title={recipe.recipe.label}
            calories={Math.round(recipe.recipe.calories)}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients} //in order to loop through the array going back to recipe.js and adding ingredients in there
            //healthLabels={recipe.recipe.healthLabels}
          />
        ))}
      </div>
      {/* <h1 onClick ={() => setCounter(counter + 1)}>{counter}</h1> */}
    </div>
  );
};

export default App;
