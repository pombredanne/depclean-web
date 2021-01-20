
import React from 'react';
import { useAppState } from "./AppStateContext"
import { getGeneralReport, getDeletedDirectReport, getAllDeletedReport, filterEmpty } from 'src/utils/message';
import { DataGroup } from 'src/DataGroup';
import { ArrowRightOutlined } from '@ant-design/icons';

export const Message = () => {
    //get the main state
    const { state } = useAppState();
    //Get all the nodes
    const { messageState, filteredProject, project } = state;

    //GET THE INFORMATIN
    const currentProject = messageState === "ORIGINAL" ? project : filteredProject;
    const generalReport: any = getGeneralReport(currentProject);
    const bloatMessage: any = messageState === "DEBLOAT_DIRECT" ?
        getDeletedDirectReport(filteredProject) :
        messageState === "DEBLOAT_ALL" ?
            getAllDeletedReport(filteredProject) :
            <></>;

    const message = messageState === "ORIGINAL" ? <></> :
        <>
            <div className="flex flex-center text-message">
                <div>If you<br></br>delete<ArrowRightOutlined /></div>
            </div>
            <DataGroup
                tittle={bloatMessage.title}
                dataInfo={[bloatMessage.deleted.direct, bloatMessage.deleted.transitive]}
                theme="bloated" />
            <DataGroup
                tittle="Bloted size"
                dataInfo={[bloatMessage.deleted.size.totalSize]}
                theme="bloated" />
            <div className="flex flex-center text-message">
                <div>Now this<br></br>project has<ArrowRightOutlined /></div>
            </div>
        </>


    //REFACTOR 
    //CREATE A MESSAGE   
    //message should contain how much you delete

    const dependencies = [generalReport.dependencies.direct, generalReport.dependencies.inherited, generalReport.dependencies.transitive]
        .filter(filterEmpty);
    const bloated = [generalReport.bloated.direct, generalReport.bloated.inherited, generalReport.bloated.transitive]
        .filter(filterEmpty);
    const totalSize = [generalReport.size.totalSize];

    return (
        <div className="flex flex-center flex-wrap margin-buttom-40 ">
            {message}
            <DataGroup
                tittle={generalReport.dependencies.title}
                dataInfo={dependencies}
                theme="dependencies"
            />
            <DataGroup
                tittle={generalReport.bloated.title}
                dataInfo={bloated}
                theme="bloated"
            />
            <DataGroup
                tittle={generalReport.size.title}
                dataInfo={totalSize}
                theme="dependencies"
            />
        </div>
    )
}



