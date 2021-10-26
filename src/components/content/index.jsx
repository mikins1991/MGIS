import React from 'react'

const Content = ({activePage, onDeleteMessage}) => {

  console.log(activePage)
  return (
    <div style={{padding: '10px'}}>
      {!!activePage.id &&(<>
      <p>{activePage?.content}</p>
      <button onClick={()=>{
        onDeleteMessage(activePage?.id)
      }}>Delete message</button>
      </>
    )}
    </div>
  )
}

export default Content