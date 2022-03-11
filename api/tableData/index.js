module.exports = async function (context, req) {
  console.log("Stampo qualcosa");
  //console.log(req);
  console.log(context);
  console.log("Fine");

  let data = [];
  let i;
  for (i = 0; i < 12; i++) {
    data.push({
      id: i.toString(),
      name: "Name " + i,
      age: i * i,
      date: new Date(2022, i, 1),
    });
  }

  console.log(" ");
  console.log(" ");
  console.log(context.req.query.fromDate);
  console.log(context.req.query.toDate);

  let fromDate = new Date(context.req.query.fromDate);
  let toDate = new Date(context.req.query.toDate);

  let filteredObj = [];

  data.forEach((x) => {
    // console.log("elem", x.date);
    // console.log("query", fromDate);
    // console.log("elem month", x.date.getMonth());
    // console.log("query month", fromDate.getMonth());
    // console.log(x.date.getTime() > fromDate.getTime());
    // console.log(" ");
    if (
      x.date.getTime() >= fromDate.getTime() &&
      x.date.getTime() <= toDate.getTime()
    ) {
      filteredObj.push(x);
    }
  });

  context.res.headers = { "Content-Type": "application/json" };
  context.res.body = { success: true, data: filteredObj };
};
