import { useContext } from "react";
import DataContext from "../Context/DataContext.jsx";
import close from '../assets/img/x.svg';

function Delete(){

    const { setModalDelete, modalDelete, setDeleteFund} = useContext(DataContext);

    if(modalDelete === null){
        return null;
    }

    const deleteRecord = () =>{
        setDeleteFund(modalDelete);
        setModalDelete(null);
    }

    return(
        <div className="delete">
            <div className="delete-container">
                <img src={close} alt='Exit' className="btn-delete" onClick={() => setModalDelete(null)}></img>
                <div className="info-container">
                    <h3 className="info-title">Are you sure want to delete?</h3>
                </div>
                <div className="btn-container">
                    <button className="btn" onClick={() => setModalDelete(null)}>No</button>
                    <button className="btn" onClick={deleteRecord}>Yes</button>
                </div>
            </div>
        </div>
    );
}

export default Delete;