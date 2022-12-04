const convertButton = document.getElementById("submit");
convertButton?.addEventListener("click", function handleClick(event) {
  prepareURL();
});

type GetConversionResponse = {
  info: {};
  query: {};
  result: number;
  success: boolean;
};

function prepareURL() {
  const from = (<HTMLInputElement>document.getElementById("from")).value;
  const to = (<HTMLInputElement>document.getElementById("to")).value;
  const amount = (<HTMLInputElement>document.getElementById("amount")).value;

  const myHeaders = new Headers();
  myHeaders.append("apikey", "vBNk782zbpqvBReMA3lzIKdZeGupuLgr");
  const url = new URL(
    `https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`
  );

  console.log(url);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  getConversion(url, requestOptions);
}

async function getConversion(url: URL, requestOptions: Object) {
  try {
    // 👇️ const response: Response
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as GetConversionResponse;

    console.log("result is: ", JSON.stringify(result, null, 4));

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

// { SAMPLE RESP
//   "info": {
//     "quote": 0.644969,
//     "timestamp": 1670130482
//   },
//   "query": {
//     "amount": 5,
//     "from": "AUD",
//     "to": "EUR"
//   },
//   "result": 3.224845,
//   "success": true
// }
