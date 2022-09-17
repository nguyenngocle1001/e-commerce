/* eslint-disable */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker/locale/vi');

// Model
const SizeModel = require('../models/sizeSchema');
const CategoryModel = require('../models/categorySchema');
const ColorModel = require('../models/colorSchema');
const BrandModel = require('../models/brandSchema');
const ProductModel = require('../models/productSchema');
const ImportModel = require('../models/importSchema');

dotenv.config({ path: './config.env' });

// connect to db
const db = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log('Db connection failed!', err));

// const users = JSON.parse(fs.readFileSync(`${__dirname}/user.json`, 'utf-8'));
// const colors = JSON.parse(fs.readFileSync(`${__dirname}/color.json`, 'utf-8'));
// const categories = JSON.parse(
//   fs.readFileSync(`${__dirname}/category.json`, 'utf-8')
// );

// data

const size = [
  {
    value: 'S',
    description: 'Size S',
  },
  {
    value: 'M',
    description: 'Size M',
  },
  {
    value: 'L',
    description: 'Size L',
  },
];

const categories = [
  {
    name: 'T-SHIRT',
    description: 'T-SHIRT',
  },
  {
    name: 'LONG SLEEVES',
    description: 'LONG SLEEVES',
  },
  {
    name: 'SHIRTS',
    description: 'SHIRTS',
  },
  {
    name: 'HOODIES',
    description: 'HOODIES',
  },
  {
    name: 'JACKETS',
    description: 'JACKETS',
  },
  {
    name: 'SWEATERS',
    description: 'SWEATERS',
  },
  {
    name: 'SNEAKER',
    description: 'SNEAKER',
  },
  {
    name: 'HAT',
    description: 'HAT',
  },
].map((item) => ({
  ...item,
  image: faker.image.technics(50, 50, true),
}));

const colors = (() => {
  return new Array(4).fill().map(() => {
    const color = faker.color.human();

    return {
      value: color,
      description: `${color} color`,
    };
  });
})();

const brands = [
  {
    name: 'N7Unisex',
    description: 'N7Unisex',
  },
  {
    name: 'Sadboiz',
    description: 'Sadboiz',
  },
  {
    name: 'Hades',
    description: 'Hades',
  },
  {
    name: 'Davies',
    description: 'Davies',
  },
  {
    name: 'SSSTutter',
    description: 'SSSTutter',
  },
];

const importProduct = (length) => {
  Promise.all([
    BrandModel.find().select('id').lean(),
    CategoryModel.find().select('id'),
  ]).then(([brands, categories]) => {
    const products = new Array(length).fill().map(() => {
      const images = new Array(5)
        .fill()
        .map(() => faker.image.fashion(1024, 1024, true));

      const price = faker.commerce.price(100, 5000, 2);
      const discount = faker.datatype.number({
        min: 0,
        max: 100,
      });
      const sellPrice = price - (price * discount) / 100;

      return {
        name: faker.commerce.productName(),
        imageCover: faker.image.fashion(1024, 1024, true),
        images,
        description: faker.commerce.productDescription(),
        price,
        sellPrice,
        discount,
        ratingsAverage: faker.datatype.number({
          min: 0,
          max: 5,
          precision: 0.1,
        }),
        ratingsQuantity: faker.datatype.number({
          min: 0,
          max: 2000,
        }),
        favouriteQuantity: faker.datatype.number({
          min: 0,
          max: 2000,
        }),
        category: faker.helpers.arrayElement(categories)._id.toString(),
        brand: faker.helpers.arrayElement(brands)._id.toString(),
      };
    });

    importCollection(ProductModel, products, 'product');
  });
};

const importProductOption = () => {
  Promise.all([
    ColorModel.find().select('id'),
    SizeModel.find().select('id'),
    ProductModel.find().select('id'),
  ]).then(([colors, sizes, products]) => {
    const options = new Array(100).fill().map(() => {
      const item = {
        product: faker.helpers.arrayElement(products)._id.toString(),
        size: faker.helpers.arrayElement(sizes)._id.toString(),
        color: faker.helpers.arrayElement(colors)._id.toString(),
        quantity: faker.datatype.number({
          min: 1,
          max: 100,
          precision: 1,
        }),
        importPrice: faker.commerce.price(100, 3000),
        tax: 0,
      };

      return item;
    });

    ImportModel.create(options)
      .then(() => {
        console.log({
          name: 'product',
          status: 'success',
        });
      })
      .catch((err) => {
        console.log({
          name: 'product',
          err,
        });
      });
  });
};

const importCollection = (Model, data, name) => {
  Model.create(data)
    .then(() =>
      console.log({
        name,
        status: 'success',
      })
    )
    .catch((err) =>
      console.log({
        name,
        err,
      })
    );
};

const deleteCollection = (Model, name) => {
  Model.deleteMany()
    .then(() =>
      console.log({
        name,
        status: 'success',
      })
    )
    .catch((err) =>
      console.log({
        name,
        err,
      })
    );
};

// Import
switch (process.argv[2]) {
  case '--import':
    // importCollection(SizeModel, size, 'size');
    // importCollection(CategoryModel, categories, 'category');
    // importCollection(ColorModel, colors, 'color');
    // importCollection(BrandModel, brands, 'brand');\
    importProduct(100);
    // importProductOption();
    break;

  case '--delete':
    // deleteCollection(SizeModel, 'size');
    deleteCollection(CategoryModel, 'category');
    break;

  default:
    console.log('Not method');
    break;
}

// Delete category
