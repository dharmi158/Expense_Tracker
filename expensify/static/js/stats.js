const graphe = document.querySelector("#graph");
let graphval = "pie";
const monthid = document.querySelector("#months");
let monthval = 6;

const renderchart = (data, labels, type) => {
  const ctx = document.getElementById("myChart").getContext("2d");

  var myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: `display Expense`,
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(128,0,128,0.2)",
            "rgba(0,128,128,0.2)",
            "rgba(0,255, 0 ,0.2)",
            "rgba(255, 255, 102,0.2)",
            "rgba(153, 153, 102,0.2)",
            "rgba(153, 51, 255,0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(128,0,128,1)",
            "rgba(0,128,128,1)",
            "rgba(0,255, 0 ,1)",
            "rgba(255, 255, 102,1)",
            "rgba(153, 153, 102,1)",
            "rgba(153, 51, 255,1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: true,
        position: "right",
        labels: {
          fontColor: "#fff",
        },
      },
      title: {
        display: true,
        text: "Expense  Distribution ",
        fontSize: 25,
        fontColor: "#fff",
      },
    },
  });

  if (myChart == undefined) myChart.destroy();
};
monthid.addEventListener("change", (e) => {
  monthval = e.target.value;
  const getCharData = () => {
    console.log("fetching ");
    fetch("/expense_category_summary", {
      body: JSON.stringify({ month: monthval }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((results) => {
        console.log("results: ", results);
        const category_data = results.expense_category_data;
        const [labels, data] = [
          Object.keys(category_data),
          Object.values(category_data),
        ];
        renderchart(data, labels, graphval);
      });
  };
  console.log(monthval);
  document.onload = getCharData();
});
graphe.addEventListener("change", (e) => {
  graphval = e.target.value;
  const getCharData = () => {
    console.log("fetching ");
    fetch("/expense_category_summary", {
      body: JSON.stringify({ month: monthval }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((results) => {
        console.log("results: ", results);
        const category_data = results.expense_category_data;
        const [labels, data] = [
          Object.keys(category_data),
          Object.values(category_data),
        ];
        renderchart(data, labels, graphval);
      });
  };
  console.log(monthval);
  document.onload = getCharData();
});

categoryid = document.querySelector("#category");
categoryid.addEventListener("change", (e) => {
  let categoryval = e.target.value;
  console.log(categoryval);

  const getCharData = () => {
    console.log("fetching one category sum");
    fetch("/expense_one_category_summary", {
      body: JSON.stringify({ categoryv: categoryval, month: monthval }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((results) => {
        console.log("results: ", results);
        graphval = "line";
        const category_data = results.expense_category_data;
        const [labels, data] = [
          Object.keys(category_data),
          Object.values(category_data),
        ];
        renderchart(data, labels, graphval);
      });
  };

  document.onload = getCharData();
});

const getCharData = () => {
  console.log("fetching ");
  fetch("/expense_category_summary")
    .then((res) => res.json())
    .then((results) => {
      console.log("results: ", results);
      const category_data = results.expense_category_data;
      const [labels, data] = [
        Object.keys(category_data),
        Object.values(category_data),
      ];
      renderchart(data, labels, graphval);
    });
};
document.onload = getCharData();
