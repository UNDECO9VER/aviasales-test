import style from './Checkbox.module.scss'


const Checkbox =({label, isChecked, onChange})=>{
  return(
    <label className={style['checkbox']}>
      <input checked={isChecked} type='checkbox' onChange={()=> onChange(!isChecked)}/>
      <span className={style['checkbox__custom']}></span>
      {label}
    </label>
  )
}

export default Checkbox