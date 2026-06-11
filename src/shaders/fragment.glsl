precision mediump float;

uniform float time;

void main()
{
    float t = time;
    gl_FragColor = vec4(0.5 + 0.5 * sin(t), 0.5 + 0.5 * cos(t), 0.5 + 0.5 * tan(t)  , 1.0);
}

