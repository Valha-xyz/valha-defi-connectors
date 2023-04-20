const execSync = require('child_process').execSync;

const args = process.argv.slice(2);

console.log(args, 'npm run test-repository -- ' + args.join(" "), {stdio: "inherit"})
execSync('npm run test-repository -- ' + args.join(" "), {stdio: "inherit"});
execSync('npm run test-interactions -- ' + args.join(" "), {stdio: "inherit"});
execSync('npm run test-analytics -- ' + args.join(" "), {stdio: "inherit"});

