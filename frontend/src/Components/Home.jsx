import React from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };


  return (
    <>
    <header>
    <img className='logo'src="src\assets\WhatsApp Image 2025-10-21 at 21.37.10_d07fcf2f.jpg" />
    <p className='top'>AllergenScanner</p>
    </header>
    <div className='fullimage'>
    <main>
    <h1 className='main'>Tired of the Ingredient Guessing Game?</h1>
    <p className='page'>Ingredient lists are long. Allergens are sneaky. Cross-contamination is a constant worry.<br></br> Standard allergy apps only check for the obvious, leaving you exposed to hidden derivatives and related compounds that can trigger a reaction</p>
    <h1 className='start' onClick={handleGetStarted}>Get Started</h1>
    </main>


    <section className="guardian-section">
      <h1 className="guardian-title">Your Guardian for Every Part of Life</h1>

      <div className="guardian-cards">
        <div className="guardian-card">
          <div className="emoji">🍎</div>
          <h2>For Food Allergies</h2>
          <p>
            Navigate grocery aisles with confidence. Instantly flag gluten,
            dairy, nuts, soy, and over 200+ other allergens in seconds.
          </p>
        </div>

        <div className="guardian-card">
          <div className="emoji">🧴</div>
          <h2>For Skin Sensitivities</h2>
          <p>
            Find the perfect cosmetic. Scan lotions and shampoos for common
            irritants like sulfates, parabens, and hidden fragrances before you
            buy.
          </p>
        </div>

        <div className="guardian-card">
          <div className="emoji">🥗</div>
          <h2>For Complex Diets & Lifestyles</h2>
          <p>
            Whether you're vegan, keto, or managing a complex condition like
            MCAS, AllergenScanner helps you stick to your plan by decoding every
            label.
          </p>
        </div>
      </div>
    </section>
 </div>
    <footer>
      <h1 className='title'>AllergenScanner</h1>
       <a href='/'>About</a>
       <a href='/'>Terms & Conditions</a>
       <a href='/'>Privacy Policy</a>
       <br></br>
       <p className='last'>&copy;AllergenScanner.All rights reserved</p>
    </footer>

    

    </>
  )
}

export default Home
