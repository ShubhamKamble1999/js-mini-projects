function formateStringAuth(string) {
  var regex = /\((?=.*:)([^)]+)\)/;
  // var regex = /\((?=.*:)([A-Z0-9:]+)\)/;
  if (regex.test(string)) {
    var result = string.replace(regex, "").trim();
    return result;
  }
  return string;
}

const fetchData = async () => {
  const response = await fetch("http://localhost:3000/data");
  const jsonData = await response.json();
  return jsonData;
};

// function populateTransformArray(inputData) {
//   var transformedData = {
//     name: "Root",
//     children: [],
//   };

//   var companyNodes = {};
//   inputData.forEach(function (item) {
//     var node = {
//       name: formateStringAuth(item.Company_Name),
//       children: [],
//       value: 0,
//       level: item.Level,
//     };
//     if (item.Level === "T1") {
//       let node = {
//         name: formateStringAuth(item.Company_Name),
//         children: [],
//         value: 0,
//         level: item.Level,
//       };
//       companyNodes[formateStringAuth(item.Company_Name)] = node;
//     } else {
//       companyNodes[formateStringAuth(item.Company_Name)] = node;
//     }
//   });
//   inputData.forEach(function (item) {
//     const parentCompanyName = formateStringAuth(item.Parent);
//     const companyName = formateStringAuth(item.Company_Name);
//     if (companyNodes[companyName]) {
//       if (item.Parent === "") {
//         transformedData.children.push(companyNodes[companyName]);
//       } else {
//         if (companyNodes[parentCompanyName]) {
//           companyNodes[parentCompanyName].children.push(
//             companyNodes[companyName]
//           );
//           companyNodes[parentCompanyName].value += 1;
//         } else {
//         }
//       }
//     }
//   });
//   transformedData.children.push(companyNodes);

//   return transformedData;
// }

function populateTransformArray(inputData) {
  var transformedData = {
    name: "Root",
    children: [],
  };

  var companyNodes = {};

  inputData.forEach(function (item) {
    var companyName = formateStringAuth(item.Company_Name);
    var parentNode = companyNodes[formateStringAuth(item.Parent)];

    var node = {
      name: companyName,
      children: [],
      value: 0,
      level: item.Level,
    };

    companyNodes[companyName] = node;

    if (parentNode) {
      parentNode.children.push(node);
      parentNode.value += 1;
    } else if (!item.Parent) {
      transformedData.children.push(node);
    }
  });

  return transformedData;
}

async function getData() {
  let data = await fetchData();
  var chartData = populateTransformArray(data);
  console.log("CHART --> ", JSON.stringify(chartData.children[0], null, 2));
}

getData();
