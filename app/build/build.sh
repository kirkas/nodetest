r.js -o app/build/app.build.js
cd app-build
mv public/scripts/vendor/requirejs/require.js require.js
rm -rf public/scripts/vendor/* build public/scripts/views scripts/models public/scripts/collections build.txt
mkdir public/scripts/vendor/requirejs && mv require.js public/scripts/vendor/requirejs/require.js
mv public/css/main.css main.css && rm -rf css/* && mv main.css public/css/main.css