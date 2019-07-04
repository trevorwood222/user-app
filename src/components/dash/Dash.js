import React, {useEffect, useState, useRef} from 'react';
import './Dash.scss';
import Draggable from "gsap/Draggable"; 

import useUserState from '../../store/user';

import {withRouter} from 'react-router-dom';

const Dash = (props) => {

  const [user,setUser] = useUserState();
  const rotationIncrements = 0.20;
  const regulatorSize = 10;

  const [userIcons,setUserIcons] = useState([
    "1","2","3","4","5","6","7","8"
  ])

  const [radius,setRadius] = useState(50)
  const [rotate,setRotation] = useState(0);
  const [direction,setDirection] = useState(1);
  const [spin,setSpin] = useState(true);
  const [regulator,setRegulator] = useState([]);
  const regulatorRef = useRef({});
  regulatorRef.current = regulator;
  const userSpinner = useRef(null)
  const draggableItem = Draggable;

  const handleLogOut = (e) => {
    e.preventDefault();
    setUser(null);
  }
  
  useEffect(() => {
    draggableItem.create(".user-spinner", {
      type: "rotation",
      onDragStart: function(){
        console.log("onDragStart",this);
      },
      onDrag: function(){
        console.log("onDrag",this.endRotation);
        setRotation(this.endRotation)
      },
      onDragEnd: function(){
        console.log("onDragEnd",this)

        if(this.getDirection() === "clockwise" && direction !== 1){
          setDirection(1);
        }else if(direction === 1){
          setDirection(-1);
        }
      },
    })
  },[direction])

  useEffect(() => {
    let timeout;
    userSpinner.current.style.transform = "rotate("+(rotate)+"deg)";
    if(spin){
      timeout = setTimeout(function(){
        setRotation(rotate+(rotationIncrements*direction))
      },10)
    }

    regulatorRef.current.push(Math.round(rotate * 100) / 100)
    if(regulatorRef.current.length > regulatorSize){
      regulatorRef.current.shift();
    }
    setRegulator(regulatorRef.current)

    return () => {
      if(timeout){
        clearTimeout(timeout)
      }
    }
  },[rotate,spin,direction])

  useEffect(() => {
    if(spin){
      const min = Math.min(...regulator)
      const max = Math.max(...regulator)
      const sum = max - min; 

      if(sum >= (rotationIncrements*regulatorSize)+1 ){
        //out of control, reset spin
        setSpin(false);
        setTimeout(function(){
          setSpin(true);
        },25)
      }
    }
  },[regulator,spin,rotate])

  const onMouseEnterHandle = () => {
    setSpin(false);
  }

  const onMouseLeaveHandle = () => {
    setSpin(true);
  }

  const userIconsList = (userIcons) => {
    const height = 50;
    const width = 50;
     
    let step = (2*Math.PI) / userIcons.length;
    let angle = (step*2)*-1;

    return (
      <ul className="user-spinner" ref={userSpinner} 
        onMouseEnter={onMouseEnterHandle} 
        onMouseLeave={onMouseLeaveHandle}>
        {
          userIcons.map((item,index) => {
            var top = Math.round(height + radius * Math.sin(angle) - height/10000);
            var left = Math.round(width + radius * Math.cos(angle) - width/10000);

            angle += step;

            return(
              <li className="in" key={index} style={{
                transform: "rotate("+(rotate*-1)+"deg)",
                top: top+"%",
                left: left+"%",
              }}>{item}</li>
            )
          })
        }
      </ul>
    )
  }

  const addUser = () => {
    const newIcons = [...userIcons,Math.round(Math.random()* 101)];
    setUserIcons(newIcons);
  }

  const removeUser = () => {
    const newIcons = [...userIcons]
    newIcons.pop();
    setUserIcons(newIcons);
  }

  const radiusHandler = (e) => {
    setRadius(e.target.value)
  }

  return (
    <div className="dash">
      <h1>Dash</h1>
      
      <div className="dash-users">
        <div className="dash-users-sub">
          {userIconsList(userIcons)}
        </div>
      </div>
      
      <div>
        <label>Radius</label>
        <input type="range" min="10" max="100" onChange={radiusHandler} value={radius}/>
      </div>
      <button type="button" onClick={addUser}>Add User</button>
      <button type="button" onClick={removeUser}>Remove User</button>

      <button type="button" onClick={handleLogOut}>Log Out</button>
      
    </div>
  );
};

export default withRouter(Dash);