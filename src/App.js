import logo from './logo.svg'
import './App.css'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import PortalWorld from './components/PortalWorld'

function App() {
	return (
		<div className="App">
			<React.Suspense fallback={null}>
				<div className="Container">
					<Canvas shadows>
						<PortalWorld />
					</Canvas>
				</div>
			</React.Suspense>
		</div>
	)
}

export default App
