uniform sampler2D bumpTexture1;
varying vec4 blend;
varying vec2 vUV;

void main() 
{ 
	vUV = uv;
	blend = texture2D( bumpTexture1, uv );
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}