import React from 'react';
import './App.css';
import Header from './components/Header';
import SubscriptionPlans from './components/SubscriptionPlans';
import AssortedMeals from './components/AssortedMeals';

function App() {
  return (
    <div className="App">
      <Header />
      <SubscriptionPlans />
      <AssortedMeals />
    </div>
  );
}

export default App;
