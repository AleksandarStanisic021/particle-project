
uniform float vBigWave;
uniform float uTime;
void main()
{
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation=sin(modelPosition.x+uTime)*1.33*
    sin(modelPosition.z+uTime)*vBigWave;

    modelPosition.y+=elevation;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
    


