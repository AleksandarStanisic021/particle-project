
varying vec2 vUv;
void main()
{
     float str=vUv.x;
    //float str=1.0-vUv.y;
    //float str=vUv.y*10.9;
   // float str=vUv.y*10.0;

/*
    float str=mod(vUv.x*10.0,1.0);//cool
    str=step(0.9,str);
    float str1=mod(vUv.y*10.0,1.0);
    str+=step(0.9,str1);
*/


    gl_FragColor = vec4(1.0, 0.3,1.0, 1.0);   
}



