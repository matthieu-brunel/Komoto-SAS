
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;
export default async function getRessources(table, section) {
    const options = {
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('token')
        }),
    }
    if(table !== 'language'){
        let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/' + table +'?section=' + section;
        const data = await (await (fetch(url, options))).json();
        return data;
    }else{
        let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/' + table +'/' + section;
        const data = await (await (fetch(url, options))).json();
        return data;
    }

}