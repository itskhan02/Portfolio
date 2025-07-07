import React from 'react'
import Card from '../shared/Card';
import Data from '../File/Lists';

const SkillList = () => {
    console.log(Data)
  return (
    <>
      {
      Data?.map((lists)=>{

        return (
          <div key={lists.name}>
            <Card x={lists}/> 
          </div>
          
        )
      
      })
    } 

    </>
  )
}

export default SkillList;


