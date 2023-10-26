import fs from "fs";
import * as htmlparser2 from "htmlparser2";

class JankyParser {
  constructor() {
    this.tagStatuses = {
      bold: false,
    };
    this.result = [];
    this.parser = new htmlparser2.Parser({
      onopentag: (name, attribs) => {
        if (name === "bold") {
          this.tagStatuses.bold = true;
        }
      },
      ontext: (text) => {
        // Add the text to the result, with the bold flag
        this.result.push({ text, bold: this.tagStatuses.bold });
      },
      onclosetag: (name) => {
        if (name === "bold") {
            this.tagStatuses.bold = false;
        }
      },
      onend: () => {
        // Process the parsed content
        console.log("Parsed Content:");
        this.result.forEach((item) => {
          if (item.bold) {
            console.log(`Bold: ${item.text}`);
          } else {
            console.log(`Regular: ${item.text}`);
          }
        });
      },
    });
  }
  parse(input){
    this.result =[]
    this.parser.write(input)
    return this.result
  }
}

const parser = new JankyParser()

// Get the filename from the command line arguments
async function main(){
    // Check if a filename was provided as a command line argument
    if (process.argv.length < 3) {
      console.log("Usage: node readFile.js <filename>");
      process.exit(1);
    }
    // Read the content of the file
    const filename = process.argv[2];
    const data = await fs.readFileSync(filename, "utf8", (err, data) => data);
    console.log("File content:\n", data);
    const result = parser.parse(data)
    console.log(result);

} 
main()
