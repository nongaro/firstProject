module.exports = async function (context, req) {
  let tableData = [
    {
      id: "1",
      name: "AA",
      age: 1,
    },
    {
      id: "2",
      name: "BB",
      age: 2,
    },
    {
      id: "3",
      name: "CC",
      age: 3,
    },
  ];

  context.res.json({
    body: tableData,
  });

  //   context.res.json({
  //     text: "Hello from the API",
  //   });
};
