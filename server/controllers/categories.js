import Validator from 'validatorjs';
import db from '../models';

const Category = db.Category;

const addCatRules = {
  category_name: 'required|string|min:2',
};

const updateCatRules = {
  category_name: 'required|string|min:2',
};

const categoryController = {
  create(req, res) {
    const validation = new Validator(req.body, addCatRules);
    if (validation.passes()) {
      return Category.create({
        category_name: req.body.category_name,
      })
        .then(category => res.status(201).send({ message: 'Category created', category }))
        .catch((err) => {
          console.log(err, '>>>>>>>>>>>>>>>');
          res.status(400).send({ message: 'Error, Category not created' });
        });
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  },
  list(req, res) {
    return Category
      .findAll()
      .then(category => res.status(200).send({ message: 'All categories displayed', category }))
      .catch(() => res.status(400).send({ message: 'Error, no category to displayed ' }));
  },
  update(req, res) {
    const validation = new Validator(req.body, updateCatRules);
    if (validation.passes()) {
      return Category
        .findById(req.params.categoryId)
        .then((category) => {
          if (!category) {
            return res.status(404).send({
              message: 'Category Not Found',
            });
          }
          return category
            .update({
              category_name: req.body.category_name,
            })
            .then(() => res.status(200).send({ message: 'Category updated', category }))
            .catch(() => res.status(400).send({ message: 'Error, No update done' }));
        })
        .catch(() => res.status(400).send({ message: 'Error, No update done' }));
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  },
  destroy(req, res) {
    return Category
      .findById(req.params.categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: 'Category Not Found',
          });
        }
        return category
          .destroy()
          .then(() => res.status(200).send({ message: 'Category deleted' }))
          .catch(() => res.status(400).send({ message: 'Error, No deletion occurred' }));
      })
      .catch(error => res.status(400).send(error));
  },
};
export default categoryController;