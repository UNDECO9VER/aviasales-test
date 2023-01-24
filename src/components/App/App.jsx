import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { setTickets} from '../../store/ticketsSlice'
import FlightSettings from '../flight-settings/FlightSettings'
import TicketType from '../ticket-type/TicketType'
import AviasalesService from '../../services/aviasales-service'
import TicketsList from '../tickets-list/TicketList'
import logo from '../../img/AviaSalesLogo.png'

import style from './App.module.scss'

const aviasalesService = new AviasalesService()

const App =()=>{

  const tickets = useSelector(state => state.tickets.tickets)
  const filters = useSelector(state => state.filters.transferFilter)
  const sortParam = useSelector(state => state.filters.costFilter)
  const [displayedTickets, setDisplayedTickets] = useState(5)
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  const filterTickets =()=>{
    const res = tickets.filter((el)=>{
      for(let i of el.segments){
        if(i.stops.length === 0 && filters.withoutTransfer){
          return el
        }
        if(i.stops.length === 1 && filters.oneTransfer){
          return el
        }
        if(i.stops.length === 2 && filters.twoTransfer){
          return el
        }
        if(i.stops.length === 3 && filters.threeTransfer){
          return el
        }
        // return el
      }
    })

    return res
  }

  const sortTickets = (mass)=>{
    if(sortParam === 'cheapest'){
      return mass.sort((a,b)=>{
        return a.price - b.price
      })
    }
    if(sortParam === 'fastest'){
      return mass.sort((a,b)=>{
        return (a.segments[0].duration + a.segments[1].duration) - (b.segments[0].duration + b.segments[1].duration)
      })
    }
    if(sortParam === 'optimal'){
      return []
    }
  }

  const setTicketsLocal = (payload) => dispatch(setTickets(payload))

  useEffect(()=>{
    aviasalesService.getSearchId()
      .then(()=>{
        setResources() 
      })
  },[])

  const setResources = async ()=>{
    try{
      const res = await aviasalesService.getTickets()
      setTicketsLocal(res.tickets)
      if(!res.stop){
        setResources()
      }else{
        setLoaded(true) 
      }
    }catch(err){
      if(err.message == 500){
        setResources()
      }else{
        throw err
      }
    }
  }

  return(
    <div className={style.app}>
      <div className={style.app__logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={style.app__main}>
        <FlightSettings/> 
        <section className={style.app__content}>
          <TicketType/>
          {!loaded && <div className={style.app__loading}></div>}
          {(filterTickets().length > 0) && <TicketsList tickets={sortTickets(filterTickets()).slice(0,displayedTickets)}/>}
          {(sortTickets(filterTickets()).length > 0) ? 
            <button onClick={()=> setDisplayedTickets((state)=> state + 5)}> показать ещё 5 билетов! </button>
            : <span style={{textAlign: 'center'}}>{'Упс... Ничего не найденно :( Попробуйте изменить фильтры'}</span>}
        </section>
      </div>
    </div>
  )
}

export default App