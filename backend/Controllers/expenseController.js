import Expense from "../Models/expenseModel.js";

export const addExp = async (req, res) => {
  //return res.send(req.user);
  try {
    const expense = await new Expense({
      name: req.body.name,
      user_id: req.user._id,
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
    }).save();

    return res.status(201).send({
      message: "Your Expense has Been Added Successfully!!!",
    });
  } catch (e) {
    return res.status(400).send("Error =>" + e.message);
  }
};

export const deleteExp = async (req, res) => {
  //return res.send(req.user);
  try {
    const expense = await Expense.findById(req.params.id);
    if (expense) {
      if (req.user._id == expense.user_id) {
        await Expense.findOneAndDelete({ _id: req.params.id });
        return res.status(201).send({
          message: "Your Expense has Been Deleted Successfully!!!",
        });
      }
      return res
        .status(401)
        .send({ message: "You are not the owner of this record" });
    }
    return res
      .status(404)
      .send({ message: "This Expense does not exist in our database" });
  } catch (e) {
    return res.status(400).send("Error " + e.message);
  }
};

export const getExp = async (req, res) => {
  try {
    const expenses = await Expense.find({ user_id: req.user._id });
    if (expenses.length === 0) {
      return res.status(404).send({ message: "No expenses were found!" });
    } else {
      return res.send(expenses);
    }
  } catch (e) {
    return res.status(400).send("Error =>" + e.message);
  }
};

export const singleExp = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    //console.log(expense.length);
    if (expense) {
      if (req.user._id == expense.user_id) {
        return res.send(expense);
      }
      return res
        .status(401)
        .send({ message: "You are not the owner of this record" });
    }
    return res.status(404).send({ message: "No expense were found!" });
  } catch (e) {
    return res.status(400).send("Error =>" + e.message);
  }
};

export const editExp = async (req, res) => {
  //return res.send(req.params);
  //return res.send(req.user);
  try {
    const expense = await Expense.findById(req.params.id);
    if (expense) {
      if (expense.user_id == req.user._id) {
        expense.name = req.body.name;
        expense.description = req.body.description;
        expense.category = req.body.category;
        expense.date = req.body.date;
        await expense.save();
        return res.status(201).send({
          message: "Your Expense has Been Edited Successfully!!!",
        });
      }
      return res
        .status(401)
        .send({ message: "You are not the owner of this record" });
    }

    return res.status(404).send({
      message: "Can not find your Expense!!!",
    });
  } catch (e) {
    return res.status(400).send("Error =>" + e.message);
  }
};

export const SearchExp = async (req, res) => {
  //console.log(req.query.query);

  const searchQuery = req.query.query || "";
  const category = req.query.category || "";
  const description = req.query.description || "";
  const date = req.query.date || "";
  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: { $regex: searchQuery, $options: "i" },
        }
      : {};

  const categoryFilter =
    category && category !== "all"
      ? {
          category: { $regex: category, $options: "i" },
        }
      : {};

  const descriptionFilter =
    description && description !== "all"
      ? {
          description: { $regex: description, $options: "i" },
        }
      : {};

  const dateFilter =
    date && date !== "all"
      ? {
          date: { $regex: date, $options: "i" },
        }
      : {};

  const expenses = await Expense.find({
    ...queryFilter,
    ...categoryFilter,
    ...descriptionFilter,
    ...dateFilter,
    user_id: req.user._id,
  });
  //console.log(expenses)
  res.send(expenses);
};
