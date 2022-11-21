import { useState, useContext } from "react";
import DataContext from "../../Context/DataContext.jsx";

function ListItem({ item, setDeleteOrder, setUpdateOrder }){

    const { status, setModalDelete } = useContext(DataContext);

    const [stage, setStage] = useState(item.status);
    
    const updateOrderStatus = () => {
        setUpdateOrder({
            id: item.id,
            status: stage,
        });
    }

    return(
        <tr>
            <td><div className="table-item">{item.id}.</div></td>
            <td className="myOrder-size"><div className="table-item">{item.size}</div></td>
            <td className="table-comment"><div className="table-item">{item.comment}</div></td>
            <td><div className="table-item">{item.type}</div></td>
            <td>
                <div className="color-container-second">
                    <div className="list-color-container myOrder-color-container">
                        <span>{item.color}</span>
                        <div className="list-color-display" style={{backgroundColor: item.color}}></div>
                    </div>
                </div>
            </td>     
            <td><div className="table-item">{item.price}&euro;</div></td>
            {status === 3 ?
            <td>
                <select className="input-select myOrder-status" value={stage} onChange={e => setStage(e.target.value)}>
                    <option value={'Awaiting'}>Awaiting</option>
                    <option value={'Confirmed'}>Confirmed</option>
                    <option value={'Working'}>Working</option>
                    <option value={'Packaging'}>Packaging</option>
                    <option value={'Sent'}>Sent</option>
                    <option value={'Completed'}>Completed</option>
                </select>
            </td> :
            <td>
                <span>{item.status}</span>
            </td>
            }
            {status === 3 ?
            <td>
                <div className="item-control">
                    <button className="btn btn-item" onClick={() => updateOrderStatus(item)}>Update</button>
                    <button className="btn btn-item" onClick={() => setModalDelete(({...item, target: 'order'}))}>Delete</button>
                </div>
            </td>  
            : null}
        </tr>
    );
}

export default ListItem;