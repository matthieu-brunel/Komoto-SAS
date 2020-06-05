
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;
export default async function deleteRessources(table, id) {
    const options = {
        method:'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('token')
        }),
    }

    let url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/${table}/${id}`;
    console.log(url)

    const data = await (await (fetch(url, options))).json();
    console.log("delete : ",data)
    return data;
}
