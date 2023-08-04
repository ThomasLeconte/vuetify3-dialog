import clear from 'rollup-plugin-clear';
import typescript from 'rollup-plugin-typescript2';
import vuePlugin from 'rollup-plugin-vue';
import copy from 'rollup-plugin-copy'

export default async function config (args) {
  return {
    input: 'src/index.ts',
    output: {
      dir: 'lib',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      vuePlugin(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
          include: null,
        },
      }),
      clear({
        targets: ['./lib'],
      }),
      copy({
        targets: [
          { src: 'src/index.d.ts', dest: 'lib/' }
        ]
      })
    ],
  };
}