import { useSelector, useDispatch } from 'react-redux'
import { useEffect} from 'react'

import Checkbox from '../checkbox/Checkbox'
import {setFilter, setTargetFilter} from '../../store/filtersSlice'

import style from './FlightSettings.module.scss'


const FlightSettings =()=>{
  const filters = useSelector(state => state.filters.transferFilter)
  const dispatch = useDispatch()
  const setAllFilters = () => dispatch(setFilter(!filters.all))
  const setFilterCustom = (payload) => dispatch(setTargetFilter(payload))


  useEffect(()=>{
    let numberTest = 0
    for(let i in filters){
      if(i !== 'all' && !filters[i]){
        setFilterCustom({all: false})
      }
      if (i !== 'all' && filters[i]) {
        numberTest++
        if(numberTest === Object.entries(filters).length - 1) {
          setFilterCustom({all: true})
        }
      }
    }
  })

  return(
    <div className={style['flight-settings']}>
      <span className={style['flight-settings__heading']}>Количество пересадок</span>
      <form className={style['flight-settings__form']}>
        <Checkbox isChecked={filters.all} label='Все' onChange={setAllFilters}/>
        <Checkbox isChecked={filters.withoutTransfer} onChange={()=> setFilterCustom({withoutTransfer :!filters.withoutTransfer })} label='Без пересадок'/>
        <Checkbox isChecked={filters.oneTransfer} onChange={()=> setFilterCustom({oneTransfer :!filters.oneTransfer })} label='1 пересадка'/>
        <Checkbox isChecked={filters.twoTransfer} onChange={()=> setFilterCustom({twoTransfer :!filters.twoTransfer })} label='2 пересадки'/>
        <Checkbox isChecked={filters.threeTransfer} onChange={()=> setFilterCustom({threeTransfer :!filters.threeTransfer })} label='3 пересадки'/>
      </form>   
    </div>
  )
}

export default FlightSettings