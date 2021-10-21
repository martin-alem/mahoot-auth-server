import qs from "qs";
import axios from "axios";

function fetch(url, method, option = { data: {}, headers: { accept: "application/json" } }) {
  return new Promise((resolve, reject) => {
    let data = {};
    if (option["content-type"] === "application/x-www-form-urlencoded") {
      data = qs.stringify(option["data"]);
    } else {
      data = JSON.stringify(option["data"]);
    }

    axios({
      method: method,
      url: url,
      data: data,
      headers: option["headers"],
    })
      .then(resolve)
      .catch(reject);
  });
}

export default fetch;
