import React, {useEffect, useState} from 'react';
import {animations, colors} from "../../assets/js/utils/cat";
import styled from 'styled-components';


const Ear = styled.div`
  background: #${props => props.color};
  border-radius: 0 90% 0 90%;
  height: 100px;
  transition: all .3s ease-in-out;
  width: 100px;
  position: absolute;
  transform: rotate(45deg);
`;
const CatHead = styled.div`
  background: #${props => props.color};
  width: 180px;
  height: 160px;
  border-radius: 55% 55% 60% 60%;
  position: relative;
  z-index: 18;
  transition: all .3s ease-in-out;
`;
const Eye = styled.div`
  position: absolute;
  left: 35px;
  width: 30px;
  height: 40px;
  background-color: #ffe6cc;
  border-top: 4px solid #4d4d4d;
  border-bottom: 2px solid #4d4d4d;
  border-left: 2px solid #4d4d4d;
  border-right: 2px solid #4d4d4d;
  border-radius: 60% 0%;
  transform: rotate(90deg);
  z-index: 2;
  overflow: hidden;
`;

const Iris = styled.div`
  position: absolute;
  top: calc(50% - 16px);
  left: calc(50% - 15px);
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  background: #${props => props.color};
  border-radius: 50%;
  box-shadow: inset 0 0 30px rgb(199 199 199 / 66%);
  z-index: 3;
`;

const Chest = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -50px;
  width: 200px;
  height: 200px;
  background: #${props => props.color};
  transition: all .3s ease-in-out;
  border: 5px solid transparent;
  border-radius: 50% 50% 40% 40%;
  z-index: 3;
`;

const Paw = styled.div`
  position: absolute;
  top: -20px;
  width: 42px;
  height: 167px;
  clip-path: ${props => props.left ? "path('M 0 0 C0,0 0,55 55,75 L 55 200 L0,200 z')" : "path('M0 70 C0,70 55,70 55,-120 L 55 200 L0,200 z')"};
  background: #${props => props.color};
  border: none;
  border-bottom: 5px solid transparent;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  z-index: 5;
  transition: all .3s ease-in-out;
`;

const PawRInner = styled.div`
  content: '';
  position: absolute;
  top: 104px;
  left: 146px;
  width: 42px;
  height: 42px;
  background: #${props => props.color};
  border-radius: 45%;
  border: 5px solid transparent;
  z-index: 2;
`;

const PawLInner = styled.div`
  content: '';
  position: absolute;
  left: -11px;
  background: #${props => props.color};
  border-radius: 45%;
  border: 5px solid transparent;
  z-index: 2;
  top: 106px;
  width: 42px;
  height: 42px
`;

const InnerChest = styled.div`
  content: '';
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 126px;
  height: 90px;
  border-radius: 40% 40% 40% 40%;
  background: #${props => props.color};
  transition: all .3s ease-in-out;
  opacity: .7;
  z-index: 4;
`;

const Tail = styled.div`
  position: absolute;
  top: 20px;
  left: 102px;
  width: 151px;
  height: 23px;
  background: #${props => props.color};
  border: 5px solid transparent;
  border-radius: 47%;
  z-index: 1;
  transform: rotate(-45deg);
  transition: all .3s ease-in-out;
`;

const MouthContour = styled.div`
  position: absolute;
  top: 61%;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 45%;
  background: #${props => props.color};
  border-radius: 55% 55% 60% 60%;
  opacity: .7;
`;

const Dec1 = styled.div`
  box-shadow: 0px 0px 6px 2px #${props => props.color};
  height: 20px;
  background: rgba(0, 0, 0, 0.53);
  position: absolute;
  left: 10px;
  //filter: brightness(90%);
  transform: rotate(-55deg);
  bottom: 15px;

  &:after {
    content: '';
    background: rgba(0, 0, 0, 0.53);
    position: absolute;
    //filter: brightness(90%);
    height: 60%;
    width: 100%;
    box-shadow: 0px 0px 6px 2px #${props => props.color};
    transform: rotate(45deg);
    left: 3px;
    top: 8px;
  }
`;

const Dec2 = styled.div`
  box-shadow: 0px 0px 6px 2px #${props => props.color};
  height: 40px;
  background: rgba(0, 0, 0, 0.53);
  position: absolute;
  left: 50%;
  top: 15px;
  //filter: brightness(60%);
  transform: translateX(-50%);
  bottom: 15px;

  &:before {
    content: '';
    box-shadow: 0px 0px 6px 2px #${props => props.color};
    height: 100%;
    background: rgba(0, 0, 0, 0.53);
    position: absolute;
    left: -15px;
    //filter: brightness(70%);
    transform: translateX(-50%) rotate(-10deg);
    bottom: 15px;
  }

  &:after {
    content: '';
    box-shadow: 0px 0px 6px 2px #${props => props.color};
    height: 100%;
    background: rgba(0, 0, 0, 0.53);
    position: absolute;
    left: 15px;
    //filter: brightness(70%);
    transform: translateX(-50%) rotate(10deg);
    bottom: 15px;
  }
