
uniform vec3 color1;
uniform vec3 color2;

varying float velevation;


void main()
{
vec3 color=mix(color1,color2,3.0*velevation+0.4);

    gl_FragColor = vec4(color,1);   
}
