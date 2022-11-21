import { useState } from "react";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";

function CreateRaiser({ fundItem }){

    const {setSaveRaise, setUpdateFund} = useContext(DataContext);

    const [raiserName, setRaiserName] = useState('');
    const [amount, setAmount] = useState(0);

    const [warning, setWarning] = useState(null);

    const checkInput = (e) => {
        if(!isNaN(e.target.value) && e.target.value.length <= 8){
            setAmount(e.target.value);
        }
    }

    const saveRaise = () => {
        if(amount <= fundItem.goal - fundItem.raised){
            setSaveRaise({
                name: raiserName,
                amount: parseFloat(amount),
                funds_id: fundItem.id,
            });

            setUpdateFund({
                id: fundItem.id,
                raised: parseFloat(amount) + fundItem.raised,
                status: fundItem.status,
            });
            setRaiserName('');
            setAmount(0);
            setWarning(null);
        }
        else
            setWarning('You can only donate amount of remaining to goal not higher');
    }

    return (
        <div className="create-raiser">
            <div className="fund-people-input">
                            <div className="input-container">
                                <label>Raisers name:</label>
                                <input type='text' value={raiserName} onChange={e => setRaiserName(e.target.value)}></input>
                            </div>
                            <div className="input-container">
                                <label>Amount:</label>
                                <input type='text' value={amount} onChange={e => checkInput(e)}></input>
                            </div>            
                        </div>
                        <button className="btn" onClick={saveRaise}>Donate</button>
                        <div>
                            <span className="warn-info">{warning}</span>
                        </div>
            </div>
        );
}

export default CreateRaiser;