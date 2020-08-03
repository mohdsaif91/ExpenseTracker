const Transaction = require("../modles/Transaction");

//get all transaction
//route /api/v1/transactions
//access public
exports.getTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.find();
    return res.status(200).json({
      success: true,
      const: transaction.length,
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      error: "server Error",
    });
  }
};

//Add transaction
//route /api/v1/transactions
//access public
exports.addTransactions = async (req, res) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({ sucess: true, data: transaction });
  } catch (error) {
    console.log(error.name);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      // console.log(messages);
      return res.status(400).json({
        sucess: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        sucess: false,
        error: "server Error",
      });
    }
    // console.log(error);
  }
};

//delete transaction
//route /api/v1/transactions/:id
//access public
exports.deleteTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        sucess: false,
        error: "No Transaction Found",
      });
    }
    await transaction.remove();
    res.status(200).json({
      sucess: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      error: "server Error",
    });
  }
};
