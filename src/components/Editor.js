import { useEffect, useState } from "react";

const symbols = ["(", "+", "-", "*", "/", ")"];

const Editor = () => {
    const [answer, setAnswer] = useState(0);
    const [question, setQuestion] = useState("");
    const [questionElements, setQuestionElements] = useState([])
    const [curSymbol, setCurSymbol] = useState("(")

    const getSymbols = () => {
        return symbols.map((symbol) => (
            <option value={symbol}> {symbol} </option>
        ))
    }

    const getQuestionElements = () => {
        console.log("get question", questionElements)
        return questionElements.map( elem => (
            elem
        ))
    }

    const onSymbolChange = (e) => {
        const value = e.target.value;
        console.log(value)
        if (value){
            setCurSymbol(value)
        }
    }

    const addToQuestionElements = (elem) => {
        const questionElementsVal = questionElements.slice();
        if(elem){
            questionElementsVal.push(elem);
        }
        setQuestionElements(questionElementsVal)
    }

    const addSymbol = () => {
        addToQuestionElements(curSymbol)
    }

    const addVariable = () => {
        const inputVar = <input type={"number"}/>
        addToQuestionElements(inputVar);
    }
    
    useEffect(() => {
        console.log("question elems")
    }, [questionElements]) 

    const calculate = () => {
        const data = questionElements;
        let questData = "";
        data.map( elem => {
            if(typeof elem == "string"){
                questData += elem
            }
            else{
                console.log(elem)
                questData += elem.value
            }
            return ""
        }) 
        const answer = _getAnswer(questData);
        // const answer = _getAnswer("(0+0)");
        console.log(answer);
    }

    const _getAnswer = (quest) => {
        let output = 0;
        let cur = 0;
        let sign = 1;
        let stack = [];
        for (var c of quest){
            if(parseInt(c)){ // int
                cur = cur*10 + parseInt(c);
            }
            else if("+-".includes(c)){
                output += (cur*sign) 
                cur = 0;
                if(c === "-"){
                    sign = -1
                }
                else {
                    sign = 1
                }
            }
            else if (c === "("){
                stack.push(output);
                stack.push(sign);
                output = 0
                sign = 1
            }
            else if (c === ")"){
                output += (cur*sign)
                output += stack.pop();
                output += stack.pop();
                cur = 0
            }
        }
        return output + (cur*sign) -1
    }

    return(
        <div>
            <button onClick={addVariable}>Add Variable</button>
            <select onChange = {onSymbolChange}>
                {   getSymbols()   }
                <option></option>
            </select>
            <button onClick={addSymbol}>Add Symbol</button>
            <section>
                <div>
                    { getQuestionElements()  }
                </div>
                <div> {`= ${answer}`}</div>
            </section>
            <section>
                <button onClick={calculate}> Calculate Answer</button>
            </section>
        </div>
    );
}

export default Editor;