
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;
export default async function getRessources(table, section, language_id) {
    const options = {
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('token')
        }),
    }

    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/' + table +'?section=' + section + '&language_id=' + language_id;
    const data = await (await (fetch(url, options))).json();
    return data;
    

}


