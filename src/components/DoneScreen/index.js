import React, { useEffect, useState } from 'react'
import TrackingPage from '../TrackingPage';
import Done from './done.json'
import Lottie from 'lottie-react'

const DoneScreen = () => {

    const [timer, setTimer] = useState(false);

    useEffect(() => {
        const timerId = setTimeout(() => setTimer(true), 3000);
        return () => clearTimeout(timerId);
    }, []);

  return (
    <div>
        {timer? 
            <><TrackingPage /></>
            :
            <div className='done-container'>
                <Lottie className='done-icon' animationData={Done} />
                <h1>Order Placed...</h1>
            </div>}
    </div>
  )
}

export default DoneScreen