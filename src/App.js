import './App.css';
import {useState} from 'react'

function App() {
    
    const [dices, setDices] = useState([]);
    const [numPlayers, setNumPlayers] = useState(2);
  
    const tirar = () => {
      let auxDices = []
      let drops = dices.slice()
      let numDrops = drops.length + 1
        for(let i = 0; i < numPlayers; i++){
          auxDices.push(tirarDados())
      }
      drops.push({'drop': numDrops, 'dices':auxDices})
      setDices(drops)
    }

    const tirarDados = () => {
      return 1 + Math.floor(Math.random() * 5)
    } 

    const reset = () => {
      setDices([])
    } 

    const ResetButton = () => {
      if(dices.length) 
          return  (
            <button onClick={reset}> Empezar de nuevo </button>
          )
      else
          return (null )
      }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Haga clic en tirar dado para comenzar
        </p>
        <button onClick={tirar}> Tirar dados </button>
        <ResetButton/>
      </header>
      <main>
        <Resultados dices = {dices}
                    numPlayers = {numPlayers}/>
      </main>
    </div>
  );
}

const Resultados = (props) => {
  if ( Object.keys(props.dices).length === 0 )
    return (<div/>)
  else
    return (
      <div>
        <h2>Resultados</h2>
        <ul>
          <TablaResultados dices = {props.dices} 
                           numPlayers = {props.numPlayers}/>
        </ul>
      </div>
    )
}

const TablaResultados = (props) => {
  return (
    <table>
      <CabeceraResultados numPlayers = {props.numPlayers}/>
      <tbody>
      {
        props.dices.map((item,index) =>
          <LineaResultados key   = {'drop-'+item.drop}
                           drops = {item.drop}
                           dices = {item.dices}
          />
        )
      }
      </tbody>
    </table>
  )
}
const CabeceraResultados = (props) => {
  let players = []
  for (let i=1 ; i<= props.numPlayers; i++) {
    players.push('Player'+i)
  }

  return (
    <thead>
      <tr>
        <th>#</th>
        {
          players.map((item,index) =>
            <th key = {index}>
              {item}
            </th>
          )
        }
      </tr>
    </thead>
  )
}
const LineaResultados = (props) => {
  let numPlayers = props.dices.length

  return (
    <tr>
      <td>{props.drops}</td>
      {
        props.dices.map((item,index) =>
          <td key = {props.drops+index}>
            {item
          }</td>
        )
      }
    </tr>
  )
}

export default App;