`;

const Dec3 = styled.div`
  box-shadow: 0px 0px 6px 2px #${props => props.color};
  height: 20px;
  background: rgba(0, 0, 0, 0.53);
  position: absolute;
  right: 10px;
  //filter: brightness(90%);
  transform: rotate(55deg);
  bottom: 15px;

  &:after {
    content: '';
    background: rgba(0, 0, 0, 0.53);
    position: absolute;
    //filter: brightness(90%);
    height: 60%;
    width: 100%;
    box-shadow: 0px 0px 6px 2px #${props => props.color};
    transform: rotate(-45deg);
    right: 3px;
    top: 8px;
  }
`;

function Cat(props) {
    const [headColor, setHeadColor] = useState("");
    const [mouthColor, setMouthColor] = useState("");
    const [eyesColor, setEyesColor] = useState("");
    const [earColor, setEarColor] = useState("");
    const [decColor, setDecColor] = useState("");
    const [animation, setAnimation] = useState("");
    useEffect(() => {
        setHeadColor(colors[`${props.dna[0]}${props.dna[1]}`])
        setMouthColor(colors[`${props.dna[3]}${props.dna[4]}`])
        setEyesColor(colors[`${props.dna[6]}${props.dna[7]}`])
        setEarColor(colors[`${props.dna[9]}${props.dna[10]}`])
        setDecColor(colors[`${props.dna[12]}${props.dna[13]}`])
        setAnimation(animations[`${props?.dna[15]}`]?.value)
        /*      setEyesShape(defaultDNA["eyesShape"])
          setDecorationPattern(defaultDNA["decorationPattern"])
          setDecorationMidcolor(defaultDNA["decorationMidcolor"])
          setDecorationSidescolor(defaultDNA["decorationSidescolor"])
          setAnimation(defaultDNA["animation"])
          setLastNum(defaultDNA["lastNum"])*/
    }, [props]);
    return (
        <div className={`cat ${animation}`}>
            <div className="mainHead">
                <div className="ears">
                    {/*<div className="ear left-ear"></div>*/}
                    <Ear className="ear left-ear" color={earColor} id="lefty"/>
                    <Ear className="ear right-ear" color={earColor} id="righty"/>
                    {/*<div className="ear right-ear"></div>*/}
                </div>
                <CatHead color={headColor} id="chead">
                    <div className="head__container">
                        <div className="shade"></div>
                        <div className="decs">
                            <Dec1 color={decColor}/>
                            <Dec2 color={decColor}/>
                            <Dec3 color={decColor}/>
                        </div>
                        <div className="eyes">
                            <Eye className="left-eye">
                                <Iris color={eyesColor} className="iris"/>
                                <div className="reflection"></div>
                            </Eye>

                            <Eye className="right-eye" id="rEye">
                                <Iris color={eyesColor} className="iris"/>
                                <div className="reflection"></div>
                            </Eye>
                            {/*<div className="left-eye eye">
                        </div>*/}
                            {/*
                        <div className="right-eye eye">
                            <div className="iris"></div>
                            <div className="reflection"></div>
                        </div>*/}
                        </div>
                        <div className="nose"></div>
                        <MouthContour color={mouthColor}/>
                        <div className="cat__mouth-contour"></div>
                        <div className="cat__mouth-left"></div>
                        <div className="cat__mouth-right"></div>
                    </div>
                    <div className="cat__whiskers-left"></div>
                    <div className="cat__whiskers-right"></div>
                </CatHead>
            </div>
            <div className="cat__body">
                <Chest className="bodyBG" color={headColor}/>
                <InnerChest className="cat__chest_inner" color={mouthColor}/>
                {/*<div className="cat__chest_inner" style={{background: "rgb(255, 243, 224)"}}></div>*/}


                {/*<div className="cat__paw-left" style={{background: "rgb(207 166 127)"}}></div>*/}
                <Paw color={earColor} left={true} className="cat__paw-left"/>
                <PawLInner className="paw__inner_left" color={earColor}/>


                {/*<div className="cat__paw-right" style={{background: "rgb(207 166 127)"}}></div>*/}
                <Paw color={earColor} className="cat__paw-right"/>
                <PawRInner className="paw__inner_right" color={earColor}/>


                <Tail className="cat__tail" color={earColor}/>
                {/*<div id="tail" className="cat__tail" style={{background: "rgb(205 181 158)"}}></div>*/}
            </div>
            <div className="cat__feet"></div>
        </div>
    );
}

export default Cat