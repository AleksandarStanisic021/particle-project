precision mediump float;

uniform float time;

void main()
{
    float t = time;
    gl_FragColor = vec4(0.5 + 0.5 * sin(t), 0.0, 0.0, 1.0);
}

