import { useState } from "react";
import { calculate } from "../utils";

const symbols = ["(", "+", "-", "*", "/", ")"];

const Editor = () => {
    const [answer, setAnswer] = useState(0);
    const [questionElements, setQuestionElements] = useState([]);
    const [formData, setFormData] = useState({});

    const getSymbols = () => {
        return symbols.map((symbol) => (
            <button onClick={() => onSymbolClick(symbol)}> {symbol} </button>
        ))
    }

    const getQuestionElements = () => {
        return questionElements.map( elem => (
            elem
        ))
    }

    const addToQuestionElements = (elem) => {
        const questionElementsVal = questionElements.slice();
        if(elem){
            questionElementsVal.push(elem);
        }
        setQuestionElements(questionElementsVal)
    }

    const onSymbolClick = (symbol) => {
        addToQuestionElements(symbol)
    }

    const onInputChange = (e) => {
        const {name, value} = e.target; 
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const addVariable = (e) => {
        e.preventDefault();
        const len = questionElements.length;
        const inputVar = <input name={len} type={"number"} onChange={onInputChange}/>
        addToQuestionElements(inputVar);
    }

    const getAnswer = (e) => {
        e.preventDefault();
        const data = questionElements.slice();
        let questData = "";
        data.map( (elem,key) => {
            if(typeof elem == "string"){
                questData += elem
            }
            else{
                questData += formData[key]
            }
            return ""
        }) 
        const ans = calculate(questData);
        setAnswer(ans);
    }

    return(
        <div>
            <button onClick={addVariable}>Add Variable</button>
            {
                getSymbols()
            }
            <section className="calc_area">
                <div>
                    { getQuestionElements()  }
                </div>
                {
                    questionElements.length > 0 && <div className="answer"> {`= ${answer}`}</div>
                }
            </section>
            <section>
                <button onClick={getAnswer}> Calculate Answer</button>
            </section>
        </div>
    );
}

export default Editor;