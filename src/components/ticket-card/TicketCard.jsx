import style from './TicketCard.module.scss'
const TicketCard =(ticket)=>{


  const flightTime =(date, duration)=> {
    const flightStart = new Date(date)
    const flightEnd = new Date(flightStart.getTime() + duration*60*1000)

    return `${flightStart.getHours()}:${flightStart.getMinutes()} - ${flightEnd.getHours()}:${flightEnd.getMinutes()}`
  }

  const minutesToHours =(duration)=>{
    return `${Math.floor(duration/60)}Ч ${duration % 60}М`
  }

  const toNormalRussian =(transfers)=>{
    switch(transfers){
    case 1: return 'ПЕРЕСАДКА'
    case 2:
    case 3:
      return 'ПЕРЕСАДКИ'
    }
  }

  return(
    <li className={style['ticket-card']}>
      <div className={style['ticket-card__head']}>
        <span className={style['ticket-card__price']}>{ticket.price} Р</span>
        <div  className={style['ticket-card__logo']}>
          <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt={ticket.carrier}/>
        </div>
      </div>
      {ticket.segments.map((segment,index)=>{
        return(
          <div className={style['ticket-card__wraper']} key={index}>
            <div className={style['ticket-card__item']}>
              <span className={style['ticket-card__description']}>{segment.origin} - {segment.destination}</span>
              <span className={style['ticket-card__text']}>{flightTime(segment.date, segment.duration)}</span>
            </div>
            <div className={style['ticket-card__item']}>
              <span className={style['ticket-card__description']}>В ПУТИ</span>
              <span className={style['ticket-card__text']}>{minutesToHours(segment.duration)}</span>
            </div>
            <div className={style['ticket-card__item']}>
              <span className={style['ticket-card__description']}>{!!segment.stops.length && segment.stops.length} {toNormalRussian(segment.stops.length)}</span>
              <span className={style['ticket-card__text']}>{segment.stops.join(',')}</span>
            </div>
          </div>
        )

      })}
    </li>
  )
}

export default TicketCard