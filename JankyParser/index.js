import * as htmlparser2 from "htmlparser2";

export class JankyParser {
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
  
  