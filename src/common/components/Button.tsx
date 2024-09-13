import React from 'react'
import s from './Button.module.css'

type ButtonProps = {
  title: string
  callBack: (data?: any) => void
  className?: string
}
export const ButtonCustom = ({ callBack, title, className }: ButtonProps) => {
  const onClickHandler = () => callBack()
  const buttonClass = className !== undefined ? s.activeButton : ''
  return (
    <div>
      <button className={buttonClass} onClick={onClickHandler}>
        {title}
      </button>
    </div>
  )
}
