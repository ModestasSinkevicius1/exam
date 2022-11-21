import { useEffect, useState, useContext } from "react";
import DataContext from "../../Context/DataContext.jsx";
import ListItem from "./ListItem";
import axios from "axios";
import { authConfig } from '../../Functions/auth.js';

function List(){

    const { setDeleteOrder, setUpdateOrder, stats, status, currentPage, refresh } = useContext(DataContext);
    
    const [orders, setOrders] = useState(null);

    useEffect(()=>{
        if(status === 1){
            return;
        }
        axios.get(`http://localhost:3007/orders/?page=${currentPage - 1}`, authConfig())
        .then(res => {
          setOrders(res.data);
        })
        .catch(_ => setOrders('error'));
    }, [refresh, status, currentPage]);

    if(!orders){
        return <div><h1>Please wait...</h1></div>
    }

    return(
        <div className="list myOrder-list">
            <div className="stats-container">
                <h2 className="list-title">Orders</h2>         
                <h2 className="list-title">Total spent: {stats ? stats[0].ordersSum : null}&euro;</h2>
            </div>
            {orders !== 'error' ?
            <div className="list-container">
                <table className="myOrder-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>SIZE</th>
                        <th className="table-comment">COMMENT</th>
                        <th>TYPE</th>
                        <th>COLOR</th>
                        <th>PRICE</th>
                        <th>STATUS</th>
                        {status === 3 ?
                            <th>OPTIONS</th>
                            :
                            null
                        }
                    </tr>      
                {orders?.map(o => <ListItem key={o.id} item={o} 
                                                    setDeleteOrder={setDeleteOrder} 
                                                    setUpdateOrder={setUpdateOrder} />)}
                    </thead>
                </table>
            </div>
            : <h3>Failed to get orders</h3>}                      
        </div>
    );
}

export default List;