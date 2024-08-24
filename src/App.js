import './App.css';
import { useState } from 'react';
import DoneScreen from './components/DoneScreen';
import Order from './order.json'
import Lottie from 'lottie-react';

function App() {

  const [ordered, setOrdered] = useState(false)

  return (
    <div style={{'max-width': '480px', 'margin':'auto'}}>
      {ordered?
      <>
        <DoneScreen />
      </>
      :
      <>
        <div className='container'>
          <h1>Deliveryan</h1>
          <div>
            <Lottie className='order-icon' animationData={Order} />
            <h2>"You're just a step away from deliciousness! Ready to place your order and track it to your door?"</h2>
          </div>
            <button onClick={() => setOrdered(true)} className='order-btn'>Place Your Order</button>
        </div>
      </>}
      
    </div>
  );
}

export default App;
