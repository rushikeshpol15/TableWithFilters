import "../Styles/List.css";
import { IoFilterOutline } from "react-icons/io5";
import Table from "./Table";
import { useEffect, useState } from "react";

function List() {

    let tableData = [
        {
            type: "Document",
            key: "DA-2",
            summary: "Final check for documents",
            status: "TO DO",
            assignee: "Fran Perez",
            dueDate: "2021-07-24",
            priority: "Highest"
        },
        {
            type: "Document",
            key: "DA-8",
            summary: "Legalise document with Justice of Peace",
            status: "TO DO",
            assignee: "Eva Lien",
            dueDate: "2021-07-24",
            priority: "Medium"
        },
        {
            type: "Document",
            key: "DA-7",
            summary: "HR leave policy",
            status: "DRAFT",
            assignee: "Fran Perez",
            dueDate: "2021-05-17",
            priority: "Low"
        },
        {
            type: "Document",
            key: "DA-12",
            summary: "Review contract - Client A",
            status: "IN REVIEW",
            assignee: "Samuel Hall",
            dueDate: "2021-07-23",
            priority: "Low"
        },
        {
            type: "Document",
            key: "DA-14",
            summary: "Measurements of accountability",
            status: "IN REVIEW",
            assignee: "Samuel Hall",
            dueDate: "2021-03-15",
            priority: "Low"
        },
        {
            type: "Document",
            key: "DA-9",
            summary: "Monitor policy documents and reports",
            status: "SECOND REVIEW",
            assignee: "Eva Lien",
            dueDate: "2021-07-28",
            priority: "Low"
        },
        {
            type: "Document",
            key: "DA-9",
            summary: "Partnership contract with ACME company",
            status: "SECOND REVIEW",
            assignee: "Eva Lien",
            dueDate: "2021-06-25",
            priority: "Low"
        },
        {
            type: "Document",
            key: "DA-10",
            summary: "Public hearing insights writeup",
            status: "APPROVED",
            assignee: "Eva Lien",
            dueDate: "2021-03-03",
            priority: "Medium"
        },
        {
            type: "Document",
            key: "DA-11",
            summary: "Existing policy research analysis",
            status: "APPROVED",
            assignee: "Fran Perez",
            dueDate: "2021-10-03",
            priority: "Medium"
        },
        {
            type: "Document",
            key: "DA-15",
            summary: "International policy comparison research analysis",
            status: "DONE",
            assignee: "Eva Lien",
            dueDate: "2021-09-13",
            priority: "Low"
        },
        {
            type: "Document",
            key: "DA-16",
            summary: "SWOT analysis on existing policy report",
            status: "DONE",
            assignee: "Samuel Hall",
            dueDate: "2021-09-13",
            priority: "Low"
        },
        {
            type: "Document",
            key: "DA-17",
            summary: "Develop implementation of policy and practice",
            status: "DONE",
            assignee: "Eva Lien",
            dueDate: "2021-06-01",
            priority: "Low"
        }
    ];

    let columnsForFilter = ["key", "summary", "status", "assignee", "dueDate", "priority"];

    let priority = {
        'Low': 1,
        'Medium': 2,
        'Highest': 3
    }

    let [tableDataState, setTableDataState] = useState(tableData);
    let [temptableDataState, settempTableDataState] = useState(tableData);
    let [columnName, setColumnname] = useState('');
    let [searchTask, setsearchTask] = useState('');

    //handeling search task operation in useEffect if empty and value gets entered
    useEffect(() => {
        if (searchTask === '') {
            settempTableDataState([...tableDataState])
            return;
        }

        setTableDataToOnlySearchedValues();
    }, [searchTask])

    //To Open The Modal
    function handleFilterClickModal() {
        document.getElementById('forModal').click();
    }

    //To set the column name selected for filter
    function handleChangeOfFilterName(e) {
        setColumnname(e.target.value);
    }

    //to set the searched value
    function handleSearch(e) {
        setsearchTask(e.target.value);
    }

    //filter logic
    function filterDataByColumns() {
        if (columnName === '') {
            document.getElementById('forModalClose');
            return;
        }

        let sortedTableData = [];
        //In this key column the string comparison between obj is lexiographically so used this logic that works fine for numeric values
        if (columnName === 'key') {
            sortedTableData = temptableDataState.sort((a, b) => {
                let c = a[columnName].toLowerCase().split('-').pop();
                let d = b[columnName].toLowerCase().split('-').pop();

                let value1 = parseInt(c, 10);
                let value2 = parseInt(d, 10);

                return value1 - value2;
            })
        }
        //to sort priority low medium high
        else if (columnName === 'priority') {
            sortedTableData = temptableDataState.sort((a, b) => {
                let c = priority[a[columnName]];
                let d = priority[b[columnName]];

                return c - d;
            })
        }
        else {
            sortedTableData = temptableDataState.sort((a, b) => {
                let c = a[columnName].toLowerCase();
                let d = b[columnName].toLowerCase();

                if (c < d) {
                    return -1;
                }
                if (c > d) {
                    return 1;
                }
                return 0;
            })
        }



        settempTableDataState([...sortedTableData]);
        setColumnname('');
        document.getElementById('forModalClose').click();

    }

    //To get the table data as user searched the task
    function setTableDataToOnlySearchedValues() {
        let a = searchTask.toLowerCase();
        let filteredData = tableData.filter(element => {
            let b = element.summary.toLowerCase();

            return b.includes(a);
        })

        settempTableDataState([...filteredData]);
    }

    return (
        <>
            <section className="list-section">

                <div className="list-filter-container">

                    <div className="list-heading">List</div>

                    <div className="filter-container" onClick={handleFilterClickModal}>
                        {/* <div> */}
                        <IoFilterOutline />
                        {/* </div> */}
                        <div className="filter-text">
                            Filters
                        </div>


                    </div>
                </div>

                <div className="text-end mt-3">
                    <input type="text" className="search" placeholder="Search By Task Summary" onChange={handleSearch} value={searchTask} />
                </div>
                <Table tableData={temptableDataState} />

            </section>


            <button type="button" id="forModal" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Filters</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>Sort By Columns :</div>
                            {columnsForFilter.map((element) => {
                                return (
                                    <div className="mt-2" key={element}>
                                        <input type="radio" id={element} name="column" onChange={handleChangeOfFilterName} value={element} />
                                        <label htmlFor={element} className="ms-3 mb-2 text-secondary">{element}</label>
                                    </div>
                                    //    <button className="filter-btns" onClick={()=>{filterDataByColumns(element)}}>{element}</button>
                                )
                            })}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="forModalClose" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={filterDataByColumns}>sort</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default List;