import React from 'react'
import style from './leftPanel.module.css'

const LeftPanel = ({contentData,messageCount, noReadedMessageCount, activeId, handlerItem}) => {
  return (
    <div className={style.panel}>
      Message: {noReadedMessageCount}/{messageCount}
      {contentData.map((item)=>{
        console.log(typeof item.id,typeof activeId)
        return(
        <button 
          key={item.id}
          onClick={()=>handlerItem(item.id)}
          className={style.button}
          active={(item.id === Number(activeId)).toString()}
        >
          {item.subject}
        </button>
      )})}
    </div>
  )
}

export default LeftPanel