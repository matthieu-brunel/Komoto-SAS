const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


export default async function postModel(model) {

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

    //upload des images
    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadModel';

    const recordModel = await (await (fetch(url, optionsImage(model)))).json();

}