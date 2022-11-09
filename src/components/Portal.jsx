import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect } from 'react'
import {
	Scene,
	WebGLRenderTarget,
	TextureLoader,
	EquirectangularReflectionMapping,
	AlwaysStencilFunc,
	ReplaceStencilOp,
	DoubleSide,
	LinearEncoding,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import FillQuads from './FillQuads'

const scene = new Scene()
scene.background = new TextureLoader().load(
	// thanks to https://www.creativeshrimp.com/midjourney-text-to-images.html
	'./textures/galaxy.jpg',
	(texture) => {
		texture.encoding = LinearEncoding
		texture.mapping = EquirectangularReflectionMapping
	},
)

const target = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
	stencilBuffer: false,
})

window.addEventListener('resize', () => {
	target.setSize(window.innerWidth, window.innerHeight)
})

const Portal = () => {
	const portal = useLoader(GLTFLoader, './model/portal.glb')
	const mask = useLoader(GLTFLoader, './model/portal_mask.glb')
	useFrame((state) => {
		state.gl.setRenderTarget(target)
		state.gl.render(scene, state.camera)
		state.gl.setRenderTarget(null)
	})
	useEffect(() => {
		if (!portal) return
		let mesh = portal.scene.children[0]
		mesh.material.envMapIntensity = 3.5
		let maskmesh = mask.scene.children[0]
		maskmesh.material.side = DoubleSide
		maskmesh.material.stencilFunc = AlwaysStencilFunc
		maskmesh.material.stencilWrite = true
		maskmesh.material.stencilRef = 1
		maskmesh.material.stencilZPass = ReplaceStencilOp
	}, [portal, mask])

	return (
		<>
			<primitive object={portal.scene} />
			<primitive object={mask.scene} />
			<FillQuads map={target.texture} maskId={1} />
		</>
	)
}

export default Portal
