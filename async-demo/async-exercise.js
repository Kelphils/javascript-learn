const notifyCustomer = async () => {
  try {
    const customer = await getCustomer(5);
    console.log("customer", customer);
    if (customer.isGold) {
      const movies = await getTopMovies();
      console.log("Top Movies", movies);
      await sendEmail(customer.email, movies);
      console.log("Email sent");
    }
  } catch (err) {
    console.log(err.message);
  }
};

notifyCustomer();

async function getCustomer(id) {
  return new Promise((resolve, rejct) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: "Kelvin Phillip",
        isGold: true,
        email: "async@learnnode.com",
      });
    }, 4000);
  });
}

async function getTopMovies() {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log("Getting movies from database....");
      resolve(["Movie1", "Movie2"]); // pending => resolved or rejected
    }, 4000)
  );
}

async function sendEmail(email, movies) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      //   console.log("Email sent....");
      resolve();
    }, 4000)
  );
}
