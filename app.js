const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// middlewares
app.use(express.json());
app.use(cors());

// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // true or false, error message
      required: [true, "Name is required"],
      trim: true, // remove spaces from name
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name must be at most 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "Unit value must be kg,litre or pcs",
      }
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity cannot be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
        message: "Quantity must be an integer number",
      },
    },
    status: {
      type: String,
      enum: {
        // must be values(plural)... not value(singular)
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status can't be {VALUE}",
      },
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now()
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now()
    // }
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [{
    //   name: {
    //     type: String,
    //     required: true
    //   },
    //   name: {
    //     _id: mongoose.Schema.Types.ObjectId
    //   }
    // }]
  },
  {
    timestamps: true,
  }
);


// mongoose middlewares for saving data : pre/post

// pre middleware
productSchema.pre('save', function (next) {
  console.log('before sving data');
  if (this.quantity == 0) {
    this.status = 'out-of-stock'
  }
  next();
})

// post middleware

// productSchema.post('save', function (doc, next) {
//   console.log('after sving data');
//   next();
// })


productSchema.method.logger = function () {
  console.log(`Data saved ${this.name}`);
}


// SCHEMA -> MODEL -> QUERY

const Product = mongoose.model('Product', productSchema);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting in database
app.post('/api/v1/product', async (req, res, next) => {

  try {
    // save
    //const product = new Product(req.body);
    // instance creation --> Do Something --> save()
    // if (product.quantity == 0) {
    //   product.status = 'out-of-stock'
    // }
    // save to database
    //const result = await product.save();
    // result.logger;


    // Create
    const result = await Product.create(req.body)
    result.logger;

    res.status(200).json({
      status: 'success',
      message: "Data inserted successfully",
      data: result
    })

    next();
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: "Data in not inserted",
      error: error.message
    })
  }
})

// get route
app.get("/api/v1/product", async (req, res) => {
  try {
    // const product = await Product
    //   .where("name").equals(/\w/)
    //   .where("quantity").gt(10).lt(600)
    //   .limit(2).sort({ quantity: -1 })

    const product = await Product.findById("6362a2239e49581f008ef8ea");


    res.status(200).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: "Can't get the data",
      error: error.message
    })
  }
})

module.exports = app;
