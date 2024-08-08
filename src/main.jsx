import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Main} from './app.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Main Content={Content} />
  </StrictMode>,
)


function Content () {
    const style = {
        gridRow: 2,
        display: "grid",
        gridTemplateRows: "40% 40% 20%",
        gridTemplateColumns: "1fr"
    }
    return <div style={style}>
        <Title gridRow={1}></Title>
    </div>
}

function Title (props) {
    const style = {
        fontSize: "30pt",
        display: "flex",
        gridRow: props.gridRow,
        justifyContent: "center",
        alignItems: "center"
    }
    return <div style={style}>The Great Big Apple</div>
}