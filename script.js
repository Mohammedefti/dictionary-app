const form = document.querySelector("form");
const resultDiv = document.querySelector('.result');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
})

const getWordInfo= async(word)=>{
    try{
        resultDiv.innerHTML =`
        <span class="loading loading-ring loading-lg flex items-center"></span>

        `
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const data = await response.json();
    // alert("word "+ word);
    let definitions = data[0].meanings[0].definitions[0];
    resultDiv.innerHTML =`
    <h2><strong>Word:</strong> ${data[0].word}</h2>
    <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not Found":definitions.definition}</p>
    <p><strong>Example:</strong>${definitions.example === undefined ? "Not Found":definitions.example }</p>
    <p><strong>Antonyms: 
    </strong></p>
    `;

    // check have antonyms  or not
    if (definitions.antonyms.length ===0) {
        resultDiv.innerHTML += `<span>Not Found</span>`
    }else{
        for(let i=0;i<definitions.antonyms.
            
            length;i++){
        resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
    }
    }

    // for synonyms
    resultDiv.innerHTML +=`
    <div><strong>
    Synonyms:
    </div></div> 
    `
    // check have antonyms  or not
    if (definitions.synonyms.length ===0) {
        resultDiv.innerHTML += `<span>Not Found</span>`
    }else{
        for(let i=0;i<definitions.synonyms.
            
            length;i++){
        resultDiv.innerHTML += `<li>${definitions.synonyms[i]}</li>`
    }
    }

    // adding Read more button
    resultDiv.innerHTML +=`<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`
}catch(error){
    resultDiv.innerHTML=`<div><p>Sorry, the word could not be found.</p></div>`
}
    console.log(data);
}
