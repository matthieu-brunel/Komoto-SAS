const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;
fetch(REACT_APP_SERVER_ADDRESS_FULL + "/api/html")
    .then(function (response) {
        response.json()
            .then(function (value) {
                console.log(value);
            });
    });