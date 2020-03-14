import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import path from 'path';

export default {
	input: 'src/index.ts',
	external: [],
	output: [
		{
			file: 'dist/index.cjs.js',
			format: 'cjs',
			sourcemap: 'inline'
		},
		{
			file: 'dist/index.es.js',
			format: 'esm',
			sourcemap: 'inline'
		},
		{
			name: 'lib',
			file: 'dist/index.umd.js',
			format: 'umd',
			sourcemap: 'inline',
			globals: {}
		}
	],
	plugins: [
		typescript({ clean: true }),
		terser({ include: [ /^.+\.umd\.js$/ ] }),
		license({
			banner: {
				content: {
					file: path.join(__dirname, 'licence'),
					encoding: 'utf-8'
				}
			}
		})
	]
};
