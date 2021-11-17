const { green, red } = require('chalk');
const {
  db,
  models: { User, Order, Product },
} = require('./server/db');

const users = [
  {
    email_address: 'yilla@hearth.com',
    password: '123',
    first_name: 'yilla',
    last_name: 'chen',
    is_admin: true,
    address_line_1: '246 Test Street',
    city: 'Brooklyn',
    country: 'USA',
  },
  {
    email_address: 'caroline@hearth.com',
    password: '123',
    first_name: 'caroline',
    last_name: 'spiezio',
    is_admin: true,
    address_line_1: '246 Test Street',
    city: 'Brooklyn',
    country: 'USA',
  },
  {
    email_address: 'maxiel@hearth.com',
    password: '123',
    first_name: 'maxiel',
    last_name: 'mrvaljevic',
    is_admin: true,
    address_line_1: '246 Test Street',
    city: 'Brooklyn',
    country: 'USA',
  },
  {
    email_address: 'jean@hearth.com',
    password: '123',
    first_name: 'jean',
    last_name: 'chow',
    is_admin: true,
    address_line_1: '246 Test Street',
    city: 'Seattle',
    country: 'USA',
  },
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
    name: 'Midcentury Modern Den',
    price: 10000,
    description: 'Super modern but not too modern furniture',
    color: 'Orange',
    size: 'Medium',
    inventory_quantity: 5,
    featured: true,
    image_url: '/images/midcent-modern.jpeg',
  },
  {
    name: 'Art Deco Dining Room',
    price: 9000,
    description: 'Bold contrasting geometric patterns, textiles and jewel-toned colors for the Roaring 20s lover. This dining room set includes a plush velvet dining bench, accent chairs, gold & brass dining table for ultimate entertaining.',
    color: 'Red',
    size: 'Small',
    inventory_quantity: 4,
    featured: true,
    image_url: '/images/art-deco.jpeg',
  },
  {
    name: 'Bohemian Den',
    price: 10000,
    description:
      'A California dream for those who love warm tones with pops of complementary colors. Rich textiles are mixed with artisanal basketweave patterns.',
    color: 'Yellow',
    size: 'Large',
    inventory_quantity: 6,
    featured: true,
    image_url: '/images/bohemian.jpeg',
  },
  {
    name: 'Eclectic Den',
    price: 10000,
    description: 'Super diverse furniture',
    color: 'Teal',
    size: 'Large',
    inventory_quantity: 7,
    featured: true,
    image_url: '/images/eclectic.jpeg',
  },
  {
    name: 'Post-Modern Den',
    price: 10000,
    description: 'Super futuristic furniture',
    color: 'Black',
    size: 'Small',
    inventory_quantity: 6,
    image_url: '/images/post-mod.png',
  },
  {
    name: 'Rustic Den',
    price: 20000,
    description:
      'Want to bring the cabin-in-the-woods vibe to your apartment? This is the set for you. Includes three chairs, one couch, a coffee table and red rug',
    inventory_quantity: 6,
    image_url: '/images/rustic.jpeg',
  },
  {
    name: 'Organic Modern Den',
    price: 20000,
    description:
      'Minimalistic and contemporary, this collection is for the French art house lovers. Luscious textures contrast subtle pops of color with pastoral organic shapes.',
    inventory_quantity: 6,
    image_url: '/images/organic-modern.jpeg',
  },{
    "name": "Marissa",
    "price": 11958,
    "description": "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Goldenrod",
    "size": "2XL",
    "inventory_quantity": 74
  }, {
    "name": "Laura",
    "price": 17890,
    "description": "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Blue",
    "size": "L",
    "inventory_quantity": 4
  }, {
    "name": "Arny",
    "price": 28834,
    "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Blue",
    "size": "S",
    "inventory_quantity": 69
  }, {
    "name": "Fergus",
    "price": 12506,
    "description": "Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Green",
    "size": "XL",
    "inventory_quantity": 93
  }, {
    "name": "Emmalynn",
    "price": 27476,
    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Maroon",
    "size": "XS",
    "inventory_quantity": 59
  }, {
    "name": "Nerty",
    "price": 23804,
    "description": "In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Orange",
    "size": "L",
    "inventory_quantity": 62
  }, {
    "name": "Andre",
    "price": 14655,
    "description": "Etiam justo.",
    "image_url": "/images/midcent-modern.jpeg",
    "featured": "false",
    "color": "Maroon",
    "size": "S",
    "inventory_quantity": 90
  }, {
    "name": "Harvey",
    "price": 18500,
    "description": "Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Indigo",
    "size": "2XL",
    "inventory_quantity": 71
  }, {
    "name": "James",
    "price": 21116,
    "description": "Suspendisse potenti.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Puce",
    "size": "S",
    "inventory_quantity": 4
  }, {
    "name": "Vick",
    "price": 25445,
    "description": "Integer ac leo.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Orange",
    "size": "S",
    "inventory_quantity": 24
  }, {
    "name": "Jermain",
    "price": 19573,
    "description": "Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Crimson",
    "size": "2XL",
    "inventory_quantity": 1
  }, {
    "name": "Ronalda",
    "price": 12258,
    "description": "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.",
    "image_url": "/images/eclectic.jpeg",
    "featured": "false",
    "color": "Green",
    "size": "XL",
    "inventory_quantity": 77
  }, {
    "name": "Cindie",
    "price": 16157,
    "description": "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Turquoise",
    "size": "L",
    "inventory_quantity": 14
  }, {
    "name": "Saxe",
    "price": 25987,
    "description": "Nulla ac enim.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Fuscia",
    "size": "2XL",
    "inventory_quantity": 42
  }, {
    "name": "Rubie",
    "price": 13134,
    "description": "Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Aquamarine",
    "size": "L",
    "inventory_quantity": 90
  }, {
    "name": "Pepillo",
    "price": 27392,
    "description": "Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Turquoise",
    "size": "S",
    "inventory_quantity": 74
  }, {
    "name": "Siusan",
    "price": 28704,
    "description": "Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Fuscia",
    "size": "3XL",
    "inventory_quantity": 65
  }, {
    "name": "Brynna",
    "price": 19984,
    "description": "Duis consequat dui nec nisi volutpat eleifend.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Crimson",
    "size": "2XL",
    "inventory_quantity": 41
  }, {
    "name": "Natalina",
    "price": 25991,
    "description": "Morbi quis tortor id nulla ultrices aliquet.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Purple",
    "size": "2XL",
    "inventory_quantity": 80
  }, {
    "name": "Dalila",
    "price": 24861,
    "description": "Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.",
    "image_url": "/images/midcent-modern.jpeg",
    "featured": "false",
    "color": "Red",
    "size": "2XL",
    "inventory_quantity": 99
  }, {
    "name": "Pieter",
    "price": 22400,
    "description": "Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Purple",
    "size": "S",
    "inventory_quantity": 44
  }, {
    "name": "Naoma",
    "price": 25223,
    "description": "Duis ac nibh.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Aquamarine",
    "size": "XL",
    "inventory_quantity": 16
  }, {
    "name": "Donna",
    "price": 29117,
    "description": "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
    "image_url": "/images/eclectic.jpeg",
    "featured": "false",
    "color": "Orange",
    "size": "M",
    "inventory_quantity": 56
  }, {
    "name": "Dannye",
    "price": 22920,
    "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Puce",
    "size": "XS",
    "inventory_quantity": 97
  }, {
    "name": "Hunter",
    "price": 29551,
    "description": "In sagittis dui vel nisl.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Maroon",
    "size": "M",
    "inventory_quantity": 10
  }, {
    "name": "Claudell",
    "price": 24117,
    "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Puce",
    "size": "M",
    "inventory_quantity": 74
  }, {
    "name": "Mace",
    "price": 21431,
    "description": "Donec vitae nisi.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Purple",
    "size": "S",
    "inventory_quantity": 77
  }, {
    "name": "Letisha",
    "price": 14211,
    "description": "Integer ac neque. Duis bibendum.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Red",
    "size": "M",
    "inventory_quantity": 71
  }, {
    "name": "Cleo",
    "price": 25293,
    "description": "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Orange",
    "size": "2XL",
    "inventory_quantity": 89
  }, {
    "name": "Trudi",
    "price": 17734,
    "description": "Ut tellus. Nulla ut erat id mauris vulputate elementum.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Violet",
    "size": "L",
    "inventory_quantity": 83
  }, {
    "name": "Pate",
    "price": 23370,
    "description": "Nulla nisl. Nunc nisl.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Red",
    "size": "2XL",
    "inventory_quantity": 38
  }, {
    "name": "Gustie",
    "price": 24778,
    "description": "Aenean sit amet justo.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Red",
    "size": "L",
    "inventory_quantity": 97
  }, {
    "name": "Issie",
    "price": 28097,
    "description": "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    "image_url": "/images/eclectic.jpeg",
    "featured": "false",
    "color": "Orange",
    "size": "M",
    "inventory_quantity": 7
  }, {
    "name": "Konstanze",
    "price": 27033,
    "description": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    "image_url": "/images/eclectic.jpeg",
    "featured": "false",
    "color": "Puce",
    "size": "2XL",
    "inventory_quantity": 18
  }, {
    "name": "Sigfrid",
    "price": 19591,
    "description": "Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Mauv",
    "size": "L",
    "inventory_quantity": 83
  }, {
    "name": "Abran",
    "price": 25177,
    "description": "Ut at dolor quis odio consequat varius. Integer ac leo.",
    "image_url": "/images/eclectic.jpeg",
    "featured": "false",
    "color": "Mauv",
    "size": "L",
    "inventory_quantity": 56
  }, {
    "name": "Arlyn",
    "price": 27757,
    "description": "Suspendisse accumsan tortor quis turpis. Sed ante.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Purple",
    "size": "3XL",
    "inventory_quantity": 69
  }, {
    "name": "Albert",
    "price": 12669,
    "description": "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.",
    "image_url": "/images/eclectic.jpeg",
    "featured": "false",
    "color": "Blue",
    "size": "L",
    "inventory_quantity": 99
  }, {
    "name": "Felicle",
    "price": 12944,
    "description": "Maecenas pulvinar lobortis est. Phasellus sit amet erat.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Mauv",
    "size": "2XL",
    "inventory_quantity": 60
  }, {
    "name": "Tedra",
    "price": 24438,
    "description": "Integer ac leo.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Khaki",
    "size": "S",
    "inventory_quantity": 76
  }, {
    "name": "Korie",
    "price": 24735,
    "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius.",
    "image_url": "/images/midcent-modern.jpeg",
    "featured": "false",
    "color": "Turquoise",
    "size": "2XL",
    "inventory_quantity": 50
  }, {
    "name": "Natale",
    "price": 13284,
    "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Indigo",
    "size": "M",
    "inventory_quantity": 6
  }, {
    "name": "Niven",
    "price": 20980,
    "description": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Blue",
    "size": "3XL",
    "inventory_quantity": 77
  }, {
    "name": "Jeddy",
    "price": 16086,
    "description": "Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
    "image_url": "/images/eclectic.jpeg",
    "featured": "false",
    "color": "Orange",
    "size": "XL",
    "inventory_quantity": 29
  }, {
    "name": "Joly",
    "price": 18108,
    "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    "image_url": "/images/eclectic.jpeg",
    "featured": "false",
    "color": "Crimson",
    "size": "2XL",
    "inventory_quantity": 53
  }, {
    "name": "Levon",
    "price": 20299,
    "description": "Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Aquamarine",
    "size": "M",
    "inventory_quantity": 67
  }, {
    "name": "Shaina",
    "price": 22981,
    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Turquoise",
    "size": "S",
    "inventory_quantity": 17
  }, {
    "name": "Kial",
    "price": 19051,
    "description": "Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Turquoise",
    "size": "L",
    "inventory_quantity": 99
  }, {
    "name": "Audre",
    "price": 16432,
    "description": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Aquamarine",
    "size": "XS",
    "inventory_quantity": 54
  }, {
    "name": "Merilyn",
    "price": 14886,
    "description": "Nunc purus.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Yellow",
    "size": "2XL",
    "inventory_quantity": 92
  }, {
    "name": "Gerik",
    "price": 20135,
    "description": "Vivamus in felis eu sapien cursus vestibulum.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Yellow",
    "size": "2XL",
    "inventory_quantity": 91
  }, {
    "name": "Reider",
    "price": 29754,
    "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Pink",
    "size": "3XL",
    "inventory_quantity": 84
  }, {
    "name": "Marthena",
    "price": 20484,
    "description": "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Puce",
    "size": "2XL",
    "inventory_quantity": 47
  }, {
    "name": "Charo",
    "price": 26844,
    "description": "Duis mattis egestas metus.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Violet",
    "size": "XL",
    "inventory_quantity": 56
  }, {
    "name": "Paddy",
    "price": 18833,
    "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    "image_url": "/images/eclectic.jpeg",
    "featured": "false",
    "color": "Maroon",
    "size": "M",
    "inventory_quantity": 12
  }, {
    "name": "Celestia",
    "price": 12863,
    "description": "Aenean lectus.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Red",
    "size": "3XL",
    "inventory_quantity": 50
  }, {
    "name": "Elmer",
    "price": 13204,
    "description": "Aenean auctor gravida sem.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Green",
    "size": "M",
    "inventory_quantity": 56
  }, {
    "name": "Chere",
    "price": 15019,
    "description": "In eleifend quam a odio.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Teal",
    "size": "L",
    "inventory_quantity": 62
  }, {
    "name": "Louisa",
    "price": 16141,
    "description": "Curabitur convallis.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Khaki",
    "size": "XL",
    "inventory_quantity": 39
  }, {
    "name": "Roana",
    "price": 27298,
    "description": "Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.",
    "image_url": "/images/midcent-modern.jpeg",
    "featured": "false",
    "color": "Orange",
    "size": "S",
    "inventory_quantity": 74
  }, {
    "name": "Noel",
    "price": 19972,
    "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Blue",
    "size": "L",
    "inventory_quantity": 72
  }, {
    "name": "Jeffry",
    "price": 25307,
    "description": "Suspendisse ornare consequat lectus.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Turquoise",
    "size": "S",
    "inventory_quantity": 35
  }, {
    "name": "Vale",
    "price": 28077,
    "description": "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Purple",
    "size": "XL",
    "inventory_quantity": 57
  }, {
    "name": "Anderea",
    "price": 21233,
    "description": "Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.",
    "image_url": "/images/eclectic.jpeg",
    "featured": "false",
    "color": "Orange",
    "size": "XL",
    "inventory_quantity": 7
  }, {
    "name": "Sophi",
    "price": 12252,
    "description": "Integer ac leo.",
    "image_url": "/images/eclectic.jpeg",
    "featured": "false",
    "color": "Red",
    "size": "XS",
    "inventory_quantity": 70
  }, {
    "name": "Jessamyn",
    "price": 11269,
    "description": "Donec dapibus.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Turquoise",
    "size": "3XL",
    "inventory_quantity": 10
  }, {
    "name": "Ennis",
    "price": 29906,
    "description": "Aliquam non mauris.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Red",
    "size": "XS",
    "inventory_quantity": 71
  }, {
    "name": "Emlen",
    "price": 13180,
    "description": "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Maroon",
    "size": "L",
    "inventory_quantity": 7
  }, {
    "name": "Samson",
    "price": 29452,
    "description": "Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Green",
    "size": "2XL",
    "inventory_quantity": 50
  }, {
    "name": "Ardyce",
    "price": 15942,
    "description": "Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Turquoise",
    "size": "3XL",
    "inventory_quantity": 99
  }, {
    "name": "Meir",
    "price": 17295,
    "description": "Phasellus sit amet erat. Nulla tempus.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Khaki",
    "size": "M",
    "inventory_quantity": 64
  }, {
    "name": "Charlena",
    "price": 21099,
    "description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Violet",
    "size": "3XL",
    "inventory_quantity": 92
  }, {
    "name": "Maggi",
    "price": 27078,
    "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.",
    "image_url": "/images/midcent-modern.jpeg",
    "featured": "false",
    "color": "Teal",
    "size": "XL",
    "inventory_quantity": 91
  }, {
    "name": "Ethelred",
    "price": 26446,
    "description": "In eleifend quam a odio.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Violet",
    "size": "L",
    "inventory_quantity": 38
  }, {
    "name": "Ruperta",
    "price": 25093,
    "description": "Vivamus tortor. Duis mattis egestas metus. Aenean fermentum.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Puce",
    "size": "XS",
    "inventory_quantity": 87
  }, {
    "name": "Ruy",
    "price": 20694,
    "description": "Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Green",
    "size": "XS",
    "inventory_quantity": 53
  }, {
    "name": "Emmalee",
    "price": 10467,
    "description": "Curabitur at ipsum ac tellus semper interdum.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Goldenrod",
    "size": "2XL",
    "inventory_quantity": 37
  }, {
    "name": "Thorvald",
    "price": 14862,
    "description": "Vivamus tortor. Duis mattis egestas metus.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Indigo",
    "size": "M",
    "inventory_quantity": 72
  }, {
    "name": "Persis",
    "price": 10592,
    "description": "Phasellus in felis.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Crimson",
    "size": "S",
    "inventory_quantity": 64
  }, {
    "name": "Chandal",
    "price": 14980,
    "description": "Nulla tempus.",
    "image_url": "/images/rustic.jpeg",
    "featured": "false",
    "color": "Red",
    "size": "XS",
    "inventory_quantity": 84
  }, {
    "name": "Raviv",
    "price": 19155,
    "description": "In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Violet",
    "size": "3XL",
    "inventory_quantity": 74
  }, {
    "name": "Grantham",
    "price": 26391,
    "description": "Nunc rhoncus dui vel sem. Sed sagittis.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Crimson",
    "size": "XL",
    "inventory_quantity": 65
  }, {
    "name": "Bowie",
    "price": 14441,
    "description": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Maroon",
    "size": "3XL",
    "inventory_quantity": 36
  }, {
    "name": "Daphene",
    "price": 18997,
    "description": "Etiam justo.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Indigo",
    "size": "S",
    "inventory_quantity": 68
  }, {
    "name": "Jaclin",
    "price": 25532,
    "description": "Donec dapibus. Duis at velit eu est congue elementum.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Turquoise",
    "size": "S",
    "inventory_quantity": 39
  }, {
    "name": "Colas",
    "price": 23617,
    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Yellow",
    "size": "XL",
    "inventory_quantity": 60
  }, {
    "name": "Annelise",
    "price": 25491,
    "description": "Vestibulum ac est lacinia nisi venenatis tristique.",
    "image_url": "/images/midcent-modern.jpeg",
    "featured": "false",
    "color": "Mauv",
    "size": "3XL",
    "inventory_quantity": 2
  }, {
    "name": "Horst",
    "price": 24417,
    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.",
    "image_url": "/images/midcent-modern.jpeg",
    "featured": "false",
    "color": "Aquamarine",
    "size": "M",
    "inventory_quantity": 77
  }, {
    "name": "Wye",
    "price": 29611,
    "description": "Nullam sit amet turpis elementum ligula vehicula consequat.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Red",
    "size": "S",
    "inventory_quantity": 65
  }, {
    "name": "Christian",
    "price": 21772,
    "description": "Phasellus sit amet erat. Nulla tempus.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Khaki",
    "size": "XS",
    "inventory_quantity": 53
  }, {
    "name": "Kordula",
    "price": 18731,
    "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    "image_url": "/images/bohemian.jpeg",
    "featured": "false",
    "color": "Maroon",
    "size": "XL",
    "inventory_quantity": 88
  }, {
    "name": "Thor",
    "price": 26810,
    "description": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    "image_url": "/images/midcent-modern.jpeg",
    "featured": "false",
    "color": "Red",
    "size": "2XL",
    "inventory_quantity": 47
  }, {
    "name": "Aurthur",
    "price": 19394,
    "description": "In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Red",
    "size": "M",
    "inventory_quantity": 56
  }, {
    "name": "Adah",
    "price": 10243,
    "description": "Sed ante.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Indigo",
    "size": "3XL",
    "inventory_quantity": 14
  }, {
    "name": "Ellissa",
    "price": 12093,
    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Mauv",
    "size": "L",
    "inventory_quantity": 92
  }, {
    "name": "Meghan",
    "price": 28854,
    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.",
    "image_url": "/images/art-deco.jpeg",
    "featured": "false",
    "color": "Pink",
    "size": "L",
    "inventory_quantity": 51
  }, {
    "name": "Amelia",
    "price": 16654,
    "description": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
    "image_url": "/images/eclectic.jpeg",
    "featured": "false",
    "color": "Crimson",
    "size": "S",
    "inventory_quantity": 85
  }, {
    "name": "Lammond",
    "price": 18468,
    "description": "Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Puce",
    "size": "M",
    "inventory_quantity": 66
  }, {
    "name": "Brina",
    "price": 27604,
    "description": "Donec semper sapien a libero. Nam dui.",
    "image_url": "/images/post-mod.png",
    "featured": "false",
    "color": "Teal",
    "size": "S",
    "inventory_quantity": 11
  }, {
    "name": "Adham",
    "price": 23275,
    "description": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.",
    "image_url": "/images/organic-modern.jpeg",
    "featured": "false",
    "color": "Green",
    "size": "XS",
    "inventory_quantity": 89
  }
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
