
uniform float vBigWave;
void main()
{
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation=sin(modelPosition.x)*1.33*
    sin(modelPosition.z)*vBigWave;

    modelPosition.y+=elevation;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
    


