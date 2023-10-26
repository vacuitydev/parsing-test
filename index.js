import fs from "fs";
import { Packer, Document, Paragraph, TextRun } from "docx";
import { JankyParser } from "./JankyParser";
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
    const texts = []
    result.forEach(item=>{
        
            texts.push(new TextRun({
                bold: item.bold,
                text: item.text
            }))
    })
    const doc = new Document({
        sections:[
            {
                properties:{},
                children:[
                    new Paragraph({
                        children:[
                            ...texts
                        ]
                    })
                ]
            }
        ]
    })
    const buffed = await Packer.toBuffer(doc)
    fs.writeFileSync(`${filename.split('.').slice(0,-1).join("")}.docx`,buffed)
} 
main()
