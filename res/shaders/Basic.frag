#version 430

in vec3 o_position;
in vec2 o_texcoord;
in vec3 o_tangentLightPos;
in vec3 o_tangentViewPos;
in vec3 o_tangentFragPos;

layout(location = 0) out vec4 fragColor;

layout(binding = 1) uniform sampler2D aoMap;
layout(binding = 2) uniform sampler2D diffuseMap;
layout(binding = 3) uniform sampler2D normalMap;
layout(binding = 4) uniform sampler2D roughnessMap;

uniform vec3 lightPos;
uniform vec3 viewPos;

void main()
{   
	// obtain bumps from normal map in range [0,1]
    vec3 normal = texture(normalMap, o_texcoord).rgb;
    // transform normal vector to range [-1,1]
    normal = normalize(normal * 2.0 - 1.0);  // this normal is in tangent space

	// get diffuse color
    vec3 color = texture(diffuseMap, o_texcoord).rgb;
	// ambient occlusion
    float AmbientOcclusion = texture(aoMap, o_texcoord).r;
    // ambient
    vec3 ambient = vec3(0.3 * color * AmbientOcclusion); // here we add occlusion factor
	// diffuse
    vec3 lightDir = normalize(o_tangentLightPos - o_tangentFragPos);
    float diff = max(dot(lightDir, normal), 0.0);
    vec3 diffuse = diff * color;
	// specular
    vec3 viewDir = normalize(o_tangentViewPos - o_tangentFragPos);
    vec3 reflectDir = reflect(-lightDir, normal);
    vec3 halfwayDir = normalize(lightDir + viewDir); 
    float spec = pow(max(dot(normal, halfwayDir), 0.0), 32.0);
	// roughness
    vec3 Roughness = texture(roughnessMap, o_texcoord).rgb;
	vec3 specular = Roughness * spec;
    fragColor = vec4(ambient + diffuse + specular, 1.0);
}