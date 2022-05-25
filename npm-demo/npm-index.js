const _ = require("underscore");
const axios = require("axios");
const result = _.contains([1, 2, 3], 3);
console.log(result);

if (result) {
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
    console.log(JSON.stringify(resp));
  } catch (err) {
    console.log("Error in Post request of Delpro device created");
    console.error(err);
  }
}
