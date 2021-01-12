#version 430

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec3 texcoord;
layout(location = 3) in vec3 tangent;
layout(location = 4) in vec3 bitangent;

out vec3 o_position;
out vec2 o_texcoord;
out vec3 o_tangentLightPos;
out vec3 o_tangentViewPos;
out vec3 o_tangentFragPos;
	
uniform mat4 world;
uniform mat4 viewProj;
uniform mat3 normalMatrix;

uniform vec3 lightPos;
uniform vec3 viewPos;
	
void main()
{
	o_position = vec3(world * vec4(position, 1.0f));
	o_texcoord = texcoord.xy;

	vec3 T = normalize(normalMatrix * tangent);
    vec3 N = normalize(normalMatrix * normal);
    T = normalize(T - dot(T, N) * N);
    vec3 B = cross(N, T);

	mat3 TBN = transpose(mat3(T, B, N));    
    o_tangentLightPos = TBN * lightPos;
    o_tangentViewPos  = TBN * viewPos;
    o_tangentFragPos  = TBN * o_position;
	
    gl_Position = viewProj * world * vec4(position, 1.0f);
}