import TicketCard from '../ticket-card/TicketCard'

import style from './TicketList.module.scss'
const TicketsList = ({tickets})=>{

  return(
    <ul className={style.list}>
      {tickets.map((el, index)=>{
        return(<TicketCard key={index} {...el}/>) 
      })}
    </ul>
  )
}

export default TicketsList