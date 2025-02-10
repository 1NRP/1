// Run "node ESBuild/build.js" in terminal to run this file and start bundling.
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['ESBuild/uploadBlob.js'], // Your entry JavaScript file
    bundle: true, // Bundle the files
      outfile: 'ESBuild/vercelUploadFunction.js', // Output file
        minify: true, // Minify the code
          sourcemap: false, // Do not generate sourcemap
          }).catch(() => process.exit(1));