import React, { useEffect } from 'react'
import Form from './Form/Form'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import './App.scss'

const App = () => {
	useEffect(() => {
		//Initialize materialize JS
		M.AutoInit()
	})

	return (
		<div className="App container">
			<Form />
		</div>
	)
}

export default App
