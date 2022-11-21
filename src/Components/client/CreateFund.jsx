import { useRef, useState } from "react";
import getBase64 from "../../Functions/getBase64";

import ShowNav from "../ShowNav";

import delImg from "../../assets/img/x.svg";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";

function CreateFund(){

    const [photoPrint, setPhotoPrint] = useState(null);

    const [text, setText] = useState('');
    const [price, setPrice] = useState(0);

    const { setSaveFund } = useContext(DataContext);

    const fileInput = useRef();

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {})
    }

    const checkInput = (e) => {
        if(!isNaN(e.target.value) && e.target.value.length <= 8){
            setPrice(e.target.value);
        }
    }

    const saveFund = () => {
        setSaveFund({
            idea: text,
            image: photoPrint,
            goal: parseFloat(price),
        });

        setText('');
        setPhotoPrint(null);
        setPrice(0);
        fileInput.current.value = null;
    }

    return (
        <div className="create-fund">
            <ShowNav />
            <div className="input-field">
                <h2>Create new idea</h2>
                <div className="input-container">
                    <label>Idea text</label>
                    <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Text here...">
                    </textarea>
                </div>
                <div className="input-container">
                    <label>Image</label>
                    <div className="image-control">
                        <input type='file' ref={fileInput} className="btn file-input" onChange={doPhoto} onClick={(e) => e.target.value = null }></input>
                        {photoPrint ?
                        <div className="image-preview">
                            <img className="btn-delete-image" src={delImg} alt='Remove img' onClick={() => {setPhotoPrint(null); fileInput.current.value = null }}></img>
                            <img src={photoPrint} alt='Preview'></img>
                        </div>
                        : null}
                    </div>
                </div>
                <div className="input-container">
                    <label>Goal price</label>
                    <input type='text' className="input-text" value={price} onChange={e => checkInput(e)}></input>
                </div>
                <button className="btn" onClick={saveFund}>Submit</button>
            </div>
        </div>
    );
}

export default CreateFund;