import React, { Component } from 'react';
import './App.css';
import Response from '../Response/Response.js'
import Counter from '../Counter/Counter.js'
import Party from '../Party/Party.js'
import 'bootstrap/dist/css/bootstrap.min.css'

const quiz = "Quel animal effrayant rencontre Sindbad le marin, héros d’un des contes perses des Mille et Une Nuits ?"
const responses = ["Un calamar géant", "Une baleine géante", "Un chameau à trois têtes"]
const correctResponse = [responses[0]]
class App extends Component {
    state = {
        selection: [],
        state: "chargement",
        score: 52
    }

    newParty = () => {
        this.setState({ selection: [], state: "chargement", score: 52 })
    }

    getSelectionState(response) {
        const { selection } = this.state
        return selection.includes(response)
    }

    handleClick = response => {
        const { selection, state } = this.state
        if (state == "chargement") {
            this.setState({ selection: [...selection, response] }, this.gameState)
        }
    }

    trying = () => {
        const { selection } = this.state
        return selection.filter(res => responses.includes(res)).length
    }

    gameState = () => {
        const { selection, score } = this.state
        const lastTests = 2 - this.trying()

        const findWord = correctResponse.filter(res => selection.includes(res)).length === correctResponse.length
        if (lastTests > 0 && findWord) {
            this.setState({ state: "gagnée" })
            this.setState({ score: score + 5 })
        } else if (lastTests > 0) {
            return
        } else {
            this.setState({ state: "perdue" })
            this.setState({ score: score - 3 })
        }
    }

    render() {
        const { selection, state, score } = this.state;

        return (
            <div className="wrapper">
                <div className="header">
                    <h1 className="title">QCM Histoire</h1>
                </div>
                <div className="body">
                    <div className="score">
                        <h1>Score: {score}</h1>
                    </div>
                    <div className="quiz">
                        <h6>Quel animal effrayant rencontre Sindbad le marin, héros d’un des contes perses des Mille et Une Nuits ?</h6>
                    </div>
                    <div className="choice">
                        {responses.map((response, index) => (
                            <Response
                                response={response}
                                key={index}
                                onClick={this.handleClick}
                                iscolor={this.getSelectionState(response) ? "btn btn-secondary is-padding" : "btn btn-primary is-padding"}
                            />
                        ))}
                    </div>
                    <Counter
                        counter={this.trying()}
                    />
                </div>
                <div className="">
                    <Party party={state} classParty="state" />
                </div>
                <div className="footer">
                    <button className="btn btn-info" onClick={this.newParty}>Recommencer</button>
                </div>
            </div>
        );
    }
}

export default App;
