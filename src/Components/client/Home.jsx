import ShowNav from "../ShowNav";
import noImg from "../../assets/img/no-image.svg";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";
import CreateRaiser from "./CreateRaiser";

function Home(){

    const { funds, raisers } = useContext(DataContext);

    return(
        <>
            <ShowNav />
            <h1>Fund people</h1>
            <div className="card-container">
                {funds?.map( f =>
                    f.status ? 
                    <div key={f.id} className="card-item" style={f.goal <= f.raised ? {backgroundColor: 'gold'} : null}>
                        <h3>Goal: {f.goal} &euro;</h3>
                        {
                            f.image ? <img className="card-img" src={f.image} alt='fund'></img> : 
                            <img className="card-img" src={noImg} alt='fund'></img>
                        }
                        <span>{f.idea}</span>
                        <h4>Raised: {f.raised} &euro;</h4>
                        <h4>Left to raise: {f.goal - f.raised > 0 ? f.goal - f.raised : 0} &euro;</h4>
                        <hr></hr>
                        <h3>Peoples funds:</h3>
                        {f.goal > f.raised ?
                        <CreateRaiser fundItem = {f} />
                        : <h3>Goal achieved!</h3>}
                        <hr></hr>
                        <div className="fund-people-field">
                            {raisers?.map(r => r.funds_id === f.id ?
                            <div key={r.id} className="fund-people-container">
                                <span className="fund-raiser-name">Donator: {r.name}</span>
                                <span className="fund-raiser-amount">Raised: {r.amount} &euro;</span>
                            </div>    
                            : null)}
                        </div>
                          
                    </div> : null
                )}
                
            </div>
        </>
    );
}

export default Home;