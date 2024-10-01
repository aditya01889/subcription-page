import React, { Suspense } from 'react';
import './App.css';
import Header from './components/Header';
import ErrorModal from './components/ErrorModal';  // Error modal will always load
import Footer from './components/Footer';


// Lazy load other components
const SubscriptionPlans = React.lazy(() => import('./components/SubscriptionPlans'));
const AssortedMeals = React.lazy(() => import('./components/AssortedMeals'));

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <SubscriptionPlans />
        <AssortedMeals />
      </Suspense>
      <Footer />
      {/* Render ErrorModal without props; it uses the context */}
      <ErrorModal />
    </div>
  );
}

export default App;
