import React from 'react';
import './App.css';
import Header from './components/Header';
import SubscriptionPlans from './components/SubscriptionPlans';
import AssortedMeals from './components/AssortedMeals';
import ErrorModal from './components/ErrorModal';  // Import ErrorModal

function App() {
  return (
    <div className="App">
      <Header />
      <SubscriptionPlans />
      <AssortedMeals />

      {/* Render ErrorModal without props; it uses the context */}
      <ErrorModal />
    </div>
  );
}

export default App;
