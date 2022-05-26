const _ = require("underscore");

const resulter = _.contains([1, 2, 3], 3);
console.log(resulter);

// if (result) {
//     const payload = {
//         farm_id: farmId,
//         integration_type: "delpro",
//       };
//     axios
//       .post(
//         "https://stage.oauth2.provisioning.delaval.cloud/service-account",
//         payload
//       )
//       .then((response) => {
//         console.log(
//           "This is the response from delpro post request",
//           response
//         );
//         console.log(JSON.stringify(response));
//       })
//       .catch((error) => {
//         console.log("Error in Post request of Delpro device created");
//         console.error(error);
//       });
//     }

if (res) {
  try {
    const payload = {
      farm_id: farmId,
      integration_type: "delpro",
    };
    const resp = await axios.post(
      "https://stage.oauth2.provisioning.delaval.cloud/service-account",
      payload
    );
    console.log("This is the response from delpro post request", resp);
    console.log(JSON.stringify(`status code ${resp.status}`));
    console.log(JSON.stringify(resp));
  } catch (err) {
    console.log("Error in Post request of Delpro device created");
    console.error(err);
  }
}

const hostname = "https://stage.cert.eiac.delaval.cloud/edge-delpro";
if (resp) {
  try {
    const result = await axios.get(hostname, body, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    console.log("This is the response from get request", result);
    console.log(JSON.stringify(`status code ${resp.status}`));
    console.log(JSON.stringify(result));
  } catch (err) {
    console.log("Error in getting token");
    console.error(err);
  }
}

const https = require("https");
function postData() {
  const data = [];

  const options = {
    hostname: "whatever.com",
    port: 443,
    path: "/todos",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

new Promise((resolve, reject) => {
  const req = https.request(urlOptions, (res) => {
    // I believe chunks can simply be joined into a string
    const chunks = [];

    res.on("data", (chunk) => chunks.push(chunk));
    res.on("error", reject);
    res.on("end", () => {
      const { statusCode, headers } = res;
      const validResponse = statusCode >= 200 && statusCode <= 299;
      const body = chunks.join("");

      if (validResponse) resolve({ statusCode, headers, body });
      else
        reject(
          new Error(`Request failed. status: ${statusCode}, body: ${body}`)
        );
    });
  });

  req.on("error", reject);
  req.write(data, "binary");
  req.end();
});

function post() {
  const hostname = "https://stage.oauth2.provisioning.delaval.cloud";
  const payload = {
    farm_id: farmId,
    integration_type: "delpro",
  };
  const options = {
    hostname,
    path: "/service-account",
    method: "POST",
    headers: { Host: hostname, Accept: "application/json" },
    timeout: 10000,
    cert: require("fs").readFileSync("/certs/cert.pem", "utf8"), // path to cert
    key: require("fs").readFileSync("/certs/private.key", "utf8"), // path to private key
    agent: false,
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk.toString()));
      res.on("error", reject);
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: body,
          });
        } else {
          reject(
            "Request failed. status: " + res.statusCode + ", body: " + body
          );
        }
      });
    });
    req.on("error", reject);
    req.write(payload, "binary");
    req.end();
  })
    .then((result) => {
      console.log(
        "This is the response from delpro post request to service account",
        result
      );
      console.log(JSON.stringify(result));
      return result;
    })
    .catch((error) => {
      console.log("Error in Post request of Delpro device created");
      console.error(error); // handle error
    });
}
