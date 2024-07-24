import { faFile } from "@fortawesome/free-regular-svg-icons";
import "../Styles/List.css";
import { CgHashtag } from "react-icons/cg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAt, FaChevronDown, FaFile } from "react-icons/fa";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaTag } from "react-icons/fa6";
import { FaCircleChevronUp } from "react-icons/fa6";
import USERIMG from './user.jpg';
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { TfiLineDouble } from "react-icons/tfi";

function Table({ tableData }) {


    function getDynamicClassName(status) {
        if (status === "TO DO" || status === "DRAFT") {
            return "draft";
        } else if (["IN REVIEW", "SECOND REVIEW", "APPROVED"].includes(status)) {
            return "review";
        } else if (status === "DONE") {
            return "done";
        }
    }

    function getDynamicPriorityIcons(priority) {
        if (priority === "Highest") {
            return (
                <div className="priority-icons">
                    <FontAwesomeIcon icon={faAnglesUp} style={{ color: "#c11515", fontWeight: 'bold', }} />
                </div>
            );
        } else if (priority === "Low") {
            return (
                <div className="priority-icons">
                    <FaChevronDown style={{ color: "#168500", }} />
                </div>
            );
        } else if (priority === "Medium") {
            return (
                <div className="priority-icons">
                    <TfiLineDouble style={{ color: "rgb(255, 115, 0)", fontWeight: 'bold', fontSize: '15px', }} />
                </div>
            );
        }
    }
    return (
        <>
            <div className="table-container">
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>
                                Type
                            </th>
                            <th>
                                <div className="table-icon-container">
                                    <CgHashtag className="table-icon" />
                                    Key
                                </div>
                            </th>
                            <th>
                                <div className="table-icon-container">
                                    <HiMiniBars3BottomLeft className="table-icon" />
                                    Summary
                                </div>

                            </th>
                            <th>
                                <div className="table-icon-container">
                                    <FaArrowAltCircleRight className="table-icon" style={{ background: 'white' }} />
                                    Status
                                </div>

                            </th>
                            <th>
                                <div className="table-icon-container">
                                    <span className="table-icon" style={{ marginBottom: '0.2em' }}>@</span>
                                    Assignee
                                </div>

                            </th>
                            <th>
                                <div className="table-icon-container">
                                    <FaTag className="table-icon" />
                                    Due Date
                                </div>

                            </th>
                            <th style={{ borderRight: 'none' }}>
                                <div className="table-icon-container">
                                    <FaCircleChevronUp className="table-icon" />
                                    Priority
                                </div>

                            </th>
                            <th >
                                <span className="plus">+</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td className="type-column-text">
                                    <div className="file-icon-box">
                                        <FaFile style={{ color: 'white', width: '10px', height: '13px' }} />
                                    </div>
                                </td>
                                <td className="key-column-text">{row.key}</td>
                                <td className="summary-column-text">{row.summary}</td>
                                <td className="status-column-text">
                                    <div className={getDynamicClassName(row.status)}>{row.status}</div>
                                </td>
                                <td className="assignee-column-text">
                                    <div className="assignee-container">
                                        <div className="assignee-img-container">
                                            <img src={USERIMG} className="user-img" />
                                        </div>
                                        <div>{row.assignee}</div>
                                    </div>

                                </td>
                                <td >
                                    <div className="dueDate-column-text">{row.dueDate}</div>
                                </td>
                                <td className="priority-column-text" style={{ borderRight: 'none' }}>
                                    <div className="priority-box">
                                        {getDynamicPriorityIcons(row.priority)}
                                        <div style={{ marginRight: 'auto' }}>
                                            {row.priority}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="add-item">
                    <span style={{ fontSize: '1.1em' }}>+</span> &nbsp;
                    Add item
                </button>
            </div>
        </>
    )
}



export default React.memo(Table);