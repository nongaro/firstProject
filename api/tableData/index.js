module.exports = async function (context, req) {
  // console.log("Stampo qualcosa");
  // //console.log(req);
  // console.log(context);
  // console.log("Fine");
  let data = generateData();

  try {
    if (req.method === "GET") {
      const fromDate = req.query.fromDate || (req.body && req.body.fromDate);
      const toDate = req.query.toDate || (req.body && req.body.toDate);

      console.log(!fromDate || !toDate);

      if (fromDate && toDate) {
        data = filteredData(data, new Date(fromDate), new Date(toDate));
      }
    } else if (req.method === "POST") {
      data.push(context.req.body);
    }

    context.res = {
      body: data,
      contentType: "application/json",
    };
  } catch (err) {
    context.res = {
      status: 500,
    };
  }
};

function generateData() {
  let data = [];
  let i;
  for (i = 0; i < 5; i++) {
    data.push({
      id: i.toString(),
      name: "Name " + i,
      age: i * i,
      date: new Date(2022, i, 1),
    });
  }
  return data;
}

function filteredData(data, fromDate, toDate) {
  let filteredObj = [];

  data.forEach((x) => {
    if (
      x.date.getTime() >= fromDate.getTime() &&
      x.date.getTime() <= toDate.getTime()
    ) {
      filteredObj.push(x);
    }
  });
  return filteredObj;
}
