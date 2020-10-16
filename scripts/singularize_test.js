const pluralize = require("pluralize");

const plural_words = ["lamps", "chairs", "wheels", "stones", "waltzes", "bicycle wheels"];

plural_words.forEach( word => {
    
    let singularVersion = pluralize.singular(word.replace(/\s/g, ''));
    console.log(singularVersion);
}
    )

