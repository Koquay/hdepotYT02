require("./product.model");
const Product = require("mongoose").model("Product");

exports.getProduct = async (req, res) => {
  const productId = req.query.productId;

  console.log("ProductsService.productId", productId);

  try {
    const product = await Product.findOne({_id: productId});
    console.log("product", product);;
    res.status(200).json(product );
  } catch (error) {
    console.error(error);
    res.status(500).send("Problem getting product.");
  }
}

exports.getProducts = async (req, res) => {
  console.log("ProductsService.getProducts");

  const sidebarFiltersStr = req.query.sidebarFilters;

  let sidebarFilters;

  const productCountPipeline = [];

  if (sidebarFiltersStr) {
    sidebarFilters = JSON.parse(req.query.sidebarFilters);
  } else {
    sidebarFilters = [];
  }
  console.log("sidebarFilters", sidebarFilters);

  const aggregatePipeline = buildAggregatePipeline(
    sidebarFilters,
    productCountPipeline
  );
  console.log("aggregatePipeline", aggregatePipeline);

  console.log("aggregatePipeline", JSON.stringify(aggregatePipeline));

  try {
    const products = await Product.aggregate(aggregatePipeline);
    console.log("products", products);
    const productCount = await getProductCount(productCountPipeline);
    console.log("productCount", productCount);
    res.status(200).json({ products, productCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Problem getting products.");
  }
};

const buildAggregatePipeline = (filters, productCountPipeline) => {
  let {
    brands,
    priceRanges,
    ratings,
    pageNo,
    pageSize,
    sortFilter,
  } = filters;
  console.log("brands", brands);

  let aggregatePipeline = [];

  let brandMatch = buildBrandMatch(brands);
  if (brandMatch) {
    aggregatePipeline.push(brandMatch);
    productCountPipeline.push(brandMatch);
  }

  let priceMatch = buildPriceRangeMatch(priceRanges);
  if (priceMatch) {
    aggregatePipeline.push(priceMatch);
    productCountPipeline.push(priceMatch);
  }

  let ratingMatch = buildRatingMatch(ratings);
  if (ratingMatch) {
      aggregatePipeline.push(ratingMatch)
      productCountPipeline.push(ratingMatch);
  }

  // aggregatePipeline.push(buildSortMatch(sortFilter));
  checkForEmptyAggregate(aggregatePipeline);
  checkForEmptyAggregate(productCountPipeline);
  aggregatePipeline.push(buildPageNumberFilter(pageNo, pageSize));
  aggregatePipeline.push(buildPageSizeFilter(pageSize));

  return aggregatePipeline;
};


const buildBrandMatch = (brands) => {
  if (brands?.length) {
    return { $match: { brand: { $in: brands } } };
  }
  return null;
};

const buildRatingMatch = (ratings) => {
  if (ratings?.length) {
    return { $match: { rating: { $in: ratings } } };
  }
  return null;
};

const buildPriceRangeMatch = (priceRanges) => {
  if (priceRanges?.length) {
    // let filter = [];s
    let priceMatches = [];

    for (let priceRange of priceRanges) {
      priceMatches.push({
        $and: [
          { $gte: ["$price", +priceRange.low] },
          { $lte: ["$price", +priceRange.high] },
        ],
      });
    }

    return { $match: { $expr: { $or: priceMatches } } };
  }
};

const buildSortMatch = (sortFilter) => {
  let filter;
  if (sortFilter?.field == "price") {
    filter = { $sort: { price: sortFilter?.direction } };
  } else if (sortFilter?.field == "rating") {
    filter = { $sort: { rating: sortFilter?.direction } };
  }

  return filter;
};

const buildPageNumberFilter = (pageNo, pageSize) => {
  let skip = (pageNo - 1) * pageSize;

  return { $skip: skip };
};

const buildPageSizeFilter = (pageSize) => {
  return { $limit: pageSize };
};

const getProductCount = async (productCountPipeline) => {
  let productCount;
  productCountPipeline.push({ $count: "productCount" });

  productCount = await Product.aggregate(productCountPipeline);

  if (productCount.length) {
    return productCount[0].productCount;
  }

  return 0;
};

const checkForEmptyAggregate = (aggregatePipeline) => {
  if (aggregatePipeline.length === 0) {
    aggregatePipeline.push({ $match: { brand: { $ne: null } } });
  }
};