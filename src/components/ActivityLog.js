import React, { useState } from 'react'
import ProductCard from './ProductCard';

function ActivityLog() {
    const [state, setState] = useState('Bought');

    const options = [
        {
          title: 'Bought',
        },
        {
          title: 'Sold',
        },
        {
          title: 'Borrowed',
        },
        {
          title: 'Lent',
        }
      ];

    const handleOption = (title) => {
        if(title === 'Bought'){
            console.log('Bought');
            setState('Bought');
        }
        else if(title === 'Sold'){
            console.log('Sold');
            setState('Sold');
        } 
        else if(title === 'Borrowed'){
            console.log('Borrowed');
            setState('Borrowed');
        } 
        else if(title === 'Lent'){
            console.log('Lent');
            setState('Lent');
        }
    }
  return (
    <div className='container center' style={{minHeight: '300px', width: '60%'}}>
        <div className='flex justify-space-around'>
            {
              (
                options.map((option, index) => (
                  <div key={index} onClick={() => handleOption(option.title)} className='pointer pd-20' style={{flex: 1, textAlign: 'center', fontSize: '18px', borderBottom: state === option.title ? '2px solid blue' : 'none'}}>
                    <p>{option.title}</p>
                  </div>
                ))
              )
            }
        </div>

        <div>
            {/* <ProductCard /> */}
            {
              (
                state === 'Bought' ? 
                  (
                    <div>
                        Bought
                    </div>
                  )
                  
                  : 
                  
                state === 'Sold' ? 
                  (
                    <div>
                        Sold
                    </div>
                  )
                  :
                state === 'Borrowed' ? 
                  (
                    <div>
                        Borrowed
                    </div>
                  )
                  :
                state === 'Lent' ? 
                  (
                    <div>
                        Lent
                    </div>
                  )
                  : null
              )
            }
        </div>

    </div>
  )
}

export default ActivityLog