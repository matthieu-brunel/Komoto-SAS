const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;
export default async function getRessources(table, section, locale) {
  const options = {
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    }),
  };
  if (section !== null) {
    console.log("getRessource 1");
    let url =
      REACT_APP_SERVER_ADDRESS_FULL +
      "/api/" +
      table +
      "?section=" +
      section +
      "&locale=" +
      locale;
    console.log(url);
    const data = await (await fetch(url, options)).json();
    return data;
  } else if (table === "navbar") {
    let url =
      REACT_APP_SERVER_ADDRESS_FULL + "/api/" + table + "?locale=" + locale;
    console.log(url);
    console.log("getRessource 2");
    const data = await (await fetch(url, options)).json();
    return data;
  }
}
