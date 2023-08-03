import clear from 'rollup-plugin-clear';
import typescript from 'rollup-plugin-typescript2';
import vuePlugin from 'rollup-plugin-vue';

export default async function config(args) {
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
            declaration: true,
          },
          include: null,
        },
      }),
      clear({
        targets: ['./lib'],
      })
    ],
  };
}