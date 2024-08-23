import TrackingPage from './components/TrackingPage'
import './App.css';
import { useState } from 'react';

function App() {

  const [ordered, setOrdered] = useState(false)

  return (
    <div style={{'max-width': '480px', 'margin':'auto'}}>
      {ordered?
      <>
        <TrackingPage />
      </>
      :
      <>
        <div className='container'>
          <h1>Deliveryan</h1>
          <h2>"You're just a step away from deliciousness! Ready to place your order and track it to your door?"</h2>
          <button onClick={() => setOrdered(true)} className='order-btn'>Place Your Order</button>
        </div>
      </>}
      
    </div>
  );
}

export default App;
