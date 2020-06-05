
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


export default async function postRessources(image) {

    function optionsImage(file) {
        const options = {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            redirect: "follow",
            referrer: "no-referrer",
            body: file
        }
        return options;
    }

    let url;
    let countFile = 0;
    for (var pair of image.entries()) {
        countFile++
    }

    console.log(" postRessources(image)",image);
    console.log(" countFile",countFile);

    if (countFile > 1) {
        //upload des images
        url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadMultipleImage';
        
        const recordDocument = await (await (fetch(url, optionsImage(image)))).json();
        console.log("plusieurs image:",recordDocument);
    } else {
        //upload une image
        url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadImage';
        const recordDocument = await (await (fetch(url, optionsImage(image)))).json();
        console.log("1 image:",recordDocument);
    }
}

