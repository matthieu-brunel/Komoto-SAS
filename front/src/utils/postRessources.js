
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


export default async function postRessources(table, dataImage, data, image) {
    
    function options(data){
        const options = {
            method:'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }),
            body: JSON.stringify(data)
        }

        return options;
    }

    function optionsImage(file){
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

    const documentImage = new FormData();
    documentImage.append("file", image);
    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadImage';
    console.log(url);
    const recordDocument = await ( await ( fetch( url, optionsImage(documentImage) ) ) ).json();

    url = REACT_APP_SERVER_ADDRESS_FULL + '/api/image';

    const recordImage = await ( await ( fetch( url, options(dataImage) ) ) ).json();
    data.image_id = recordImage.id;

    url = REACT_APP_SERVER_ADDRESS_FULL + '/api/' + table;
    const record = await ( await ( fetch( url, options(data) ) ) ).json();
    console.log("results : ",record);
    //return results;
}

