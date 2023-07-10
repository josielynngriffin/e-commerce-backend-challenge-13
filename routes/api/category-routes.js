const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//GET /api/categories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET /api/categories/id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {include: [{model: Product}]});
    if (!categoryData) {
      res.status(404).json({message: 'No category found with this idea!'});
      return;
    };
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  };
});

//POST /api/categories
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    if(!categoryData){
      res.status(404).json(err);
    };
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

//PUT /api/categories/id 
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const updatedData = await Category.findByPk(req.params.id, {include: [{model: Product}]});
    res.status(200).json(updatedData);
  } catch(err) {
    res.status(500).json(err);
  };
});

//DELETE /api/categories/id
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(!categoryData){
      res.status(404).json({message: 'No category found with that id! Failed to delete'});
    };

    res.status(200).json({message: 'Category deleted successfully'});
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
