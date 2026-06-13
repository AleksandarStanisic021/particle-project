
varying vec2 vUv;
void main()
{
     //float str=vUv.x;
    //float str=1.0-vUv.y;
    //float str=vUv.y*10.9;
   // float str=vUv.y*10.0;



    float str=mod(vUv.x*10.0,1.0);//cool
    str=step(0.28,str);


    gl_FragColor = vec4(str, str,str, 1.0);   
}



