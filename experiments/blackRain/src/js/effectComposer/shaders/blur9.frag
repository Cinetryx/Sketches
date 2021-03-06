// blur9.frag
// source  : https://github.com/Jam3/glsl-fast-gaussian-blur

#define SHADER_NAME BLUR_9

precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D texture;
uniform vec2 uDirection;
uniform vec2 uResolution;

vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
	vec4 color = vec4(0.0);
	const float d = 0.05;
	vec2 off1 = vec2(1.3846153846) * direction * d;
	vec2 off2 = vec2(3.2307692308) * direction * d;
	color += texture2D(image, uv) * 0.2270270270;
	color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
	color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
	color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
	color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
	return color;
}


void main(void) {
    gl_FragColor = blur9(texture, vTextureCoord, uResolution, uDirection);
}