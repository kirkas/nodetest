echo "Remove old Build build..."
rm -fr app-build
echo "Start build..."
r.js -o app/build/app.build.js
echo "End r.js build"
echo "Start cleaning files"
cd app-build/
rm -rf build
rm -rf build.txt
mv css/main.css main.css
mv scripts/main.js main.js
mv components/requirejs/require.js require.js
rm -rf scripts/*
rm -rf css/*
rm -rf components/*
mv main.css css/main.css
mv main.js scripts/main.js
mkdir components/requirejs/
mv require.js components/requirejs/require.js
rm -rf build
echo "build finish"