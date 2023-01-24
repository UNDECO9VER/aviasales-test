import { useDispatch } from 'react-redux'

import {setCostFilter} from '../../store/filtersSlice'

import style from './TicketType.module.scss'
const TicketType =()=>{

  const filter = 
  [{label: 'Самый дешевый',cost: 'cheapest'}, 
    {label:'Самый быстрый',cost: 'fastest'}, 
    {label:'Оптимальный',cost: 'optimal'}]

  const dispatch = useDispatch()
  const setFilter =(payload)=> dispatch(setCostFilter(payload))

  return(
    <ul className={style['ticket-type']}>
      {
        filter.map((item)=>{
          return(
            <li key={item.cost}>
              <label>
                <input defaultChecked={item.cost === 'cheapest'} type='radio' name='ticket-type' onChange={()=>setFilter({cost: item.cost})}/>
                <span>{item.label}</span> 
              </label>
            </li>
          )
        })
      }
    </ul>
  )
}

export default TicketType