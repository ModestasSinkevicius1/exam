import Delete from "../Delete";
import ShowNav from "../ShowNav";
import List from "./List";
//import Pagination from "../Pagination.jsx";

function Fund(){

    return(
        <>
            <ShowNav />
            <List />
            <Delete />
            {/* <Pagination /> */}
        </>
    )
}

export default Fund;