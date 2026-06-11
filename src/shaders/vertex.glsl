
precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float time;

attribute vec3 position;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x * 10.0 + time) * 0.1;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}


