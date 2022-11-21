import { useState } from "react";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";

function Options({fundItem}){

    const { setUpdateFund, setModalDelete } = useContext(DataContext);
    const [status, setStatus] = useState(0);

    const changeStatus = () =>{
        setUpdateFund({
            id: fundItem.id,
            raised: fundItem.raised,
            status: status,
        })
        setStatus(0);
    }

    return (
        <div className="options">
            <select className="select-input" value={status} onChange={e => setStatus(e.target.value)}>
                <option value={0} >Not confirmed</option>
                <option value={1} >Confirmed</option>
            </select>
            <button className="btn" onClick={changeStatus}>Update</button>
            <button className="btn" onClick={() => setModalDelete(fundItem)}>Delete</button>
        </div>
    );
}

export default Options;