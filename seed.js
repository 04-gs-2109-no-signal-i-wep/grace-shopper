const { green, red } = require('chalk');
const {
  db,
  models: { User, Order, Product },
} = require('./server/db');

const users = [
  {
    email_address: 'frankie.muniz@gmail.com',
    password: '123franfran',
    first_name: 'Frankie',
    last_name: 'Muniz',
    address_line_1: '1325 Cooper Street',
    city: 'Los Angeles',
    country: 'USA',
  },
  {
    email_address: 'jennifer.aniston@gmail.com',
    password: '123jenn',
    first_name: 'Jennifer',
    last_name: 'Aniston',
    address_line_1: '1256 Madison Avenue',
    city: 'Denver',
    country: 'USA',
  },
  {
    email_address: 'ben.affleck@gmail.com',
    password: '123benny',
    first_name: 'Ben',
    last_name: 'Affleck',
    is_admin: true,
    address_line_1: '1560 Hollywood Street',
    city: 'San Francisco',
    country: 'USA',
  },
  {
    email_address: 'gigi.hadid@gmail.com',
    password: '123gigi',
    first_name: 'Gigi',
    last_name: 'Hadid',
    address_line_1: '123 Main Street',
    city: 'Los Angeles',
    country: 'USA',
  },

  {
    email_address: 'jlo@gmail.com',
    password: '123jlo',
    first_name: 'Jennifer',
    last_name: 'Lopez',
    is_admin: true,
    address_line_1: '246 Pole Street',
    city: 'Los Angeles',
    country: 'USA',
  },
];

const products = [
  {
    name: 'Midcentury Modern',
    price: 10000,
    description: 'Super modern but not too modern furniture',
    color: 'Orange',
    size: 'Medium',
    inventory_quantity: 5,
    image_url: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1181&q=80',
  },
  {
    name: 'Art Deco',
    price: 9000,
    description: 'Super artsy furniture',
    color: 'Red',
    size: 'Small',
    inventory_quantity: 4,
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=958&q=80',
  },
  {
    name: 'Bohemian',
    price: 10000,
    description: 'Super boho furniture',
    color: 'Yellow',
    size: 'Large',
    inventory_quantity: 6,
    image_url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Eclectic',
    price: 10000,
    description: 'Super diverse furniture',
    color: 'Teal',
    size: 'Large',
    inventory_quantity: 7,
    image_url: 'https://images.unsplash.com/photo-1593853963555-013dbf33c060?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZWNsZWN0aWMlMjByb29tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
  },
  {
    name: 'Post-Modern',
    price: 10000,
    description: 'Super futuristic furniture',
    color: 'Black',
    size: 'Small',
    inventory_quantity: 6,
    image_url: 'https://images.unsplash.com/photo-1464075208758-5623fb69e13b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Rustic',
    price: 20000,
    description:
      'Want to bring the cabin-in-the-woods vibe to your apartment? This is the set for you. Includes three chairs, one couch, a coffee table and red rug',
    inventory_quantity: 6,
    image_url: 'https://images.unsplash.com/photo-1519643381401-22c77e60520e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1173&q=80',
  },
];

const orders = [
  {
    order_total: 20000,
    total_quantity: 2,
    date_placed: '10-21-2021',
  },
  {
    order_total: 50000,
    total_quantity: 5,
    is_completed: false,
    date_placed: '05-21-2021',
  },
  {
    order_total: 7500,
    total_quantity: 1,
    is_completed: true,
    date_placed: '04-21-2021',
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    // seed your database here!
    const userModels = await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );

    const productModels = await Promise.all(
      products.map((product) => {
        return Product.create(product);
      })
    );

    const orderModels = await Promise.all(
      orders.map((order) => {
        return Order.create(order);
      })
    );

    const [frankie, aniston, ben] = userModels;
    await frankie.addOrders([orderModels[0]]);
    await aniston.addOrders([orderModels[1]]);
    await ben.addOrders([orderModels[2]]);

    const [order1, order2, order3] = orderModels;
    await order1.addProducts([productModels[0], productModels[1]]);
    await order2.addProducts([productModels[2]], [productModels[3]]);
    await order3.addProducts([productModels[4]], [productModels[5]]);

    console.log(green('Seeding success!'));
    db.close();
  } catch (err) {
    console.log(red('Error seeding database:', err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Error seeding database!'));
      console.error(err);
      db.close();
    });
}
