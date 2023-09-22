import React, { useState } from 'react'
const BennysItemMap = ({icon, label, price, item, GenCounter, SetGenCounter, SetCartItems, ToPay, SetToPay}) => {
    const [Counter, setCounter] = useState(0)

    const SetItemGeneral = () => {
        setCounter(Counter + 1)
        SetGenCounter(GenCounter + 1)
        SetToPay(ToPay + price)
        SetCartItems(cats => [{label: label, item: item, price: price, icon: icon, index: GenCounter + 1}, ...cats])
    }

    return (
      <div className='bennysItems'>
          {Counter > 0 ? <button className='CounterBennys'>{Counter}</button> : <></>}
          <div className='bennysIcon'><img alt="img" src={icon} style={{left: '-50px'}}/></div>
              <div className='BennysText'>
                  <p>{label}</p>
                  <p>{`Price: ${price} GNE`}</p>
              </div>
          <button className='BennysAddCartBTN' onClick={SetItemGeneral}>ADD TO CART</button>
      </div>
    )
}

export default BennysItemMap