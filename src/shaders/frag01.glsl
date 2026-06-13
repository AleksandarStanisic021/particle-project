
varying vec2 vUv;
void main()
{
     //float str=vUv.x;
    float str=1.0-vUv.y;

    gl_FragColor = vec4(str, str,str, 1.0);   
}



