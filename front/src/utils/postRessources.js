
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


export default async function postRessources(table, dataImage, data, image) {

    function options(data) {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }),
            body: JSON.stringify(data)
        }

        return options;
    }

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

    /*     console.log("TABLE :", table);
        console.log("DATA IMAGE:", dataImage);
        console.log("DATA:", data)
     */
    if (countFile > 1) {

        //upload des images
        url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadMultipleImage';
        const recordDocument = await (await (fetch(url, optionsImage(image)))).json();

        //enregistement de la table image en BDD
        url = REACT_APP_SERVER_ADDRESS_FULL + '/api/image';
        console.log("url table image : ", url);
        console.log(dataImage);
        const recordImage = await (await (fetch(url, options(dataImage)))).json();

        // on récupere l'id de la ligne d'enregistrement de l'image
        data.image_id = recordImage.id;
 
        //enregistement de la table en parametre en BDD
        url = REACT_APP_SERVER_ADDRESS_FULL + '/api/' + table;
        console.log("URL SOLUTION:", url)
        const record = await (await (fetch(url, options(data)))).json();

    } else {
        url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadImage';
        const recordDocument = await (await (fetch(url, optionsImage(image)))).json();

        url = REACT_APP_SERVER_ADDRESS_FULL + '/api/image';
        const recordImage = await (await (fetch(url, options(dataImage)))).json();

        data.image_id = recordImage.id;

        url = REACT_APP_SERVER_ADDRESS_FULL + '/api/' + table;
        const record = await (await (fetch(url, options(data)))).json();
    }
}

