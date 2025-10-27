import React, { useState } from "react";

const About = () => {
    const URL = "https://official-joke-api.appspot.com/random_joke";

    const [jokes , setJokes] = useState({});
    

    const getJoke = async() =>{
        let response = await fetch(URL);
        let json = await response.json();
        console.log(json);
        setJokes({setup:json.setup , punchline:json.punchline})
    }
    return(
        <>
        <h1>Get A New Joke</h1>
        <h2>{jokes.setup} - {jokes.punchline}</h2>
        <button onClick={getJoke}>Click Here</button>    
        </>
    )
}

export default About;