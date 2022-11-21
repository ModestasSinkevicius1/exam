import { useContext } from "react";
import DataContext from "../../Context/DataContext";
import ListItem from "./ListItem"



function List(){

    const { funds } = useContext(DataContext);

    return(
        <div className="List">
            <table>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Text</th>
                    <th>Goal</th>
                    <th>Raised</th>
                    <th>Status</th>
                    <th>Options</th>
                </tr>
                {funds?.map(f => <ListItem key={f.id} fundItem={f} />)}
                </thead>
            </table>
        </div>
    )
}

export default List;