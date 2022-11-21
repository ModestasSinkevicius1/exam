import noImg from "../../assets/img/no-image.svg";
import Options from "./Options";

function ListItem({fundItem}){
    return (
        <tr className="list-item">
            <td> {fundItem.image ? <img src={fundItem.image} alt='fund'></img> : <img src={noImg} alt='fund'></img>}</td>
            <td className="list-item-text">{fundItem.idea}</td>
            <td>{fundItem.goal} &euro;</td>
            <td>{fundItem.raised} &euro;</td>
            <td>{fundItem.status ? 'Confirmed' : 'Not confirmed'}</td>
            <td>
                <Options fundItem={fundItem} />
            </td>
        </tr>
    )
}

export default ListItem;