import React, {useState, useEffect, useRef} from 'react'
import { fetchNui } from '../../../../utils/fetchNui'
import Draggable from 'react-draggable'
import BennysItemMap from './BennysItemMap'

const BennysApp = React.memo(({counter, setCounter}: any) => {
    const ref = useRef()
    const [GenCounter, SetGenCounter] = useState(0)
    const [ToPay, SetToPay] = useState(0)
    const [Consumable, SetConsumable] = useState(false)
    const [Performance, SetPerformance] = useState(false)
    const [Cosmetic, SetCosmetic] = useState(false)
    const [Cart, SetCart] = useState(false)
    const [BennysItems, setBennysItems] = useState([])
    const [PerformanceItems, setPerformanceItems] = useState([])
    const [CosmeticItems, setCosmeticItems] = useState([])
    const [ConsumableItems, setConsumableItems] = useState([])
    const [PerformanceObject, setPerformanceObject] = useState([])
    const [CosmeticObject, setCosmeticObject ] = useState([])
    const [CartItems, SetCartItems] = useState([])
    const [PerformanceItemsEnable, setPerformanceItemsEnable] = useState(true)
    const [CosmeticItemsEnable, setCosmeticItemsEnable] = useState(true)
    const [ConsumableItemsEnable, setConsumableItemsEnable] = useState(true)

    const Provider = (data) => {
        if (data.action === "UpdateValueUI") {
            if (data.app === 'SetConsumableItems') {
                setConsumableItems(data.data.ConsumableItems)
                setConsumableItemsEnable(data.data.enable)
            } else if (data.app === 'SetPerformanceObject') {
                setPerformanceObject(data.data.PerformanceObject)
                setPerformanceItemsEnable(data.data.enable)
            } else if (data.app === 'SetCosmeticObject') {
                setCosmeticObject(data.data.CosmeticObject)
                setCosmeticItemsEnable(data.data.enable)

            }
        }
    }
    
    useEffect(() => {
        const EventListener = (event) => {
            if (event.data) {
              Provider(event.data)
            }
        }
        window.addEventListener("message", EventListener)
    }, [])

    const CloseApp = () => {
        setCounter(false);
    }

    const getItemByName = (name) => {
        if (Consumable) {
            return ConsumableItems.filter(own => 
                own.item.toLowerCase().includes(name.toLowerCase())
            )
        }else if (performance){
            return PerformanceObject.filter(own => 
                own.item.toLowerCase().includes(name.toLowerCase())
            )    
        }else if (Cosmetic){
            return CosmeticObject.filter(own => 
                own.item.toLowerCase().includes(name.toLowerCase())
            )
        }  
    }

    const SetFilter = (e) => {
        const id = getItemByName(e.target.value)
        if (Consumable) {
            setBennysItems(id)
        }else if (performance){
            setPerformanceItems(id)
        }else if (Cosmetic){
            setCosmeticItems(id)
        }  
    }

    const OpenConsumables = () => {
        SetConsumable(true)
        SetPerformance(false)
        SetCosmetic(false)
        SetCart(false)
        setBennysItems(ConsumableItems)
    }

    const OpenPerformance = () => {
        SetPerformance(true)
        SetConsumable(false)
        SetCosmetic(false)
        SetCart(false)
        setPerformanceItems(PerformanceObject)
    }

    const OpenCosmetics = () => {
        SetCosmetic(true)
        SetPerformance(false)
        SetConsumable(false)
        SetCart(false)
        setCosmeticItems(CosmeticObject)
    }

    const OpenCart = () => {
        SetCosmetic(false)
        SetPerformance(false)
        SetConsumable(false)
        SetCart(true)
        setCosmeticItems(CosmeticObject)
    }

    const RemoveItemCart = (bg) => {
        SetGenCounter(GenCounter - 1)
        SetToPay(ToPay - bg.price)
        SetCartItems((CartItems) => {
            const tasks = [...CartItems];
            const indexOfTaskToDelete = tasks.findIndex(
              task => task.index === bg.index
            );
            tasks.splice(indexOfTaskToDelete, 1);
            return tasks 
        });
    }
    const tryBuyItem = () => {
        //fetchNui('rlrp-boosting:BennysItem', CartItems)
        fetchNui('rlrp-boosting:BennysItem', {
            CartItems, ToPay
        }).then((resp) => {
            if (resp.Continue) {
                SetCartItems([])
                SetGenCounter(0)
                SetToPay(0)
            }
        });
    }



    
    return (
        <div>
            <Draggable defaultPosition={{x: -650, y: -400}} handle='.boosting-bb-buttons'>
                <div className={counter ? '' : 'hiddenComponent'}>
                    <div className='BennysApp'>
                        <div className='boosting-bb-buttons' ref={ref}>
                            <div className="texto boosting-text" style={{fontWeight: 600}}>Bennys Online Shop</div>
                            <div className='boosting-close-container'>
                                <button className="btn min-btn" key={"cmin-btn"}/>
                                <button className="btn close-btn" key={"cclose-btn"} onClick={CloseApp}/>
                            </div>
                        </div>
                        <div className='BennysAppButtons'>
                            <div className='auto'>
                                {CosmeticItemsEnable && <button className={Cosmetic ? 'ButBennys': 'ButBennys2'} key='Cometic3' onClick={OpenCosmetics}>COSMETIC PARTS</button>}
                                {PerformanceItemsEnable && <button className={Performance ? 'ButBennys': 'ButBennys2'} key='Performance3' onClick={OpenPerformance}>PERFORMANCE PARTS</button>}
                                {ConsumableItemsEnable && <button className={Consumable ? 'ButBennys': 'ButBennys2'} key='Consumable3' onClick={OpenConsumables}>CONSUMABLE PARTS</button>}
                                <input className='InputBennys' onChange={SetFilter} placeholder=" Buscar" style={{color: 'white', fontSize: '12px'}}></input>
                            </div>
                            <div className='auto'>
                                <button className='CarritoBennys' key='Consumable4' onClick={OpenCart}>
                                    <i className="fa-solid fa-cart-shopping" style={{color: 'white'}}/>
                                        Cart
                                    <div className='CounterBennysItems'>{GenCounter}</div>
                                </button> 
                            </div>
                        </div>
                        <div className='bennysContainer'>
                            {Consumable && BennysItems.map( (bg) => (
                                <BennysItemMap icon={bg.icon} label={bg.label} price={bg.price} item={bg.item} GenCounter={GenCounter} SetGenCounter={SetGenCounter} SetCartItems={SetCartItems} ToPay={ToPay} SetToPay={SetToPay}/>
                            ))} 
                            {Performance && PerformanceItems.map( (bg) => (
                                <BennysItemMap icon={bg.icon} label={bg.label} price={bg.price} item={bg.item} GenCounter={GenCounter} SetGenCounter={SetGenCounter} SetCartItems={SetCartItems} ToPay={ToPay} SetToPay={SetToPay}/>
                            ))} 
                            {Cosmetic && CosmeticItems.map( (bg) => (
                                <BennysItemMap icon={bg.icon} label={bg.label} price={bg.price} item={bg.item} GenCounter={GenCounter} SetGenCounter={SetGenCounter} SetCartItems={SetCartItems} ToPay={ToPay} SetToPay={SetToPay}/>
                            ))} 
                            {Cart && CartItems.map( (bg) => (
                                <div className='bennysItemsCart'>
                                    <div className='bennysItemIcon'>
                                        <img alt="img" src={bg.icon} style={{}} width={32} height={32}/>
                                    </div>
                                    <p className='CartItemText'>{`- ${bg.label}(1x) - ${bg.price} GNE`}</p>
                                    <button className='ButBennysCart' key='CartItems' onClick={() => RemoveItemCart(bg)}>REMOVE ITEM</button> 
                                </div>
                            ))} 
                            {Cart && <>
                                <div className='CartCheckout'>
                                    <p className='CheckoutText'>{`Total ${ToPay} GNE`}</p>
                                    <button className='CheckOut' key='CartItems' onClick={tryBuyItem}>CHECKOUT</button> 
                                </div>
                            </>}
                        </div>
                        {/* <p className='GNE'>{`Your GNE ${Gne}`}</p> */}
                    </div>
                </div>
            </Draggable>
        </div>
    )
})

export default BennysApp