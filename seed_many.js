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
    "name": "Ferrell",
    "price": 28607,
    "description": "Aliquam sit amet diam in magna bibendum imperdiet.",
    "image_url": "http://dummyimage.com/239x100.png/dddddd/000000",
    "featured": "false",
    "color": "Indigo",
    "size": "M",
    "inventory_quantity": 71
  }, {
    "name": "Herrick",
    "price": 26574,
    "description": "In quis justo.",
    "image_url": "http://dummyimage.com/167x100.png/dddddd/000000",
    "featured": "false",
    "color": "Pink",
    "size": "3XL",
    "inventory_quantity": 6
  }, {
    "name": "Emylee",
    "price": 11255,
    "description": "Integer non velit.",
    "image_url": "http://dummyimage.com/246x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Mauv",
    "size": "L",
    "inventory_quantity": 61
  }, {
    "name": "Marika",
    "price": 14927,
    "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    "image_url": "http://dummyimage.com/212x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Teal",
    "size": "XL",
    "inventory_quantity": 64
  }, {
    "name": "Alwin",
    "price": 28081,
    "description": "Duis at velit eu est congue elementum.",
    "image_url": "http://dummyimage.com/241x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Khaki",
    "size": "M",
    "inventory_quantity": 26
  }, {
    "name": "Shelia",
    "price": 23289,
    "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    "image_url": "http://dummyimage.com/232x100.png/dddddd/000000",
    "featured": "false",
    "color": "Mauv",
    "size": "S",
    "inventory_quantity": 50
  }, {
    "name": "Gaven",
    "price": 18767,
    "description": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
    "image_url": "http://dummyimage.com/106x100.png/dddddd/000000",
    "featured": "false",
    "color": "Aquamarine",
    "size": "S",
    "inventory_quantity": 91
  }, {
    "name": "Gustavo",
    "price": 26153,
    "description": "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
    "image_url": "http://dummyimage.com/241x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Khaki",
    "size": "M",
    "inventory_quantity": 30
  }, {
    "name": "Ros",
    "price": 16151,
    "description": "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
    "image_url": "http://dummyimage.com/132x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Crimson",
    "size": "L",
    "inventory_quantity": 20
  }, {
    "name": "Jakob",
    "price": 18309,
    "description": "Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    "image_url": "http://dummyimage.com/245x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Teal",
    "size": "2XL",
    "inventory_quantity": 82
  }, {
    "name": "Trumaine",
    "price": 21628,
    "description": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.",
    "image_url": "http://dummyimage.com/121x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Maroon",
    "size": "2XL",
    "inventory_quantity": 96
  }, {
    "name": "Cordy",
    "price": 25236,
    "description": "Nunc rhoncus dui vel sem.",
    "image_url": "http://dummyimage.com/233x100.png/dddddd/000000",
    "featured": "false",
    "color": "Yellow",
    "size": "XS",
    "inventory_quantity": 15
  }, {
    "name": "Kaleb",
    "price": 23769,
    "description": "Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    "image_url": "http://dummyimage.com/183x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Teal",
    "size": "2XL",
    "inventory_quantity": 78
  }, {
    "name": "Korella",
    "price": 13604,
    "description": "Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti.",
    "image_url": "http://dummyimage.com/121x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Yellow",
    "size": "M",
    "inventory_quantity": 25
  }, {
    "name": "Hammad",
    "price": 19292,
    "description": "Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    "image_url": "http://dummyimage.com/237x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Crimson",
    "size": "M",
    "inventory_quantity": 40
  }, {
    "name": "Kurtis",
    "price": 16917,
    "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
    "image_url": "http://dummyimage.com/235x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Yellow",
    "size": "XL",
    "inventory_quantity": 58
  }, {
    "name": "Ruthy",
    "price": 14986,
    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.",
    "image_url": "http://dummyimage.com/145x100.png/dddddd/000000",
    "featured": "false",
    "color": "Khaki",
    "size": "L",
    "inventory_quantity": 34
  }, {
    "name": "Jackie",
    "price": 15782,
    "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
    "image_url": "http://dummyimage.com/184x100.png/dddddd/000000",
    "featured": "false",
    "color": "Purple",
    "size": "XS",
    "inventory_quantity": 17
  }, {
    "name": "Leena",
    "price": 20578,
    "description": "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    "image_url": "http://dummyimage.com/158x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Mauv",
    "size": "XL",
    "inventory_quantity": 96
  }, {
    "name": "Giuditta",
    "price": 23894,
    "description": "Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.",
    "image_url": "http://dummyimage.com/184x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Crimson",
    "size": "XL",
    "inventory_quantity": 59
  }, {
    "name": "Trina",
    "price": 29011,
    "description": "Suspendisse accumsan tortor quis turpis.",
    "image_url": "http://dummyimage.com/183x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Fuscia",
    "size": "2XL",
    "inventory_quantity": 29
  }, {
    "name": "Darby",
    "price": 12725,
    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    "image_url": "http://dummyimage.com/237x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Purple",
    "size": "3XL",
    "inventory_quantity": 25
  }, {
    "name": "Ambrosio",
    "price": 16840,
    "description": "Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
    "image_url": "http://dummyimage.com/157x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Red",
    "size": "XS",
    "inventory_quantity": 52
  }, {
    "name": "Idelle",
    "price": 14483,
    "description": "Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.",
    "image_url": "http://dummyimage.com/103x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Maroon",
    "size": "S",
    "inventory_quantity": 90
  }, {
    "name": "Davina",
    "price": 25460,
    "description": "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.",
    "image_url": "http://dummyimage.com/195x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Goldenrod",
    "size": "XL",
    "inventory_quantity": 87
  }, {
    "name": "Isa",
    "price": 29981,
    "description": "Donec ut dolor.",
    "image_url": "http://dummyimage.com/202x100.png/dddddd/000000",
    "featured": "false",
    "color": "Green",
    "size": "2XL",
    "inventory_quantity": 71
  }, {
    "name": "Porter",
    "price": 25875,
    "description": "Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    "image_url": "http://dummyimage.com/151x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Maroon",
    "size": "XS",
    "inventory_quantity": 93
  }, {
    "name": "Tamera",
    "price": 10506,
    "description": "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.",
    "image_url": "http://dummyimage.com/116x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Maroon",
    "size": "L",
    "inventory_quantity": 75
  }, {
    "name": "Simonne",
    "price": 17088,
    "description": "Etiam pretium iaculis justo. In hac habitasse platea dictumst.",
    "image_url": "http://dummyimage.com/190x100.png/dddddd/000000",
    "featured": "false",
    "color": "Red",
    "size": "XS",
    "inventory_quantity": 53
  }, {
    "name": "Claudell",
    "price": 10481,
    "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
    "image_url": "http://dummyimage.com/225x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Maroon",
    "size": "XL",
    "inventory_quantity": 95
  }, {
    "name": "Jenilee",
    "price": 17457,
    "description": "Phasellus id sapien in sapien iaculis congue.",
    "image_url": "http://dummyimage.com/204x100.png/dddddd/000000",
    "featured": "false",
    "color": "Pink",
    "size": "M",
    "inventory_quantity": 99
  }, {
    "name": "Sue",
    "price": 14227,
    "description": "Pellentesque viverra pede ac diam.",
    "image_url": "http://dummyimage.com/144x100.png/dddddd/000000",
    "featured": "false",
    "color": "Khaki",
    "size": "2XL",
    "inventory_quantity": 43
  }, {
    "name": "Galina",
    "price": 23684,
    "description": "Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.",
    "image_url": "http://dummyimage.com/143x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Blue",
    "size": "XS",
    "inventory_quantity": 49
  }, {
    "name": "Monti",
    "price": 28970,
    "description": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
    "image_url": "http://dummyimage.com/149x100.png/dddddd/000000",
    "featured": "false",
    "color": "Puce",
    "size": "XL",
    "inventory_quantity": 50
  }, {
    "name": "Nadeen",
    "price": 22929,
    "description": "Nulla mollis molestie lorem. Quisque ut erat.",
    "image_url": "http://dummyimage.com/216x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Pink",
    "size": "L",
    "inventory_quantity": 2
  }, {
    "name": "Adara",
    "price": 11938,
    "description": "Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    "image_url": "http://dummyimage.com/198x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Indigo",
    "size": "XL",
    "inventory_quantity": 48
  }, {
    "name": "Mordecai",
    "price": 20439,
    "description": "Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.",
    "image_url": "http://dummyimage.com/132x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Green",
    "size": "S",
    "inventory_quantity": 26
  }, {
    "name": "Jud",
    "price": 18823,
    "description": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    "image_url": "http://dummyimage.com/162x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Blue",
    "size": "XL",
    "inventory_quantity": 88
  }, {
    "name": "Gertie",
    "price": 21759,
    "description": "Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.",
    "image_url": "http://dummyimage.com/107x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Yellow",
    "size": "M",
    "inventory_quantity": 41
  }, {
    "name": "Duff",
    "price": 15493,
    "description": "Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi.",
    "image_url": "http://dummyimage.com/221x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Turquoise",
    "size": "2XL",
    "inventory_quantity": 47
  }, {
    "name": "Nevin",
    "price": 28036,
    "description": "Duis aliquam convallis nunc.",
    "image_url": "http://dummyimage.com/189x100.png/dddddd/000000",
    "featured": "false",
    "color": "Puce",
    "size": "L",
    "inventory_quantity": 29
  }, {
    "name": "Stacy",
    "price": 16336,
    "description": "Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.",
    "image_url": "http://dummyimage.com/180x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Teal",
    "size": "L",
    "inventory_quantity": 37
  }, {
    "name": "Devan",
    "price": 22503,
    "description": "Nulla facilisi. Cras non velit nec nisi vulputate nonummy.",
    "image_url": "http://dummyimage.com/103x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Mauv",
    "size": "2XL",
    "inventory_quantity": 93
  }, {
    "name": "Marcelle",
    "price": 23614,
    "description": "Maecenas rhoncus aliquam lacus.",
    "image_url": "http://dummyimage.com/231x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Yellow",
    "size": "3XL",
    "inventory_quantity": 92
  }, {
    "name": "Adi",
    "price": 27372,
    "description": "Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.",
    "image_url": "http://dummyimage.com/153x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Pink",
    "size": "L",
    "inventory_quantity": 66
  }, {
    "name": "Lydia",
    "price": 16097,
    "description": "Vivamus in felis eu sapien cursus vestibulum.",
    "image_url": "http://dummyimage.com/238x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Purple",
    "size": "XL",
    "inventory_quantity": 23
  }, {
    "name": "Gherardo",
    "price": 18322,
    "description": "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.",
    "image_url": "http://dummyimage.com/178x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Indigo",
    "size": "XS",
    "inventory_quantity": 87
  }, {
    "name": "Ben",
    "price": 17023,
    "description": "Cras in purus eu magna vulputate luctus.",
    "image_url": "http://dummyimage.com/219x100.png/dddddd/000000",
    "featured": "false",
    "color": "Pink",
    "size": "3XL",
    "inventory_quantity": 56
  }, {
    "name": "Vicky",
    "price": 23458,
    "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    "image_url": "http://dummyimage.com/225x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Teal",
    "size": "S",
    "inventory_quantity": 65
  }, {
    "name": "Kathye",
    "price": 14738,
    "description": "Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.",
    "image_url": "http://dummyimage.com/117x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Purple",
    "size": "L",
    "inventory_quantity": 69
  }, {
    "name": "Damaris",
    "price": 19553,
    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.",
    "image_url": "http://dummyimage.com/240x100.png/dddddd/000000",
    "featured": "false",
    "color": "Fuscia",
    "size": "L",
    "inventory_quantity": 63
  }, {
    "name": "Winonah",
    "price": 29492,
    "description": "Quisque ut erat.",
    "image_url": "http://dummyimage.com/245x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Crimson",
    "size": "3XL",
    "inventory_quantity": 20
  }, {
    "name": "Mikael",
    "price": 24734,
    "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
    "image_url": "http://dummyimage.com/213x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Red",
    "size": "3XL",
    "inventory_quantity": 80
  }, {
    "name": "Franz",
    "price": 21823,
    "description": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    "image_url": "http://dummyimage.com/214x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Mauv",
    "size": "XL",
    "inventory_quantity": 55
  }, {
    "name": "Daffi",
    "price": 11874,
    "description": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
    "image_url": "http://dummyimage.com/205x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Red",
    "size": "L",
    "inventory_quantity": 55
  }, {
    "name": "Nicola",
    "price": 12023,
    "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.",
    "image_url": "http://dummyimage.com/131x100.png/dddddd/000000",
    "featured": "false",
    "color": "Violet",
    "size": "S",
    "inventory_quantity": 95
  }, {
    "name": "Marthe",
    "price": 27984,
    "description": "Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    "image_url": "http://dummyimage.com/153x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Puce",
    "size": "2XL",
    "inventory_quantity": 5
  }, {
    "name": "Cheri",
    "price": 19530,
    "description": "Praesent id massa id nisl venenatis lacinia.",
    "image_url": "http://dummyimage.com/203x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Crimson",
    "size": "L",
    "inventory_quantity": 57
  }, {
    "name": "Mufi",
    "price": 23618,
    "description": "Nam dui.",
    "image_url": "http://dummyimage.com/200x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Yellow",
    "size": "M",
    "inventory_quantity": 95
  }, {
    "name": "Dorita",
    "price": 20187,
    "description": "Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.",
    "image_url": "http://dummyimage.com/149x100.png/dddddd/000000",
    "featured": "false",
    "color": "Purple",
    "size": "L",
    "inventory_quantity": 57
  }, {
    "name": "Buckie",
    "price": 24149,
    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum.",
    "image_url": "http://dummyimage.com/219x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Blue",
    "size": "S",
    "inventory_quantity": 40
  }, {
    "name": "Becca",
    "price": 24160,
    "description": "Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    "image_url": "http://dummyimage.com/149x100.png/dddddd/000000",
    "featured": "false",
    "color": "Maroon",
    "size": "2XL",
    "inventory_quantity": 80
  }, {
    "name": "Ketty",
    "price": 25778,
    "description": "In blandit ultrices enim.",
    "image_url": "http://dummyimage.com/114x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Pink",
    "size": "3XL",
    "inventory_quantity": 34
  }, {
    "name": "Mariel",
    "price": 13490,
    "description": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    "image_url": "http://dummyimage.com/150x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Indigo",
    "size": "XS",
    "inventory_quantity": 41
  }, {
    "name": "Ariana",
    "price": 11545,
    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
    "image_url": "http://dummyimage.com/246x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Blue",
    "size": "2XL",
    "inventory_quantity": 94
  }, {
    "name": "Bord",
    "price": 19599,
    "description": "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.",
    "image_url": "http://dummyimage.com/210x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Red",
    "size": "L",
    "inventory_quantity": 31
  }, {
    "name": "Annmaria",
    "price": 11734,
    "description": "Curabitur gravida nisi at nibh.",
    "image_url": "http://dummyimage.com/248x100.png/dddddd/000000",
    "featured": "false",
    "color": "Mauv",
    "size": "3XL",
    "inventory_quantity": 96
  }, {
    "name": "Ola",
    "price": 13713,
    "description": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.",
    "image_url": "http://dummyimage.com/128x100.png/dddddd/000000",
    "featured": "false",
    "color": "Pink",
    "size": "3XL",
    "inventory_quantity": 84
  }, {
    "name": "Agnola",
    "price": 22587,
    "description": "Aliquam erat volutpat. In congue.",
    "image_url": "http://dummyimage.com/148x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Yellow",
    "size": "3XL",
    "inventory_quantity": 42
  }, {
    "name": "Durand",
    "price": 29237,
    "description": "Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
    "image_url": "http://dummyimage.com/145x100.png/dddddd/000000",
    "featured": "false",
    "color": "Goldenrod",
    "size": "3XL",
    "inventory_quantity": 9
  }, {
    "name": "Lalo",
    "price": 19325,
    "description": "Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
    "image_url": "http://dummyimage.com/124x100.png/dddddd/000000",
    "featured": "false",
    "color": "Blue",
    "size": "2XL",
    "inventory_quantity": 17
  }, {
    "name": "Rianon",
    "price": 29858,
    "description": "Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    "image_url": "http://dummyimage.com/117x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Red",
    "size": "L",
    "inventory_quantity": 38
  }, {
    "name": "Ilka",
    "price": 24058,
    "description": "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.",
    "image_url": "http://dummyimage.com/246x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Blue",
    "size": "XL",
    "inventory_quantity": 14
  }, {
    "name": "Wilek",
    "price": 15483,
    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    "image_url": "http://dummyimage.com/134x100.png/dddddd/000000",
    "featured": "false",
    "color": "Green",
    "size": "XS",
    "inventory_quantity": 72
  }, {
    "name": "Gerti",
    "price": 16435,
    "description": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.",
    "image_url": "http://dummyimage.com/157x100.png/dddddd/000000",
    "featured": "false",
    "color": "Puce",
    "size": "L",
    "inventory_quantity": 64
  }, {
    "name": "Randall",
    "price": 28161,
    "description": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    "image_url": "http://dummyimage.com/197x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Mauv",
    "size": "2XL",
    "inventory_quantity": 88
  }, {
    "name": "Sidonnie",
    "price": 19258,
    "description": "In hac habitasse platea dictumst.",
    "image_url": "http://dummyimage.com/208x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Pink",
    "size": "S",
    "inventory_quantity": 8
  }, {
    "name": "Felizio",
    "price": 17894,
    "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.",
    "image_url": "http://dummyimage.com/209x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Maroon",
    "size": "M",
    "inventory_quantity": 41
  }, {
    "name": "Morgan",
    "price": 17620,
    "description": "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
    "image_url": "http://dummyimage.com/106x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Fuscia",
    "size": "3XL",
    "inventory_quantity": 4
  }, {
    "name": "Conrade",
    "price": 10194,
    "description": "Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.",
    "image_url": "http://dummyimage.com/173x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Orange",
    "size": "XS",
    "inventory_quantity": 76
  }, {
    "name": "Dov",
    "price": 21398,
    "description": "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    "image_url": "http://dummyimage.com/171x100.png/dddddd/000000",
    "featured": "false",
    "color": "Blue",
    "size": "XL",
    "inventory_quantity": 45
  }, {
    "name": "Dorrie",
    "price": 15653,
    "description": "Fusce consequat. Nulla nisl. Nunc nisl.",
    "image_url": "http://dummyimage.com/129x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Yellow",
    "size": "M",
    "inventory_quantity": 76
  }, {
    "name": "Devon",
    "price": 24411,
    "description": "Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    "image_url": "http://dummyimage.com/198x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Violet",
    "size": "M",
    "inventory_quantity": 87
  }, {
    "name": "Johnette",
    "price": 27425,
    "description": "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.",
    "image_url": "http://dummyimage.com/152x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Indigo",
    "size": "2XL",
    "inventory_quantity": 32
  }, {
    "name": "Flor",
    "price": 21042,
    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.",
    "image_url": "http://dummyimage.com/108x100.png/dddddd/000000",
    "featured": "false",
    "color": "Fuscia",
    "size": "XL",
    "inventory_quantity": 88
  }, {
    "name": "Mauricio",
    "price": 19291,
    "description": "Cras in purus eu magna vulputate luctus.",
    "image_url": "http://dummyimage.com/197x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Teal",
    "size": "L",
    "inventory_quantity": 26
  }, {
    "name": "Geri",
    "price": 20659,
    "description": "Maecenas rhoncus aliquam lacus.",
    "image_url": "http://dummyimage.com/157x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Yellow",
    "size": "XL",
    "inventory_quantity": 18
  }, {
    "name": "Estel",
    "price": 10122,
    "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    "image_url": "http://dummyimage.com/224x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Crimson",
    "size": "2XL",
    "inventory_quantity": 41
  }, {
    "name": "Marice",
    "price": 10206,
    "description": "Donec quis orci eget orci vehicula condimentum.",
    "image_url": "http://dummyimage.com/108x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Khaki",
    "size": "S",
    "inventory_quantity": 62
  }, {
    "name": "Luce",
    "price": 19488,
    "description": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.",
    "image_url": "http://dummyimage.com/136x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Fuscia",
    "size": "L",
    "inventory_quantity": 5
  }, {
    "name": "Dael",
    "price": 26828,
    "description": "Nunc purus.",
    "image_url": "http://dummyimage.com/109x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Purple",
    "size": "M",
    "inventory_quantity": 86
  }, {
    "name": "Julina",
    "price": 16876,
    "description": "Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.",
    "image_url": "http://dummyimage.com/238x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Turquoise",
    "size": "XS",
    "inventory_quantity": 60
  }, {
    "name": "Jaymee",
    "price": 11325,
    "description": "In hac habitasse platea dictumst.",
    "image_url": "http://dummyimage.com/204x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Orange",
    "size": "L",
    "inventory_quantity": 68
  }, {
    "name": "Edna",
    "price": 15300,
    "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    "image_url": "http://dummyimage.com/148x100.png/dddddd/000000",
    "featured": "false",
    "color": "Blue",
    "size": "2XL",
    "inventory_quantity": 71
  }, {
    "name": "Jennilee",
    "price": 20410,
    "description": "Fusce consequat.",
    "image_url": "http://dummyimage.com/201x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Blue",
    "size": "M",
    "inventory_quantity": 82
  }, {
    "name": "Almeta",
    "price": 19576,
    "description": "In congue. Etiam justo.",
    "image_url": "http://dummyimage.com/173x100.png/5fa2dd/ffffff",
    "featured": "false",
    "color": "Blue",
    "size": "M",
    "inventory_quantity": 88
  }, {
    "name": "Sherlocke",
    "price": 11880,
    "description": "Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.",
    "image_url": "http://dummyimage.com/112x100.png/dddddd/000000",
    "featured": "false",
    "color": "Blue",
    "size": "XS",
    "inventory_quantity": 13
  }, {
    "name": "Hymie",
    "price": 16718,
    "description": "Morbi a ipsum.",
    "image_url": "http://dummyimage.com/116x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Yellow",
    "size": "L",
    "inventory_quantity": 1
  }, {
    "name": "Collie",
    "price": 21225,
    "description": "Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.",
    "image_url": "http://dummyimage.com/135x100.png/cc0000/ffffff",
    "featured": "false",
    "color": "Khaki",
    "size": "2XL",
    "inventory_quantity": 48
  }, {
    "name": "Waverley",
    "price": 26783,
    "description": "Praesent blandit lacinia erat.",
    "image_url": "http://dummyimage.com/132x100.png/ff4444/ffffff",
    "featured": "false",
    "color": "Puce",
    "size": "3XL",
    "inventory_quantity": 14
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
