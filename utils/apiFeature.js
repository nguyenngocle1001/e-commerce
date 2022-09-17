class ApiFeature {
  constructor(query, queryString) {
    this.query = query;

    const { page = 1, limit = 10, sort, fields, ...filters } = queryString;

    this.paginationValue = { page, limit };
    this.sortValue = sort;
    this.fieldsValue = fields;

    this.filtersValue = filters;
  }

  filters() {
    const filters = Object.keys(this.filtersValue).reduce((acc, cur) => {
      const regex = /\b(gte|gt|lte|lt)\b/g;
      let value = this.filtersValue[cur];
      if (value.search(regex) === 1)
        value = JSON.parse(
          this.filtersValue[cur].replace(regex, (match) => `"$${match}"`)
        );

      return { ...acc, [cur]: value };
    }, {});

    this.filtersValue = filters;

    this.query = this.query.find(filters);

    return this;
  }

  sort() {
    if (this.sortValue) this.query = this.query.sort(this.sortValue);

    return this;
  }

  limitFields() {
    if (this.fieldsValue) {
      this.query = this.query.select(this.fieldsValue.split(','));
    } else this.query = this.query.select(['-__v', '-deleted']);

    return this;
  }

  paginate() {
    const { page, limit } = this.paginationValue;
    this.query = this.query.skip((page - 1) * limit).limit(limit * 1);

    return this;
  }
}

module.exports = ApiFeature;
