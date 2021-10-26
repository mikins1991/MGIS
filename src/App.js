import { useEffect, useState } from "react";
import Content from "./components/content";
import LeftPanel from "./components/leftPanel";
import { data } from "./data";
import "./styles.css";

export default function App() {
 
  const [contentData, setContentData] = useState([])
  const [activePage, setActivePage] = useState({})
  const [activeId, setActiveId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isNoMessage, setIsNoMessage] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [noReadedMessageCount, setnoReadedMessageCount] = useState(0)

  useEffect(()=>{
    setIsLoading(true)
    new Promise((res, rej)=>{
      setTimeout(()=>{
        res(data)
      },1000)
    }).then(
      data=>data.map(item=>({...item, isNew: true}))
    ).then((data)=> {
      setContentData(data)
      // setActivePage(data[0])
      // setActiveId(data[0]?.id)
      setMessageCount(data.length)
      setnoReadedMessageCount(data.length)
      setIsLoading(false)
    })

  },[])

  const handlerItem = (id) => {
    setActiveId(id)
    const changeOpenedItem = contentData.map(item => {
      if(item.id === id){
        return {...item, isNew: false}
      }
      return item
    })
    setnoReadedMessageCount(changeOpenedItem.filter(item=>item.isNew).length)
    setContentData(changeOpenedItem)
    console.log('changeOpenedItem', changeOpenedItem)
    setActivePage(changeOpenedItem.find(item => item.id === id))
  }

  const onDeleteMessage = (id) => {
    const newContent = contentData.filter(item => item.id !== id)
    setContentData(newContent)
    if (!newContent.length) setIsNoMessage(true)
    
    setActivePage(newContent[0])
    setActiveId(newContent[0]?.id)
  }

  return (
    <div className="App">
        {isNoMessage ? (<p> No new messge</p>)
        :
        isLoading ? 
          (<p>Loaing...</p>):
          (<>
          <LeftPanel 
            contentData={contentData}
            activeId={activeId}
            handlerItem={handlerItem}
            messageCount={messageCount}
            noReadedMessageCount={noReadedMessageCount}
          />
          <Content 
            contentData={contentData}
            activePage={activePage}
            onDeleteMessage={onDeleteMessage} 
          />
          </>
          )}
    </div>
  );
}
