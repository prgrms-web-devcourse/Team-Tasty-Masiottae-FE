module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npx tsc --noEmit',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) => `npx prettier --write ${filenames.join(' ')}`
}
