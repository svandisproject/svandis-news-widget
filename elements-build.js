const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
    const files = [
        './dist/svandis-widget/runtime.js',
        './dist/svandis-widget/polyfills.js',
        './dist/svandis-widget/es2015-polyfills.js',
        './dist/svandis-widget/main.js'
    ];

    await fs.ensureDir('elements');
    await concat(files, 'elements/svandis-news.js');
    await fs.copyFile(
        './dist/svandis-widget/styles.css',
        'elements/styles.css'
    );
})();
