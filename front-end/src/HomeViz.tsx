import React, { useState, useEffect } from 'react';
// import { LateralMenu } from './LateralMenu';
import { MainInfo } from './MainInfo';
import { Row, Button } from 'antd';
import { HorizontalPartitionTree } from './HorizontalPartitionTree';
import { useAppState } from "./AppStateContext";
import { v4 as uuidv4 } from 'uuid';
import { DependencyList } from './DependencyList';
import { dimension } from 'src/interfaces/interfaces';
import { FilterOutlined } from '@ant-design/icons'
import { Legend } from 'src/Legend';

export const HomeViz = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    //get the main state
    const { state, dispatch } = useAppState();
    //Get all the nodes
    const { filtered, hideMenu } = state;

    //modify size on resize
    useEffect(() => {
        function handleResize() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', handleResize)
    })


    //DATA FOR TREE
    let dimensions: dimension = {
        width: size.width,
        height: size.height,
        marginTop: 90,
        marginRight: 50,
        marginBottom: 50,
        marginLeft: 50,
        boundedHeight: size.height - 250,
        boundedWidth: size.width - (size.width * 0.0416666667) - (size.width * 0.0833333333),
    }

    const handleClick = () => {
        dispatch({ type: "HIDE_MENU", payload: !hideMenu });
    }

    return (
        <div>
            <Row id="MainInfo" className={"margin-buttom-20"} key={uuidv4()} >
                <MainInfo />
            </Row>
            <Row className="vizContainer" id="DependencyTree" key={uuidv4()}>
                <Button
                    className="filterButton"
                    type={"dashed"}
                    onClick={() => handleClick()}>
                    <FilterOutlined rotate={hideMenu ? 90 : 0} />
                    Filter
                </Button>

                <Legend />

                <HorizontalPartitionTree
                    key={uuidv4()}
                    data={filtered}
                    dimensions={dimensions}
                />
                <DependencyList
                    height={dimensions.boundedHeight - 60}
                />

            </Row>
        </div>
    )
}