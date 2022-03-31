const express = require("express");
const fetch = require("node-fetch");
const port = process.env.PORT || 7000;

const app = express();

const deleteMethod = {
  method: "DELETE",
  headers: { "Content-Type": "application/json" },
};

//Set Interval in seconds for delete
const timer = 5;

//Set Name of Deployment
const deploymentName = 'PersonnelProcess';

setInterval(() => {
  fetch("http://radf-dev.ibacz.cz:8081/engine-rest/deployment")
    .then((response) => {
      return response.json();
    })

    // !FOR DELETE YOUR DEPLOYMENT(WITH DEPLOYMENT NAME)
    .then((data) => {
        console.log(data.filter((deploy) => deploy.name === deploymentName))
        return data.filter((deploy) => deploy.name === deploymentName).map((e) => e.id);
    })
    .then((data) => {
        fetch(
                `http://radf-dev.ibacz.cz:8081/engine-rest/deployment/${
                  data[data.length - 1]
                }?cascade=true`,
                deleteMethod
              ).then(() => console.log("data DELETE"));
    })

    // !FOR DELETE ALL DEPLOYMENTS
    // .then((data) => {
    //     console.log(data)
    //   return data.map((e) => e.id);
    // })
    // .then((data) => {
    //   fetch(
    //     `http://radf-dev.ibacz.cz:8081/engine-rest/deployment/${
    //       data[data.length - 1]
    //     }?cascade=true`,
    //     deleteMethod
    //   ).then(() => console.log("data DELETE"));
    // });
}, timer * 1000);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
