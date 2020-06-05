
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;
export default async function deleteRessources(table, id, data) {
    const options = {
        method:'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('token')
        }),
        body:JSON.stringify(data)
    }

    let url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/${table}/${id}`;
    console.log("table : ", table, " id : ", id);
    console.log("url : ", url);
  
    const result = await (await (fetch(url, options))).json();
    return result;

}
