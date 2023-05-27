import { zip } from "zip-a-folder";
import fs from "fs";

const FOLDER = "./dist/client";
const ZIP_OUT = "./dist/client/packages/latest.zip";

async function run() {
    // check if directory exists
    if (!fs.existsSync(FOLDER)) {
        throw new Error(`Directory ${dir} does not exist. Did you build the client?`);
    }

    // delete old zip
    if (fs.existsSync(ZIP_OUT)) {
        fs.unlinkSync(ZIP_OUT);
        console.log(`Deleted ${ZIP_OUT}...`);
    }

    const folder = ZIP_OUT.substring(0, ZIP_OUT.lastIndexOf("/"));
    fs.mkdirSync(folder, { recursive: true });

    console.log(`Creating ${ZIP_OUT}...`);
    await zip(FOLDER, ZIP_OUT);
    console.log(`Created ${ZIP_OUT}...`);

    // write version file of parent node package
    const packageJson = JSON.parse(fs.readFileSync("./package.json"));
    const info = {
        displayName: packageJson.displayName,
        version: packageJson.version,
        image: "/tilesbg/clearnight.jpg"
    };
    fs.writeFileSync(folder + "/app.json", JSON.stringify(info, null, 2));
    console.log(`Wrote ${folder}/app.json...`);
}

await run();