const test = (age) => {
  const name = "Mostafa";
  const fullFamily = `${name} Dadfar`;
  console.log(name);
  return function (numberPhone) {
    console.log(
      `My name is ${fullFamily}, my age is ${age}, numberPhone is ${numberPhone}`
    );
  };
};

const funcTest = test("28");
funcTest("09905274776");
