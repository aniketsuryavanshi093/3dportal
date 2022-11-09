import React from 'react'
import {
	Environment,
	Float,
	OrbitControls,
	PerspectiveCamera,
	Stats,
} from '@react-three/drei'
import FloatingIsland from './FloatingIsland'
import Portal from './Portal'
import {
	EffectComposer,
	HueSaturation,
	ChromaticAberration,
	GodRays,
	DepthOfField,
	BrightnessContrast,
} from '@react-three/postprocessing'
import { FloatingRocks } from './FloatingRocks'
import { Trees } from './Trees'
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'
import { Grass } from './Grass'
import { Words } from './Words'
import { Sparkels } from './Sparkels'
import { Color, CylinderGeometry, Mesh, MeshBasicMaterial } from 'three'

let lightColor = new Color(1, 0.2, 0.1)
let mesh = new Mesh(
	new CylinderGeometry(0.3, 0.3, 0.2, 20),
	new MeshBasicMaterial({
		color: lightColor,
		transparent: true,
		opacity: 1,
	}),
)
mesh.rotation.x = Math.PI * 0.5
mesh.position.set(1.17, 10.7, -4.1)
mesh.scale.set(1.5, 1, 1)

const PortalWorld = () => {
	return (
		<>
			<Stats />
			<Environment
				background={'only'}
				files={process.env.PUBLIC_URL + 'textures/bg.hdr'}
			/>
			<Environment
				background={false}
				files={process.env.PUBLIC_URL + 'textures/envmap.hdr'}
			/>
			<OrbitControls target={[1, 5, 0]} maxPolarAngle={Math.PI / 2} />
			<PerspectiveCamera
				makeDefault
				fov={50}
				position={[-1.75, 10.05, 20.35]}
			/>
			<Float rotationIntensity={0.6} speed={0.5} floatIntensity={0.6}>
				<primitive object={mesh} />
				<spotLight
					penumbra={1}
					distance={500}
					angle={60.65}
					attenuation={1}
					anglePower={3}
					intensity={0.3}
					color={lightColor}
					position={[1.19, 10.85, -4.45]}
					target-position={[0, 0, -1]}
				/>
				<FloatingIsland />
				<Portal />
				<Trees />
				<Grass />
				<Words />
			</Float>
			<FloatingRocks />
			<Sparkels />
			<EffectComposer stencilBuffer={true}>
				<DepthOfField
					focusDistance={0.012}
					focalLength={0.015}
					bokehScale={7}
				/>
				<HueSaturation hue={0} saturation={-0.15} />
				<BrightnessContrast brightness={0.0} contrast={0.035} />
				<ChromaticAberration
					radialModulation={true}
					offset={[0.00175, 0.00175]}
				/>
				<GodRays
					sun={mesh}
					blendFunction={BlendFunction.Screen}
					samples={40}
					density={0.97}
					decay={0.97}
					weight={0.6}
					exposure={0.3}
					clampMax={1}
					width={Resizer.AUTO_SIZE}
					height={Resizer.AUTO_SIZE}
					kernelSize={KernelSize.SMALL}
					blur={true}
				/>
			</EffectComposer>
		</>
	)
}

export default PortalWorld
