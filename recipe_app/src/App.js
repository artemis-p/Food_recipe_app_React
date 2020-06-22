import React, {useEffect, useState} from 'react'; 
import './App.css';

const App = () => {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  const [recipes, setRecipes] = useState([]);


  //const [counter, setCounter] = useState(0);

  // useEffect(() =>{
  //   // console.log('Effect has been run')
  // }, []); // adding an empty set of squared brackets helps us run tge request only once and not every time that we click on the counter. If we add a value, eg counter then this is going to fetch data every time we run the counter

  useEffect( () => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json(); //because we are requesting data from an external API we need to add "await" on every promise
    console.log(data.hits);
  }

  return (
    <div className = 'App'>
      <form className='search-form'>
        <input className='search-bar' type="text"/>
        <button className='search-button' type="submit">Search</button>
      </form>
      {/* <h1 onClick ={() => setCounter(counter + 1)}>{counter}</h1> */}
    </div>
  )
}

export default App;
